import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Authentication } from '../../model/authentication.model';
import { Observable } from 'rxjs';
import { Response } from '../../model/response.model';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../local-storage.service';
import { CommonConstant } from '../../utils/constant/common.constant';
import { isAdmin } from '../../store/auth.store';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _httpClient = inject(HttpClient);
    private _localStorageService = inject(LocalStorageService);
    private _router = inject(Router);

    private _isAdminSignal = isAdmin;

    constructor() {}

    adminAuthentication(params: {}): Observable<HttpResponse<Response<Authentication>>> {
        let url = `${environment.apiUrl}/admin/authentication/sign-in`;
        return this._httpClient.post<Response<Authentication>>(url, params, {
            observe: 'response',
        });
    }

    adminGetToken(params: {}): Observable<HttpResponse<Response<Authentication>>> {
        let url = `${environment.apiUrl}/admin/authentication/access-token`;
        return this._httpClient.post<Response<Authentication>>(url, params, {
            observe: 'response',
        });
    }

    adminLogout() {
        this._isAdminSignal.set(false);
        this._localStorageService.setItem(CommonConstant.LOCAL_USER, null);
        this._router.navigateByUrl("/authentication");
    }

    isTokenExpired(expiredTime: number): boolean {
        if (expiredTime) {
            return 1000 * expiredTime - new Date().getTime() < 5000;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        if(this.haveLocalStorage(CommonConstant.LOCAL_USER)) {
            let authentication: Authentication = JSON.parse(this._localStorageService.getItem(CommonConstant.LOCAL_USER, null));
            if(authentication) {
                if(authentication.admin) {
                    return true;
                }
            }
        }
        return false;
    }

    isLogin(): boolean {
        if(this.haveLocalStorage(CommonConstant.LOCAL_USER)) {
            let authentication: Authentication = JSON.parse(this._localStorageService.getItem(CommonConstant.LOCAL_USER, null));
            if(authentication) {
                if(authentication.admin) {
                    return true;
                }
            }
        }
        return false;
    }

    getUserToken() {
        if(this.haveLocalStorage(CommonConstant.LOCAL_USER)) {
            let authentication: Authentication = JSON.parse(this._localStorageService.getItem(CommonConstant.LOCAL_USER, null));
            if(authentication) {
                return authentication.token;
            }
        }

        return "";
    }

    private haveLocalStorage(key: string) {
        let localStorage = this._localStorageService.getItem(key, null);
        if(localStorage) {
            return true;
        }
        return false;
    }
}
