import { inject } from '@angular/core';
import { browserLocale } from './locales/browser-locales.const';
import { LanguageService } from './wrappers';

export const waitForTranslationsInit = () => inject(LanguageService).setActiveLang(browserLocale).selectTranslation(browserLocale);
