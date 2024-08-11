import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Data } from '../model/data.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    getAllCategory(params: {}): Observable<HttpResponse<Data<Category[]>>> {
        let url = `${environment.apiUrl}/admin/category`;
        return this._httpClient.get<Data<Category[]>>(url, { params: params, observe: 'response' });
    }

    getAllCategoryHierarchy(params: {}): Observable<HttpResponse<Data<Category[]>>> {
        let url = `${environment.apiUrl}/admin/category/hierarchy`;
        return this._httpClient.get<Data<Category[]>>(url, { params: params, observe: 'response' });
    }

    saveCategory(params: {}): Observable<HttpResponse<Category>> {
        let url = `${environment.apiUrl}/admin/category`;
        return this._httpClient.post<Category>(url, params, { observe: 'response' });
    }

    updateCategory(id: number, params: {}): Observable<HttpResponse<Category>> {
        let url = `${environment.apiUrl}/admin/category/${id}`;
        return this._httpClient.put<Category>(url, params, { observe: 'response' });
    }

    deleteCategory(id: number): Observable<HttpResponse<Category>> {
        let url = `${environment.apiUrl}/admin/category/${id}`;
        return this._httpClient.delete<Category>(url, { observe: 'response' });
    }
}
