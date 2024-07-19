import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    styles: [
        `
            :host ::ng-deep {
                [pDraggable] {
                    cursor: move;
                }
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
    rows: number = 15;
    totalRecords: number = 0;

    firstAvailable: number = 0;
    rowsAvailable: number = 10;
    totalRecordsAvailable: number = 0;

    isLoading: boolean = false;
    isLoadingAvailable: boolean = false;
    isLoadingSave: boolean = false;
    visible: boolean = false;

    productSelected: Product = {} as Product;

    draggedProduct: Product = {} as Product;

    products: Product[] = [] as Product[];

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

    ngOnInit(): void {
        this.getProduct();
    }

    onDragStart(item: Product) {
        this.draggedProduct = item;
    }

    onDragEnd() {
        this.draggedProduct = {} as Product;
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
    }

    onScroll(event: any, type: string) {
        const bottom =
            Math.round(event.target.scrollHeight - event.target.scrollTop) ===
            event.target.clientHeight;
        if (bottom) {
            if (!this.isLoading && type === 'P') {
                this.first += 1;
                this.getProduct();
            } else if (!this.isLoadingAvailable && type === 'A') {
                this.firstAvailable += 1;
                this.getAvailableProduct();
            }
        }
    }

    private getProduct() {
        this.isLoading = true;
        this._productService
            .getPageProduct(this.getParamSearchProduct())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let productResult = res.body?.result || [];
                    if (productResult.length <= 0) {
                        this.isLoading = true;
                    } else {
                        this.products.push(...productResult);
                        this.totalRecords = res.body?.total || 0;
                        this.isLoading = false;
                    }
                }
            });
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

    private getParamSearchProduct() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
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
