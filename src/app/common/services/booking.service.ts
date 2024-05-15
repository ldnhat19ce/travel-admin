import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Booking } from '../model/booking.model';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    getAllCategory(page: number, len: number): Observable<HttpResponse<Response<Booking[]>>> {
        let url = `${environment.apiUrl}/booking?page=${page}&len=${len}`;
        return this._httpClient.get<Response<Booking[]>>(url, { observe: 'response' });
    }
}
