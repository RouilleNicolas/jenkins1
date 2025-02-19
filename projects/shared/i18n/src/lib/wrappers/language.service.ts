import { Injectable, inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Logger } from '@cooperl/logger';
 
import { TranslocoService } from '@jsverse/transloco';
import { setDefaultOptions } from 'date-fns';
import { enGB as dateFnsEnGB } from 'date-fns/locale/en-GB';
import { enGB } from '../locales';
import { availableLocales } from '../locales/available-locales';

@Injectable()
export class LanguageService extends TranslocoService {
  private readonly _logger = new Logger('LanguageService');
  private readonly _dateAdapter = inject(DateAdapter);

  public override setActiveLang(lang: string): this {
    this._logger.info('Setting active language', lang);

    this._updateDateFnsLocale(lang);

    return super.setActiveLang(lang);
  }

  private async _updateDateFnsLocale(lang: string): Promise<void> {
    const getLocale =
      availableLocales.get(lang)?.dateFnsLocaleData ?? availableLocales.get(enGB)?.dateFnsLocaleData ?? (() => Promise.resolve(dateFnsEnGB));

    const locale = await getLocale();

    this._dateAdapter.setLocale(locale);
    setDefaultOptions({ locale });
  }
}
