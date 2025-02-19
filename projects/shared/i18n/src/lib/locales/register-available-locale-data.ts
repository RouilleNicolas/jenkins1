import { registerLocaleData } from '@angular/common';
import { availableLocales } from './available-locales';

export const registerAvailableLocales = (): void => {
  const availableAngularLocaleData = [...availableLocales.values()].map((availableLocale) => availableLocale.angularLocaleData());
  Promise.all(availableAngularLocaleData).then((localeData) => {
    localeData.forEach((data) => registerLocaleData(data));
  });
};
