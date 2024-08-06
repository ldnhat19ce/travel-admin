import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookingComponent } from './list-booking/list-booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

const routes: Routes = [
    { path: '', component: ListBookingComponent },
    { path: ':bookingCode', component: BookingDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookingRoutingModule {}
