import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { LanguageService } from './wrappers';

@Injectable()
export class TranslatedPageTitleStrategy extends TitleStrategy {
  private readonly _languageService = inject(LanguageService);

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.title.setTitle(this._languageService.translate(title));
    }
  }
}
