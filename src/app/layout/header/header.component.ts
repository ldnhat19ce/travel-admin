import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../common/services/local-storage.service';
import { CommonConstant } from '../../common/utils/constant/common.constant';
import { LanguageUtil } from '../../common/utils/language.util';
import { AuthenticationService } from '../../common/services/auth/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    private _localStorageService = inject(LocalStorageService);
    private _authenticationService = inject(AuthenticationService);

    currentLang: string = "vn";

    constructor() {

    }

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

    }

    onChangeLanguage(language: string) {
        this._localStorageService.setItem(CommonConstant.LOCAL_CURRENT_LANG, language);
        location.reload();
    }

    onShowSidebarMobile() {
        let mainWrapper = <HTMLDivElement> document.getElementById("main-wrapper");
        if(!mainWrapper.classList.contains("show-sidebar")) {
            mainWrapper.classList.add("show-sidebar");
        }
    }

    onLogout() {
        this._authenticationService.adminLogout();
    }
}
