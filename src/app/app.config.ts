import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';

registerLocaleData(localeEsCo);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Hash routing keeps deep links working on static hosting such as GitHub Pages.
    provideRouter(
      routes,
      withHashLocation(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(),
    provideTranslateService({
      lang: 'es',
      fallbackLang: 'es',
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
    }),
    // Load the UI texts before the first render so no translation keys flash on screen.
    provideAppInitializer(() => firstValueFrom(inject(TranslateService).use('es'))),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
};
