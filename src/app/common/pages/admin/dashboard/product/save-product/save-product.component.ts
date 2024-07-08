import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/product.service';
import { Product } from '../../../../../model/product.model';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../model/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { TransformCategoryPipe } from '../../../../../pipe/transform-category.pipe';
import { MessageService } from 'primeng/api';
import { Code } from '../../../../../model/code.model';
import { CodeService } from '../../../../../services/code.service';
import { CalendarModule } from 'primeng/calendar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-save-product',
    standalone: true,
    imports: [
        ToastModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TransformCategoryPipe,
        CalendarModule
    ],
    providers: [MessageService],
    templateUrl: './save-product.component.html',
    styleUrl: './save-product.component.scss',
})
export class SaveProductComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productService = inject(ProductService);
    private _categoryService = inject(CategoryService);
    private _codeService = inject(CodeService);
    private _messageService = inject(MessageService);
    products: Product[] = [] as Product[];

    categories: Category[] = [] as Category[];

    code: Code[] = [] as Code[];

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;
    categoryIdSelected: number = 0;

    statusSelected: string = "";
    productCode: string = "";

    submitted: boolean = false;
    isLoading: boolean = false;

    productForm: FormGroup = this._formBuilder.group({
        id: [0],
        pdtName: ['', Validators.required],
        pdtNameEng: [''],
        pdtCode: [''],
        sort: [0, Validators.required],
        used: [false],
        categoryId: ['', Validators.required],
        status: ['', Validators.required],
        option1: [''],
        option2: [''],
        option3: [''],
        saleStartDate: ['', Validators.required],
        saleEndDate: [''],
        retailAmt: [''],
        newStartDate: [''],
        newEndDate: [''],
        bestStartDate: [''],
        bestEndDate: [''],
        promotionStartDate: [''],
        promotionEndDate: [''],
        tax: [''],
        amtId: [0]
    });

    get f(): { [key: string]: AbstractControl } {
        return this.productForm.controls;
    }

    ngOnInit(): void {
        this.getCategory();
        this.getProduct();
        this.getListCode();
    }

    onScroll(event: any) {
        const bottom =
            Math.round(event.target.scrollHeight - event.target.scrollTop) ===
            event.target.clientHeight;
        if (bottom && !this.isLoading) {
            this.first += 1;
            this.getProduct();
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.productForm.invalid) {
            return;
        }
        if (this.f['id'].value > 0) {
            this._productService.updateProduct(this.productForm.value).subscribe({
                next: (res: HttpResponse<Product>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as Product);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Chỉnh sửa thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();

                        this.products = [];
                        this.first = 0;
                        this.getProduct();
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
            this._productService.saveProduct(this.productForm.value).subscribe({
                next: (res: HttpResponse<Product>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as Product);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Lưu thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();

                        this.products = [];
                        this.first = 0;
                        this.getProduct();
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

    onReset() {
        this.submitted = false;

        this.productForm.patchValue({
            id: 0,
            pdtName: '',
            pdtNameEng: '',
            pdtCode: '',
            sort: 0,
            used: false,
            categoryId: '',
            status: '',
            option1: '',
            option2: '',
            option3: '',
            saleStartDate: '',
            saleEndDate: '',
            newStartDate: '',
            newEndDate: '',
            bestStartDate: '',
            bestEndDate: '',
            promotionStartDate: '',
            promotionEndDate: '',
            tax: 0,
            retailAmt: 0,
            amtId: 0
        });

        this.categoryIdSelected = 0;

        this.statusSelected = '';
    }

    onClickRow(item: Product) {
        this.productCode = item.pdtCode;
        this.getDetailProduct(item.pdtCode);
    }

    onChangeCategoryId(categoryId: string) {
        if (categoryId !== 'default') {
            this.productForm.patchValue({
                categoryId: categoryId
            });
        }
    }

    onChangeStatus(status: string) {
        if (status !== 'default') {
            this.productForm.patchValue({
                status: status
            });
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

    private getParamSearchProduct() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }

    private getCategory() {
        this._categoryService
            .getAllCategory(this.getParams())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.categories = res.body?.result || [];
                }
            });
    }

    private getParams() {
        return {
            page: 1,
            limit: 100,
            type: '01C30'
        };
    }

    private getListCode() {
        this._codeService.getListCode("P").subscribe(res => {
            if(res !== null && res !== undefined) {
                this.code = res.body || [];
            }
        });
    }

    private getDetailProduct(productCode: string) {
        this._productService.getDetailProduct(productCode).subscribe(res => {
            if(res !== null && res !== undefined) {
                let result: Product = res.body || {} as Product;
                this.productForm.patchValue({
                    id: result.id,
                    pdtName: result.pdtName,
                    pdtNameEng: result.pdtNameEng,
                    pdtCode: result.pdtCode,
                    sort: result.sort,
                    used: result.used,
                    categoryId: result.categoryId,
                    status: result.status,
                    option1: result.option1,
                    option2: result.option2,
                    option3: result.option3,
                    saleStartDate: result.saleStartDate,
                    saleEndDate: result.saleEndDate,
                    newStartDate: result.newStartDate,
                    newEndDate: result.newEndDate,
                    bestStartDate: result.bestStartDate,
                    bestEndDate: result.bestEndDate,
                    promotionStartDate: result.promotionStartDate,
                    promotionEndDate: result.promotionEndDate,
                    tax: result.tax,
                    retailAmt: result.retailAmt,
                    amtId: result.amtId
                });

                this.categoryIdSelected = result.categoryId;
                this.statusSelected = result.status;
            }
        });
    }
}
