import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './common/services/local-storage.service';
import { LanguageUtil } from './common/utils/language.util';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private _translateService = inject(TranslateService);
    private _localStorageService = inject(LocalStorageService);

    constructor() {

    }

    ngOnInit(): void {
        this._translateService.use(
            LanguageUtil.getLanguage(this._localStorageService)
        );
    }
}
