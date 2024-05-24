import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private _httpClient = inject(HttpClient);

    savePost(params: {}): Observable<HttpResponse<Post>> {
        let url = `${environment.apiUrl}/admin/post`;
        return this._httpClient.post<Post>(url, params, { observe: 'response' });
    }
}
