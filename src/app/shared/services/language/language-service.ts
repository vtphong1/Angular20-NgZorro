import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, vi_VN, en_US } from 'ng-zorro-antd/i18n';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private nzI18n = inject(NzI18nService);

  private readonly LANG_KEY = 'app_language';

  initLanguage(): void {
    const savedLang = localStorage.getItem(this.LANG_KEY);
    const defaultLang = savedLang || 'vi';

    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);

    // Sync với ng-zorro
    // this.nzI18n.setLocale(defaultLang === 'vi' ? vi_VN : en_US);
  }

  setLanguage(lang: 'vi' | 'en'): void {
    localStorage.setItem(this.LANG_KEY, lang);
    this.translate.use(lang);
    this.nzI18n.setLocale(lang === 'vi' ? vi_VN : en_US);

    // Reload LOCALE_ID runtime nếu cần dùng DatePipe, CurrencyPipe
    document.documentElement.lang = lang;
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'vi';
  }
}
