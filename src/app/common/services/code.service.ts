import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Code } from '../model/code.model';
import { environment } from '../../../environments/environment';
import { CodeKind } from '../model/code-kind.model';

@Injectable({
    providedIn: 'root',
})
export class CodeService {
    private _httpClient = inject(HttpClient);

    getListCodeKind(): Observable<HttpResponse<CodeKind[]>> {
        let url = `${environment.apiUrl}/admin/code/kind`;
        return this._httpClient.get<CodeKind[]>(url, { observe: 'response' });
    }

    getListCode(kindCode: string): Observable<HttpResponse<Code[]>> {
        let url = `${environment.apiUrl}/admin/code?kindCode=${kindCode}`;
        return this._httpClient.get<Code[]>(url, { observe: 'response' });
    }

    saveCode(params: {}): Observable<HttpResponse<Code>> {
        let url = `${environment.apiUrl}/admin/code`;
        return this._httpClient.post<Code>(url, params, { observe: 'response' });
    }

    updateCode(params: {}): Observable<HttpResponse<Code>> {
        let url = `${environment.apiUrl}/admin/code`;
        return this._httpClient.put<Code>(url, params, { observe: 'response' });
    }

    deleteCode(id: number): Observable<HttpResponse<void>> {
        let url = `${environment.apiUrl}/admin/code/${id}`;
        return this._httpClient.delete<void>(url, { observe: 'response' });
    }
}
