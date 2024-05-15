import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    if (inject(AuthenticationService).isLogin()) {
        return true;
    }
    inject(Router).navigate(['/authentication']);
    return false;
};
