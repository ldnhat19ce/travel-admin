import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/product.service';
import { Product } from '../../../../../model/product.model';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../model/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { TransformCategoryPipe } from '../../../../../pipe/transform-category.pipe';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-save-product',
    standalone: true,
    imports: [
        ToastModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TransformCategoryPipe
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './save-product.component.html',
    styleUrl: './save-product.component.scss',
})
export class SaveProductComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productService = inject(ProductService);
    private _categoryService = inject(CategoryService);

    products: Product[] = [] as Product[];

    categories: Category[] = [] as Category[];

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;
    productId: number = 0;
    categoryIdSelected: number = 0;

    submitted: boolean = false;
    isLoading: boolean = false;

    productForm: FormGroup = this._formBuilder.group({
        id: [0],
        pdtName: ['', Validators.required],
        pdtNameEng: ['', Validators.required],
        pdtCode: ['', Validators.required],
        sort: [0, Validators.required],
        used: [false],
        categoryId: [0],
    });

    get f(): { [key: string]: AbstractControl } {
        return this.productForm.controls;
    }

    ngOnInit(): void {
        this.getCategory();
        this.getProduct();
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

    }

    onReset() {

    }

    onClickRow(item: Product) {
        this.productId = item.id;
        // this.getProductImage();
    }

    onChangeCategoryId(categoryId: string) {
        if (categoryId !== 'default') {
            this.productForm.patchValue({
                categoryId: categoryId
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
        };
    }
}
