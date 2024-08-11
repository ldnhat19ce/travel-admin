import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { environment } from '../../../environments/environment';
import { Data } from '../model/data.model';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private _httpClient = inject(HttpClient);

    savePost(params: {}): Observable<HttpResponse<Post>> {
        let url = `${environment.apiUrl}/admin/post`;
        return this._httpClient.post<Post>(url, params, { observe: 'response' });
    }

    getAllPost(params: {}): Observable<HttpResponse<Data<Post[]>>> {
        let url = `${environment.apiUrl}/admin/post`;
        return this._httpClient.get<Data<Post[]>>(url, { params: params, observe: 'response' });
    }

    updatePost(id: number, params: {}): Observable<HttpResponse<Post>> {
        let url = `${environment.apiUrl}/admin/post/${id}`;
        return this._httpClient.put<Post>(url, params, { observe: 'response' });
    }

    deletePost(id: number): Observable<HttpResponse<void>> {
        let url = `${environment.apiUrl}/admin/post/${id}`;
        return this._httpClient.delete<void>(url, { observe: 'response' });
    }
}
