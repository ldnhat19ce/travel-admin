import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductAmt } from '../model/product-amt.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductAmtService {
    private _httpClient = inject(HttpClient);

    getListProductAmt(productCode: string): Observable<HttpResponse<ProductAmt[]>> {
        let url = `${environment.apiUrl}/admin/product/amt/list/${productCode}`;
        return this._httpClient.get<ProductAmt[]>(url, { observe: 'response' });
    }

    saveProductAmt(params: {}): Observable<HttpResponse<ProductAmt>> {
        let url = `${environment.apiUrl}/admin/product/amt`;
        return this._httpClient.post<ProductAmt>(url, params, { observe: 'response' });
    }

    updateProductAmt(params: {}): Observable<HttpResponse<ProductAmt>> {
        let url = `${environment.apiUrl}/admin/product/amt`;
        return this._httpClient.put<ProductAmt>(url, params, { observe: 'response' });
    }

    deleteProductAmt(id: number): Observable<HttpResponse<ProductAmt>> {
        let url = `${environment.apiUrl}/admin/product/amt/${id}`;
        return this._httpClient.delete<ProductAmt>(url, { observe: 'response' });
    }
}
