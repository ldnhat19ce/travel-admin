import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../model/data.model';
import { Booking } from '../model/booking.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    private _httpClient = inject(HttpClient);

    getPageBooking(params: {}): Observable<HttpResponse<Data<Booking[]>>> {
        let url = `${environment.apiUrl}/admin/booking/page`;
        return this._httpClient.post<Data<Booking[]>>(url, params, { observe: 'response' });
    }
}
