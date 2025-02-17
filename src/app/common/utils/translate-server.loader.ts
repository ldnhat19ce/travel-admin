import { TranslateLoader } from "@ngx-translate/core";
import { join } from "path";
import { Observable } from "rxjs";
import * as fs from 'fs';

export class TranslateServerLoader implements TranslateLoader {
    constructor(
        private prefix: string = 'i18n',
        private suffix: string = '.json'
    ) {}

    public getTranslation(lang: string): Observable<any> {
        return new Observable((observer) => {
            const assetsFolder = join(
                process.cwd(),
                'dist',
                'localize', // Your project name here
                'browser',
                'assets',
                this.prefix
            );

            const jsonData = JSON.parse(
                fs.readFileSync(`${assetsFolder}/message-${lang}${this.suffix}`, 'utf8')
            );

            observer.next(jsonData);
            observer.complete();
        });
    }
}

export function translateServerLoaderFactory(): TranslateLoader {
    return new TranslateServerLoader();
}
