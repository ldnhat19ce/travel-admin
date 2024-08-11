import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ProductAmtService } from '../../../../../services/product-amt.service';
import { Product } from '../../../../../model/product.model';
import { ProductAmt } from '../../../../../model/product-amt.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductModalComponent } from '../../../../general/modal/product-modal/product-modal.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { productSignal } from '../../../../../store/product-sidebar.store';

@Component({
    selector: 'app-product-amt',
    standalone: true,
    imports: [
        ToastModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        ConfirmDialogModule,
        ProductModalComponent,
        InputTextModule,
        PanelModule,
        InputGroupModule,
        ButtonModule,
        InputNumberModule,
        TableModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './product-amt.component.html',
    styleUrl: './product-amt.component.scss',
})
export class ProductAmtComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productAmtService = inject(ProductAmtService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    productCode: string = "";
    query: string = "";

    submitted: boolean = false;
    loading: boolean = false;
    visible: boolean = false;

    productAmt: ProductAmt[] = [] as ProductAmt[];

    productAmtForm: FormGroup = this._formBuilder.group({
        id: [0],
        productCode: ['', Validators.required],
        productName: [''],
        retailPrice: [0],
        retailVat: [0],
        retailAmt: [0, Validators.required],
        tax: [0],
        registerDate: ['', Validators.required],
        supplyPrice: [0],
        supplyVat: [0],
        supplyAmt: [0],
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

    get f(): { [key: string]: AbstractControl } {
        return this.productAmtForm.controls;
    }

    onClickRow(item: Product) {
        this.productCode = item.pdtCode;

        this.productAmtForm.patchValue({
            productCode: item.pdtCode,
            productName: item.pdtName
        });

        this.getListProductAmt(item.pdtCode);

        this.visible = false;
        this.query = item.pdtName;
    }

    onShowProductModal() {
        this.visible = true;
    }

    onCloseProductModal(event: any) {
        this.visible = false;
    }

    onEdit(item: ProductAmt) {
        this.productAmtForm.patchValue({
            id: item.id,
            productCode: item.productCode,
            productName: item.productName,
            retailPrice: item.retailPrice,
            retailVat: item.retailVat,
            retailAmt: item.retailAmt,
            registerDate: item.registerDate,
            tax: item.tax,
            supplyVat: item.supplyVat,
            supplyAmt: item.supplyAmt,
            supplyPrice: item.supplyPrice
        });
    }

    onReset() {
        this.productAmtForm.patchValue({
            id: 0,
            productCode: "",
            productName: "",
            retailPrice: 0,
            retailVat: 0,
            retailAmt: 0,
            registerDate: "",
            tax: 0,
            supplyVat: 0,
            supplyAmt: 0,
            supplyPrice: 0
        });

        this.visible = false;

        this.query = "";
    }

    onSubmit() {
        this.submitted = true;
        if (this.productAmtForm.invalid) {
            return;
        }

        if (this.f['id'].value > 0) {
            this._productAmtService.updateProductAmt(this.productAmtForm.value).subscribe({
                next: (res: HttpResponse<ProductAmt>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as ProductAmt);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Chỉnh sửa thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getListProductAmt(this.productCode);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    let error: Error = err.error;
                    this._messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: error.message,
                        key: 'br',
                        life: 3000,
                    });
                }
            });
        } else {
            this._productAmtService.saveProductAmt(this.productAmtForm.value).subscribe({
                next: (res: HttpResponse<ProductAmt>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as ProductAmt);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Lưu thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();

                        this.getListProductAmt(this.productCode);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    let error: Error = err.error;
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
    }

    onDelete(event: any, item: ProductAmt) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._productAmtService.deleteProductAmt(item.id).subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        if (res.status === 200) {
                            this._messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'xoá thành công [ID]: ' + item.id,
                                key: 'br',
                                life: 3000,
                            });
                            this.getListProductAmt(this.productCode);
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

    private getListProductAmt(productCode: string) {
        this.loading = true;
        this._productAmtService.getListProductAmt(productCode).subscribe(res => {
            if(res !== null && res !== undefined) {
                this.productAmt = res.body || [];
                this.loading = false;
            }
        });
    }
}
