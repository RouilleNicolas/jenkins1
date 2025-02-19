import { formatPercent, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ViewportService } from '@cooperl/design-system';
import { LanguageService } from '@cooperl/i18n';
import { TranslocoDirective } from '@jsverse/transloco';
import { ComponentInput } from '@testing-library/angular';
import { InformationCardComponent } from '../information-card/information-card.component';

@Component({
  selector: 'farming-suite-animal-sheet-loss-under-mother',
  imports: [
    //Internal
    InformationCardComponent,
    //External
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatChip,
    MatIcon,
    MatButtonModule,
    MatTooltip,
    TranslocoDirective,
    //Angular
    PercentPipe,
  ],
  templateUrl: './loss-under-mother.component.html',
  styleUrl: './loss-under-mother.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class LossUnderMotherComponent {
  public readonly lossUnderMotherPercent = input.required<number>();

  protected readonly isHandset = inject(ViewportService).isHandsetViewport;

  private readonly languageService = inject(LanguageService);
  private readonly i18nPrefix = 'farming-suite.animal-sheet.components.loss-under-mother.';

  // TODO : a Revoir une fois les objects du domain définie
  protected readonly informationCardItems = computed((): ComponentInput<InformationCardComponent>[] => {
    return [
      {
        value: formatPercent(1, this.languageService.getActiveLang(), '2.0-1'),
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}puny`),
      },
      {
        value: formatPercent(1, this.languageService.getActiveLang(), '2.0-1'),
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}dieback`),
      },
      {
        value: formatPercent(1, this.languageService.getActiveLang(), '2.0-1'),
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}digestive`),
      },
    ];
  });
}
