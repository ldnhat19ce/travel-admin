import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { PageEvent } from '../../../../model/page-event.model';
import { ValidationUtil } from '../../../../utils/validation.util';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../model/product.model';
import { PaginatorModule } from 'primeng/paginator';
import { productSignal } from '../../../../store/product-sidebar.store';

@Component({
    selector: 'app-product-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        SidebarModule,
        TableModule,
        InputGroupModule,
        InputTextModule,
        ButtonModule,
        PaginatorModule,
        ReactiveFormsModule
    ],
    templateUrl: './product-sidebar.component.html',
    styleUrl: './product-sidebar.component.scss',
})
export class ProductSidebarComponent implements OnInit {
    private _productService = inject(ProductService);

    products: Product[] = [] as Product[];

    visible: boolean = false;

    query: string = "";

    page: number = 0;
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    ngOnInit(): void {
        this.getProduct();
    }

    onOpenSidebar() {
        this.visible = true;
    }

    onPageChange(event: PageEvent) {
        if (
            ValidationUtil.isNotNullAndNotUndefined(event.first) &&
            ValidationUtil.isNotNullAndNotUndefined(event.rows)
        ) {
            this.page = event.page || 0;
            this.rows = event.rows || 1;
            this.getProduct();
        }
    }

    onSelectRow(item: Product) {
        productSignal.set(item);
        this.visible = false;
    }

    getProduct() {
        this._productService
            .getPageProduct(this.getParamSearchProduct())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let productResult = res.body?.result || [];
                    this.products = productResult;
                    this.totalRecords = res.body?.total || 0;
                }
            });
    }

    private getParamSearchProduct() {
        return {
            page: this.page + 1,
            limit: this.rows,
            query: this.query
        };
    }
}
