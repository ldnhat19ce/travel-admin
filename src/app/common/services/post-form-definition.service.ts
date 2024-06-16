import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostFormDefinition } from '../model/post-form-definition.model';
import { Data } from '../model/data.model';

@Injectable({
    providedIn: 'root',
})
export class PostFormDefinitionService {
    private _httpClient = inject(HttpClient);

    savePostFormDefinition(params: {}): Observable<HttpResponse<PostFormDefinition>> {
        let url = `${environment.apiUrl}/admin/post-form/definition`;
        return this._httpClient.post<PostFormDefinition>(url, params, { observe: 'response' });
    }

    getAllByPostId(params: {}): Observable<HttpResponse<PostFormDefinition[]>> {
        let url = `${environment.apiUrl}/admin/post-form/definition`;
        return this._httpClient.get<PostFormDefinition[]>(url, { params: params, observe: 'response' });
    }

    getPagePostFormDef(params: {}): Observable<HttpResponse<Data<PostFormDefinition[]>>> {
        let url = `${environment.apiUrl}/admin/post-form/definition/page`;
        return this._httpClient.get<Data<PostFormDefinition[]>>(url, { params: params, observe: 'response' });
    }

    updatePostFormDef(params: {}): Observable<HttpResponse<PostFormDefinition>> {
        let url = `${environment.apiUrl}/admin/post-form/definition`;
        return this._httpClient.put<PostFormDefinition>(url, params, { observe: 'response' });
    }

    deletePostFormDef(id: number): Observable<HttpResponse<void>> {
        let url = `${environment.apiUrl}/admin/post-form/definition/${id}`;
        return this._httpClient.delete<void>(url, { observe: 'response' });
    }
}
