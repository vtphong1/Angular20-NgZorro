import {
  ApplicationConfig, LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {provideStore} from '@ngrx/store';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {roleFeature} from './states/role/role.selectors';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {RoleEffects} from './states/role/role.effects';
import {NZ_I18N, vi_VN, zh_CN} from 'ng-zorro-antd/i18n';
const icons = Object.values(AllIcons);

import localeVi from '@angular/common/locales/vi';
import {registerLocaleData} from '@angular/common';
import {authInterceptor} from '@core/interceptors/auth-interceptor';
import {appInitProvider, FilterApiInitializer, registerIcon} from '@core/providers/initRoleProvider';
import {UiConfigService} from '@shared/services/ui-config/ui-config-service';

registerLocaleData(localeVi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNzIcons(icons),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideStore({
      [roleFeature.name]: roleFeature.reducer,
    }),
    provideEffects([RoleEffects]),
    appInitProvider,
    UiConfigService,
    FilterApiInitializer,
    registerIcon,
    { provide: LOCALE_ID, useValue: 'vi' },
    { provide: NZ_I18N, useValue: vi_VN }
  ]
};
