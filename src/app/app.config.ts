import {
  ApplicationConfig,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { roleFeature } from './states/role/role.selectors';
import { RoleEffects } from './states/role/role.effects';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { authInterceptor } from '@core/interceptors/auth-interceptor';
import { appInitProvider, FilterApiInitializer, registerIcon } from '@core/providers/initRoleProvider';
import { UiConfigService } from '@shared/services/ui-config/ui-config-service';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {routes} from '@app/app.routes';
import {LanguageService} from '@shared/services/language/language-service';

registerLocaleData(localeVi);

const icons = Object.values(AllIcons);

export const appConfig: ApplicationConfig = {
  providers: [
    // 🌐 Core Angular setup
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),

    // 🧩 HTTP client (1 lần duy nhất)
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),

    // NgRx setup
    provideStore({
      [roleFeature.name]: roleFeature.reducer,
    }),
    provideEffects([RoleEffects]),

    // Custom providers
    appInitProvider,
    FilterApiInitializer,
    registerIcon,
    UiConfigService,

    // Locale setup
    { provide: LOCALE_ID, useValue: 'vi' },
    { provide: NZ_I18N, useValue: vi_VN },
    provideNzIcons(icons),

    // i18n (ngx-translate)
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: 'i18n/',   // dùng tương đối để hỗ trợ subpath deploy
        suffix: '.json'
      })
    }),

    // App initializer – đặt ngôn ngữ mặc định
    provideAppInitializer(() => {
      const languageService = inject(LanguageService);
      return languageService.initLanguage();
    }),
  ]
};
