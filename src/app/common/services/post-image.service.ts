import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostImage } from '../model/post-image.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostImageService {
    private _httpClient = inject(HttpClient);

    savePostImage(params: {}, postId: number): Observable<HttpResponse<PostImage>> {
        let url = `${environment.apiUrl}/admin/post-image/${postId}`;
        return this._httpClient.post<PostImage>(url, params, { observe: 'response' });
    }

    getAllByPostId(postId: number): Observable<HttpResponse<PostImage[]>> {
        let url = `${environment.apiUrl}/admin/post-image/${postId}`;
        return this._httpClient.get<PostImage[]>(url, { observe: 'response' });
    }
}
