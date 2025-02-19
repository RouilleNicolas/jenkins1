import { enGB, frFR } from './all-locales.const';
import { AvailableLocale } from './available-locale.interface';

export const availableLocales = new Map<string, AvailableLocale>()
  .set(frFR, {
    dateFnsLocaleData: () => import('date-fns/locale/fr').then((module) => module.fr),
    angularLocaleData: () => import('@angular/common/locales/fr').then((module) => module.default),
  })
  .set(enGB, {
    dateFnsLocaleData: () => import('date-fns/locale/en-GB').then((module) => module.enGB),
    angularLocaleData: () => import('@angular/common/locales/en-GB').then((module) => module.default),
  });
// .set(deDE, {
//   dateFnsLocaleData: () => import('date-fns/locale/de').then((module) => module.de),
//   angularLocaleData: () => import('@angular/common/locales/de').then((module) => module.default),
// })
// .set(esES, {
//   dateFnsLocaleData: () => import('date-fns/locale/es').then((module) => module.es),
//   angularLocaleData: () => import('@angular/common/locales/es').then((module) => module.default),
// })
// .set(nlNL, {
//   dateFnsLocaleData: () => import('date-fns/locale/nl').then((module) => module.nl),
//   angularLocaleData: () => import('@angular/common/locales/nl').then((module) => module.default),
// })
// .set(plPL, {
//   dateFnsLocaleData: () => import('date-fns/locale/pl').then((module) => module.pl),
//   angularLocaleData: () => import('@angular/common/locales/pl').then((module) => module.default),
// })
// .set(ruRU, {
//   dateFnsLocaleData: () => import('date-fns/locale/ru').then((module) => module.ru),
//   angularLocaleData: () => import('@angular/common/locales/ru').then((module) => module.default),
// })
// .set(thTH, {
//   dateFnsLocaleData: () => import('date-fns/locale/th').then((module) => module.th),
//   angularLocaleData: () => import('@angular/common/locales/th').then((module) => module.default),
// })
// .set(viVN, {
//   dateFnsLocaleData: () => import('date-fns/locale/vi').then((module) => module.vi),
//   angularLocaleData: () => import('@angular/common/locales/vi').then((module) => module.default),
// })
// .set(zhCN, {
//   dateFnsLocaleData: () => import('date-fns/locale/zh-CN').then((module) => module.zhCN),
//   angularLocaleData: () => import('@angular/common/locales/zh-Hans').then((module) => module.default),
// })
// .set(zhTW, {
//   dateFnsLocaleData: () => import('date-fns/locale/zh-TW').then((module) => module.zhTW),
//   angularLocaleData: () => import('@angular/common/locales/zh-Hant').then((module) => module.default),
// });
