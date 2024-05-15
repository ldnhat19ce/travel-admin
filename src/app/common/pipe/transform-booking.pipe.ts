import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from '../model/booking.model';

@Pipe({
    name: 'transformBooking',
    standalone: true,
})
export class TransformBookingPipe implements PipeTransform {
    transform(value: Booking, currentLang: string): string {
        switch (currentLang) {
            case 'vn':
                return value.name;

            case 'us':
                return value.nameEng;

            default:
                return value.name;
        }
    }
}
