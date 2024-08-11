import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductRelation } from '../model/product-relation.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductRelationService {
    private _httpClient = inject(HttpClient);

    getListProductRelation(productCode: string): Observable<HttpResponse<ProductRelation[]>> {
        let url = `${environment.apiUrl}/admin/product/related/${productCode}`;
        return this._httpClient.get<ProductRelation[]>(url, { observe: 'response' });
    }

    saveProductRelation(params: {}): Observable<HttpResponse<ProductRelation>> {
        let url = `${environment.apiUrl}/admin/product/related`;
        return this._httpClient.post<ProductRelation>(url, params, { observe: 'response' });
    }

    updateProductRelation(params: {}): Observable<HttpResponse<ProductRelation>> {
        let url = `${environment.apiUrl}/admin/product/related`;
        return this._httpClient.put<ProductRelation>(url, params, { observe: 'response' });
    }

    deleteProductRelation(productCode: string, relatedProductCode: string): Observable<HttpResponse<void>> {
        let url = `${environment.apiUrl}/admin/product/related/${productCode}/${relatedProductCode}`;
        return this._httpClient.delete<void>(url, { observe: 'response' });
    }
}
