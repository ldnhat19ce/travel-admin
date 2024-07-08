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

    saveProduct(params: {}): Observable<HttpResponse<Product>> {
        let url = `${environment.apiUrl}/admin/product`;
        return this._httpClient.post<Product>(url, params, { observe: 'response' });
    }

    updateProduct(params: {}): Observable<HttpResponse<Product>> {
        let url = `${environment.apiUrl}/admin/product`;
        return this._httpClient.put<Product>(url, params, { observe: 'response' });
    }

    getDetailProduct(id: string): Observable<HttpResponse<Product>> {
        let url = `${environment.apiUrl}/admin/product/${id}`;
        return this._httpClient.get<Product>(url, { observe: 'response' });
    }
}
