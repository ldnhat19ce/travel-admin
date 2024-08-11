import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductZone } from '../model/product-zone.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductZoneService {
    private _httpClient = inject(HttpClient);

    getListProductRelation(productCode: string): Observable<HttpResponse<ProductZone[]>> {
        let url = `${environment.apiUrl}/admin/product/zone/${productCode}`;
        return this._httpClient.get<ProductZone[]>(url, { observe: 'response' });
    }
}
