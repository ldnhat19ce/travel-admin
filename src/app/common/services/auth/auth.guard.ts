import { inject, PLATFORM_ID } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const platformId = inject(PLATFORM_ID);
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    if(isPlatformBrowser(platformId)) {
        if (authenticationService.isLogin()) {
            return true;
        } else {
            router.navigate(['/authentication']);
            return false;
        }
    }
    return false;
};
