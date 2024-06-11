import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostFormResult } from '../model/post-form-result.model';
import { Data } from '../model/data.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostFormResultService {
    private _httpClient = inject(HttpClient);

    getPagePostFormResult(params: {}, postId: number): Observable<HttpResponse<Data<PostFormResult[]>>> {
        let url = `${environment.apiUrl}/admin/post-form/result/${postId}`;
        return this._httpClient.get<Data<PostFormResult[]>>(url, { params: params, observe: 'response' });
    }
}
