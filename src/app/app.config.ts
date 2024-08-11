import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './common/interceptor/jwt.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoaderFactory } from './common/utils/translate-browser.loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { viCf } from './common/utils/date-fns.config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            })
        ),
        provideClientHydration(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: httpTranslateLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),
        importProvidersFrom(BrowserAnimationsModule),
        { provide: DateFnsConfigurationService, useValue: viCf }
    ],
};
