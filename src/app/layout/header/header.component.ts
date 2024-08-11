import {
    Component,
    ElementRef,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { LocalStorageService } from '../../common/services/local-storage.service';
import { CommonConstant } from '../../common/utils/constant/common.constant';
import { LanguageUtil } from '../../common/utils/language.util';
import { AuthenticationService } from '../../common/services/auth/authentication.service';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../common/services/layout/app.layout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    private _localStorageService = inject(LocalStorageService);
    private _authenticationService = inject(AuthenticationService);

    currentLang: string = 'vn';

    items!: MenuItem[];

    @ViewChild('menubutton')
    menuButton!: ElementRef;

    @ViewChild('topbarmenubutton')
    topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu')
    menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);
    }

    onChangeLanguage(language: string) {
        this._localStorageService.setItem(
            CommonConstant.LOCAL_CURRENT_LANG,
            language
        );
        location.reload();
    }

    onLogout() {
        this._authenticationService.adminLogout();
    }
}
