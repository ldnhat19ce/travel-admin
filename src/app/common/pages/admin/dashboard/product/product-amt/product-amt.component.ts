import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../../services/product.service';
import { ProductAmtService } from '../../../../../services/product-amt.service';
import { Product } from '../../../../../model/product.model';
import { ProductAmt } from '../../../../../model/product-amt.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-product-amt',
    standalone: true,
    imports: [
        ToastModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './product-amt.component.html',
    styleUrl: './product-amt.component.scss',
})
export class ProductAmtComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productService = inject(ProductService);
    private _productAmtService = inject(ProductAmtService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    productCode: string = "";

    submitted: boolean = false;
    isLoading: boolean = false;

    products: Product[] = [] as Product[];

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

    ngOnInit(): void {
        this.getListProduct();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.productAmtForm.controls;
    }

    onScroll(event: any) {
        const bottom =
            Math.round(event.target.scrollHeight - event.target.scrollTop) ===
            event.target.clientHeight;
        if (bottom && !this.isLoading) {
            this.first += 1;
            this.getListProduct();
        }
    }

    onClickRow(item: Product) {
        this.productCode = item.pdtCode;

        this.productAmtForm.patchValue({
            productCode: item.pdtCode,
            productName: item.pdtName
        });

        this.getListProductAmt(item.pdtCode);
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

    private getListProduct() {
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

    private getListProductAmt(productCode: string) {
        this._productAmtService.getListProductAmt(productCode).subscribe(res => {
            if(res !== null && res !== undefined) {
                this.productAmt = res.body || [];
            }
        });
    }

    private getParamSearchProduct() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }
}
