import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    isBrowser: boolean = false;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    getItem(key: string, defaultValue: any) {
        if (this.isBrowser) {
            let ls = localStorage.getItem(key);
            if(ls) {
                return this.decrypt(ls);
            }
            return defaultValue;
        }
        return defaultValue;
    }

    setItem(key: string, value: any): void {
        if (this.isBrowser) {
            localStorage.setItem(key, this.encrypt(value));
        }
    }

    removeItem(key: string): void {
        if (this.isBrowser) {
            localStorage.removeItem(key);
        }
    }

    clearData(): void {
        if (this.isBrowser) {
            localStorage.clear();
        }
    }

    private encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, environment.keyEncrypt).toString();
    }

    private decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, environment.keyEncrypt).toString(
            CryptoJS.enc.Utf8
        );
    }
}
