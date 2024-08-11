import { inject, Pipe, PipeTransform } from '@angular/core';
import { Category } from '../model/category.model';
import { LocalStorageService } from '../services/local-storage.service';
import { LanguageUtil } from '../utils/language.util';

@Pipe({
    name: 'transformCategory',
    standalone: true,
})
export class TransformCategoryPipe implements PipeTransform {
    private _localStorageService = inject(LocalStorageService);

    transform(value: Category): string {
        let currentLang = LanguageUtil.getLanguage(this._localStorageService);
        switch (currentLang) {
            case 'vn':
                return value.name;

            case 'us':
                return value.nameEng;

            default:
                return value.name;
        }
    }
}
