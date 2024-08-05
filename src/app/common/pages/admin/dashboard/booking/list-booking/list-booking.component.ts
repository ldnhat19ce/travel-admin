import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { ProductModalComponent } from '../../../../general/modal/product-modal/product-modal.component';
import { Product } from '../../../../../model/product.model';
import { DateFnsModule } from 'ngx-date-fns';
import { format } from 'date-fns';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { PageEvent } from '../../../../../model/page-event.model';
import { Booking } from '../../../../../model/booking.model';
import { BookingService } from '../../../../../services/booking.service';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-list-booking',
    standalone: true,
    imports: [
        CommonModule,
        CalendarModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        ProductModalComponent,
        DateFnsModule,
        TableModule,
        SkeletonModule
    ],
    templateUrl: './list-booking.component.html',
    styleUrl: './list-booking.component.scss',
})
export class ListBookingComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _bookingService = inject(BookingService);

    productModalVisible: boolean = false;
    isSorted: any = null;

    page: number = 0;
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    bookings: Booking[] = [] as Booking[];
    initialValue: Booking[] = [] as Booking[];
    virtualBookings: Booking[] = [] as Booking[];

    @ViewChild('dt')
    dt: Table = {} as Table;

    filterForm: FormGroup = this._formBuilder.group({
        productCode: [''],
        bookingCode: [''],
        startDateDisplay: [format(new Date(), 'dd/MM/yyyy')],
        endDateDisplay: [format(new Date(), 'dd/MM/yyyy')],
        phone: [''],
        codeAddOn: ['0'],
        dataAddOn: [''],
        query: [''],
        page: [this.page + 1],
        len: [this.rows],
        startDate: [format(new Date(), 'yyyyMMdd')],
        endDate: [format(new Date(), 'yyyyMMdd')],
    });

    ngOnInit(): void {
        this.bookings = Array.from({ length: 10 });
        this.virtualBookings = Array.from({ length: 10 });

        this.onSubmit();
    }

    onShowProductModal() {
        this.productModalVisible = true;
    }

    onCloseProductModal(event: any) {
        this.productModalVisible = false;
    }

    onClickRow(item: Product) {
        this.filterForm.patchValue({
            query: item.pdtCode + " (" + item.pdtName + ")",
            productCode: item.pdtCode
        });
        this.productModalVisible = false;
    }

    onSubmit() {
        this.bookings = Array.from({ length: 10 });
        this.virtualBookings = Array.from({ length: 10 });

        let startDate: string = this.filterForm.controls["startDateDisplay"].value;
        let endDate: string = this.filterForm.controls["endDateDisplay"].value;

        if(ValidationUtil.isNotNullAndNotUndefined(startDate)) {
            let startDateSplit = startDate.split("/");
            this.filterForm.patchValue({
                startDate: format(new Date(Number(startDateSplit[2]), Number(startDateSplit[1]) - 1, Number(startDateSplit[0])), "yyyyMMdd")
            });
        }

        if(ValidationUtil.isNotNullAndNotUndefined(endDate)) {
            let endDateSplit = endDate.split("/");
            this.filterForm.patchValue({
                endDate: format(new Date(Number(endDateSplit[2]), Number(endDateSplit[1]) - 1, Number(endDateSplit[0])), "yyyyMMdd")
            });
        }

        this.getBooking();
    }

    onPageChange(event: PageEvent) {
        if (
            ValidationUtil.isNotNullAndNotUndefined(event.first) &&
            ValidationUtil.isNotNullAndNotUndefined(event.rows)
        ) {
            this.page = event.page || 0;
            this.rows = event.rows || 1;
            this.filterForm.patchValue({
                page: this.page + 1,
                len: this.rows
            });

            this.getBooking();
        }
    }

    getBooking() {
        this._bookingService.getPageBooking(this.filterForm.value).subscribe(res => {
            if (res !== null && res !== undefined) {
                let bookingResult = res.body?.result || [];
                this.bookings = bookingResult;
                this.totalRecords = res.body?.total || 0;
                this.initialValue = [...this.bookings];
            }
        });
    }

    customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.bookings = [...this.initialValue];
            this.dt.reset();
        }
    }

    loadBookingLazy(event: any) {
        setTimeout(() => {
            if(event.first !== null && event.first !== undefined &&
                event.rows !== null && event.rows !== undefined
            ) {
                let loadedBookings = this.bookings.slice(event.first, event.first + event.rows);

                Array.prototype.splice.apply(this.virtualBookings, [event.first, event.rows, ...loadedBookings]);


                event.forceUpdate();
            }
        }, 50000);
    }

    private sortTableData(event: any) {
        event.data.sort((data1: any, data2: any) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }

}
