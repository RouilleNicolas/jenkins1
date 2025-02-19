import { availableLocales } from './available-locales';
import { defaultLocale } from './index';

export const browserLocale = navigator.languages.find((locale) => availableLocales.has(locale)) || defaultLocale;
