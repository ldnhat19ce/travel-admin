import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { FormsModule } from '@angular/forms';
import { Error } from '../../../model/error.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../services/local-storage.service';
import { CommonConstant } from '../../../utils/constant/common.constant';
import { Authentication } from '../../../model/authentication.model';
import { Response } from '../../../model/response.model';
import { Data } from '../../../model/data.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [TranslateModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private _authenticationService = inject(AuthenticationService);
    private _translateService = inject(TranslateService);
    private _localStorageService = inject(LocalStorageService);
    private _router = inject(Router);

    email: WritableSignal<string> = signal<string>('');
    password: WritableSignal<string> = signal<string>('');

    errorEmail: WritableSignal<string> = signal<string>('');
    errorPassword: WritableSignal<string> = signal<string>('');

    resultError: Error = {} as Error;

    login() {
        let isValid = true;

        if (this.email().trim().length <= 0) {
            isValid = false;
            this.errorEmail.set(this._translateService.instant('msg.login.001'));
        }

        if (this.password().trim().length <= 0) {
            isValid = false;
            this.errorPassword.set(this._translateService.instant('msg.login.002'));
        }

        if (isValid) {
            this._authenticationService
                .adminAuthentication({ email: this.email().trim(), password: this.password().trim() })
                .subscribe({
                    next: (res: HttpResponse<Response<Authentication>>) => {
                        if(res !== null && res !== undefined) {
                            let authentication: Data<Authentication> = res.body?.data || {} as Data<Authentication>;
                            this._localStorageService.setItem(CommonConstant.LOCAL_USER, JSON.stringify(authentication));
                            this._router.navigateByUrl("/");
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this.resultError = err.error;
                    }
                });
        }
    }
}
