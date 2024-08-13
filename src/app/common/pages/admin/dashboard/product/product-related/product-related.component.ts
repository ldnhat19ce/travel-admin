import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../../services/product.service';
import { Product } from '../../../../../model/product.model';
import { DragDropModule } from 'primeng/dragdrop';
import { ProductRelationService } from '../../../../../services/product-relation.service';
import { ProductRelation } from '../../../../../model/product-relation.model';
import { DialogModule } from 'primeng/dialog';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductModalComponent } from '../../../../general/modal/product-modal/product-modal.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { productSignal } from '../../../../../store/product-sidebar.store';

@Component({
    selector: 'app-product-related',
    standalone: true,
    imports: [
        ToastModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DragDropModule,
        DialogModule,
        ConfirmDialogModule,
        ProductModalComponent,
        InputTextModule,
        PanelModule,
        InputGroupModule,
        ButtonModule,
        TableModule,
        InputNumberModule,
        CheckboxModule,
        RippleModule
    ],
    providers: [MessageService, ConfirmationService],
    styles: [
        `
            :host ::ng-deep {
                [pDraggable] {
                    cursor: move;
                }
            }

            ::ng-deep .p-datatable-wrapper {
                min-height: calc(100vh - 90px) !important;
            }
        `,
    ],
    templateUrl: './product-related.component.html',
    styleUrl: './product-related.component.scss',
})
export class ProductRelatedComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productService = inject(ProductService);
    private _productRelationService = inject(ProductRelationService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    first: number = 0;
    rows: number = 20;
    totalRecords: number = 0;

    firstAvailable: number = 0;
    rowsAvailable: number = 10;
    totalRecordsAvailable: number = 0;

    query: string = "";

    isLoadingAvailable: boolean = false;
    isLoadingSave: boolean = false;
    visible: boolean = false;
    productModalVisible: boolean = false;

    productSelected: Product = {} as Product;

    draggedProduct: Product = {} as Product;

    availableProduct: Product[] = [] as Product[];

    selectedProducts: ProductRelation[] = [] as ProductRelation[];

    productRelationForm: FormGroup = this._formBuilder.group({
        id: [0],
        productCode: ['', Validators.required],
        productName: [''],
        relatedProductCode: ['', Validators.required],
        sort: [0, Validators.required],
        used: [true],
    });

    constructor() {
        effect(() => {
            let product: Product = productSignal();
            if(product.pdtCode !== null && product.pdtCode !== undefined) {
                this.onClickRow(product);
                productSignal.set({} as Product);
            }
        }, { allowSignalWrites: true });
    }

    ngOnInit(): void {
    }

    onDragStart(item: Product) {
        this.draggedProduct = item;
    }

    onDragEnd() {
        this.draggedProduct = {} as Product;
    }

    onShowProductModal() {
        this.productModalVisible = true;
    }

    onCloseProductModal(event: any) {
        this.productModalVisible = false;
    }

    onDrop() {
        if (this.draggedProduct) {
            this.onReset();
            this.visible = true;

            this.productRelationForm.patchValue({
                productCode: this.productSelected.pdtCode,
                productName: this.draggedProduct.pdtName,
                relatedProductCode: this.draggedProduct.pdtCode,
            });
        }
    }

    onCancel() {
        this.visible = false;
        this.onReset();
    }

    onSubmit() {
        if (this.productRelationForm.invalid) {
            return;
        }

        this.isLoadingSave = true;
        this._productRelationService
            .saveProductRelation(this.productRelationForm.value)
            .subscribe({
                next: (res: HttpResponse<ProductRelation>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as ProductRelation);
                        this.visible = false;

                        this.onReset();

                        this.firstAvailable = 0;
                        this.availableProduct = [];
                        this.getAvailableProduct();

                        this.selectedProducts = [];
                        this.getRelationProduct();

                        this.isLoadingSave = false;

                        let draggedProductIndex = this.findIndex(this.draggedProduct);
                        let product: ProductRelation = {
                            productCode: this.productSelected.pdtCode,
                            productName: this.productSelected.pdtName,
                            relatedProductCode: this.draggedProduct.pdtCode,
                            relatedProductName: this.draggedProduct.pdtName,
                            sort: 0,
                            used: true,
                        };
                        this.selectedProducts = [
                            ...(this.selectedProducts as ProductRelation[]),
                            product,
                        ];
                        this.availableProduct = this.availableProduct?.filter(
                            (val, i) => i != draggedProductIndex
                        );

                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Lưu thành công!',
                            key: 'br',
                            life: 3000,
                        });
                    }
                },
                error: (err: HttpErrorResponse) => {
                    let error: Error = err.error;
                    this.isLoadingSave = false;
                    this.visible = false;

                    this._messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: error.message,
                        key: 'br',
                        life: 3000,
                    });
                }
            });
    }

    onReset() {
        this.productRelationForm.patchValue({
            productCode: '',
            productName: '',
            relatedProductCode: '',
            sort: 0,
            used: true,
        });
    }

    onDelete(event: any, item: ProductRelation) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._productRelationService.deleteProductRelation(item.productCode, item.relatedProductCode).subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        if (res.status === 200) {
                            this._messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'xoá thành công!',
                                key: 'br',
                                life: 3000,
                            });

                            this.firstAvailable = 0;
                            this.availableProduct = [];
                            this.getAvailableProduct();

                            this.selectedProducts = [];
                            this.getRelationProduct();
                        } else {
                            this._messageService.add({
                                severity: 'danger',
                                summary: 'Error',
                                detail: 'xoá không thành công',
                                key: 'br',
                                life: 3000,
                            });
                        }
                    }
                });
            },
            reject: () => {},
        });
    }

    onClickRow(item: Product) {
        this.productSelected = item;
        this.firstAvailable = 0;
        this.rowsAvailable = 10;
        this.availableProduct = [];
        this.selectedProducts = [];
        this.getAvailableProduct();
        this.getRelationProduct();

        this.productModalVisible = false;
        this.query = item.pdtName;
    }

    onScroll(event: any, type: string) {
        const bottom =
            Math.round(event.target.scrollHeight - event.target.scrollTop) ===
            event.target.clientHeight;
        if (bottom) {
            if (!this.isLoadingAvailable && type === 'A') {
                this.firstAvailable += 1;
                this.getAvailableProduct();
            }
        }
    }

    private getAvailableProduct() {
        this.isLoadingAvailable = true;
        this._productService
            .getPageProduct(this.getParamSearchAvailableProduct())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let productResult = res.body?.result || [];
                    if (productResult.length <= 0) {
                        this.isLoadingAvailable = true;
                    } else {
                        this.availableProduct.push(...productResult);
                        this.totalRecordsAvailable = res.body?.total || 0;
                        this.isLoadingAvailable = false;
                    }
                }
            });
    }

    private getRelationProduct() {
        this._productRelationService
            .getListProductRelation(this.productSelected.pdtCode)
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.selectedProducts = res.body || [];
                }
            });
    }

    private getParamSearchAvailableProduct() {
        return {
            page: this.firstAvailable + 1,
            limit: this.rowsAvailable,
            exceptProductCode: this.productSelected.pdtCode,
        };
    }

    private findIndex(product: Product) {
        let index = -1;
        for (let i = 0; i < (this.availableProduct as Product[]).length; i++) {
            if (product.id === (this.availableProduct as Product[])[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
