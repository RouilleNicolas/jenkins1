import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LanguageService } from '../wrappers';

@Injectable()
export class TranslatedPaginatorIntl extends MatPaginatorIntl {
  private readonly _languageService = inject(LanguageService);

  constructor() {
    super();

    this._languageService.selectTranslateObject('paginator').subscribe((translations) => {
      this.itemsPerPageLabel = translations.itemsPerPageLabel;
      this.nextPageLabel = translations.nextPageLabel;
      this.previousPageLabel = translations.previousPageLabel;
      this.firstPageLabel = translations.firstPageLabel;
      this.lastPageLabel = translations.lastPageLabel;
      this.getRangeLabel = (page: number, pageSize: number, totalElements: number) => {
        const firstElement = page * pageSize + 1;
        const lastElement = Math.max((page + 1) * pageSize, length);
        return this._languageService.translate('paginator.rangeLabel', { firstElement, lastElement, totalElements });
      };
    });
  }
}
