import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Response } from '../model/response.model';
import { Authentication } from '../model/authentication.model';
import { Data } from '../model/data.model';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonConstant } from '../utils/constant/common.constant';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const _authenticationService = inject(AuthenticationService);
    const _router = inject(Router);
    const _localStorageService = inject(LocalStorageService);

    const token: string = _authenticationService.getUserToken();

    if (token != '') {
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }
    return next(req).pipe(
        catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                // Handle HTTP errors
                if (err.status === 401) {
                    console.error('Unauthorized request:', err);
                    if(token != '') {
                        _authenticationService.adminGetToken({ token: token }).subscribe({
                            next: (res: HttpResponse<Response<Authentication>>) => {
                                if(res !== null && res !== undefined) {
                                    let authentication: Data<Authentication> = res.body?.data || {} as Data<Authentication>;
                                    _localStorageService.setItem(CommonConstant.LOCAL_USER, JSON.stringify(authentication));
                                }
                            },
                            error: () => {
                                _router.navigateByUrl("/");
                            }
                        });
                    } else {
                        _router.navigateByUrl("/");
                    }
                } else {
                    // Handle other HTTP error codes
                    console.error('HTTP error:', err);
                }
            } else {
                // Handle non-HTTP errors
                console.error('An error occurred:', err);
            }

            // Re-throw the error to propagate it further
            return throwError(() => err);
        })
    );
};
