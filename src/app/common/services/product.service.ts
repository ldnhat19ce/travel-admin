import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Data } from '../model/data.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private _httpClient = inject(HttpClient);

    getPageProduct(params: {}): Observable<HttpResponse<Data<Product[]>>> {
        let url = `${environment.apiUrl}/admin/product`;
        return this._httpClient.get<Data<Product[]>>(url, { params: params, observe: 'response' });
    }
}
