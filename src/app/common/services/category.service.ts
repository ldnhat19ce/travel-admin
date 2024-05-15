import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    getAllCategory(params: {}): Observable<HttpResponse<Response<Category[]>>> {
        let url = `${environment.apiUrl}/admin/category`;
        return this._httpClient.get<Response<Category[]>>(url, { params: params, observe: 'response' });
    }

    saveCategory(params: {}): Observable<HttpResponse<Response<Category>>> {
        let url = `${environment.apiUrl}/admin/category`;
        return this._httpClient.post<Response<Category>>(url, params, { observe: 'response' });
    }
}
