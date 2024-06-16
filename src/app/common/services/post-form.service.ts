import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostForm } from '../model/post-form.model';
import { environment } from '../../../environments/environment';
import { Data } from '../model/data.model';

@Injectable({
    providedIn: 'root',
})
export class PostFormService {
    private _httpClient = inject(HttpClient);

    savePostForm(params: {}, postFormDefId: number): Observable<HttpResponse<PostForm>> {
        let url = `${environment.apiUrl}/admin/post-form/${postFormDefId}`;
        return this._httpClient.post<PostForm>(url, params, { observe: 'response' });
    }

    getAllByPostId(postFormDefId: number): Observable<HttpResponse<PostForm[]>> {
        let url = `${environment.apiUrl}/admin/post-form/${postFormDefId}`;
        return this._httpClient.get<PostForm[]>(url, { observe: 'response' });
    }

    getPagePostForm(params: {}, postFormDefId: number): Observable<HttpResponse<Data<PostForm[]>>> {
        let url = `${environment.apiUrl}/admin/post-form/page/${postFormDefId}`;
        return this._httpClient.get<Data<PostForm[]>>(url, { params: params, observe: 'response' });
    }

    updatePostForm(id: number, params: {}): Observable<HttpResponse<PostForm>> {
        let url = `${environment.apiUrl}/admin/post-form/${id}`;
        return this._httpClient.put<PostForm>(url, params, { observe: 'response' });
    }

    deletePostForm(id: number): Observable<HttpResponse<void>> {
        let url = `${environment.apiUrl}/admin/post-form/${id}`;
        return this._httpClient.delete<void>(url, { observe: 'response' });
    }
}
