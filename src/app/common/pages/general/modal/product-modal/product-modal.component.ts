import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../model/product.model';
import { ValidationUtil } from '../../../../utils/validation.util';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../../model/page-event.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-product-modal',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        PaginatorModule,
        InputGroupModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        TableModule
    ],
    templateUrl: './product-modal.component.html',
    styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent implements OnInit, OnChanges {
    @Input()
    visible: boolean = false;

    @Output()
    invisible = new EventEmitter<void>();

    @Output()
    selectRow = new EventEmitter<Product>();

    private _productService = inject(ProductService);

    query: string = "";

    page: number = 0;
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    products: Product[] = [] as Product[];

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(ValidationUtil.isNotNullAndNotUndefined(changes["visible"].currentValue)) {
            if(changes["visible"].currentValue === true) {
                this.getProduct();
            }
        }
    }

    onHide(event: any) {
        this.invisible.emit();
        this.query = "";
    }

    onSelectRow(item: Product) {
        this.selectRow.emit(item);
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
