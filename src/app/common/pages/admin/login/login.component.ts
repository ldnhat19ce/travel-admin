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
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        TranslateModule,
        FormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private _authenticationService = inject(AuthenticationService);
    private _translateService = inject(TranslateService);
    private _localStorageService = inject(LocalStorageService);
    private _router = inject(Router);
    private _messageService = inject(MessageService);

    email: WritableSignal<string> = signal<string>('');
    password: WritableSignal<string> = signal<string>('');

    errorEmail: WritableSignal<string> = signal<string>('');
    errorPassword: WritableSignal<string> = signal<string>('');

    resultError: Error = {} as Error;

    loading: boolean = false;

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
            this.loading = true;

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
                        this._messageService.add({ severity: 'error', summary: 'Error', detail: this.resultError.message, key: 'br', life: 5000 });
                        this.loading = false;
                    }
                });
        }
    }
}
