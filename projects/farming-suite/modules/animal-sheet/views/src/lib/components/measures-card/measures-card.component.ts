import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ViewportService } from '@cooperl/design-system';
import { MeasuresTag, MeasuresTagI18nMap } from '@cooperl/farming-suite/animal-sheet/domain';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoDatePipe } from '@jsverse/transloco-locale';

@Component({
  selector: 'farming-suite-animal-sheet-views-measures-page',
  imports: [
    // Angular
    // External
    MatCard,
    MatCardHeader,
    MatCardContent,
    TranslocoDatePipe,
    TranslocoDirective,
    CommonModule,
    // Internal
  ],
  templateUrl: './measures-card.component.html',
  styleUrl: './measures-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class MeasuresCardComponent {
  public readonly date = input.required<Date>();
  public readonly measures = input.required<number>();
  public readonly parity = input.required<number>();
  public readonly measuresTag = input.required<MeasuresTag>();
  public readonly isWeight = input.required<boolean>();

  protected readonly measuresTagI18nKey = computed(() => MeasuresTagI18nMap.get(this.measuresTag()) ?? '');
  protected readonly measuresTagCssClass = computed(() => {
    const measuresTagI18nKey = this.measuresTagI18nKey().replace(/-(entry|exit)$/, '');
    return `measures-tag-${measuresTagI18nKey}`;
  });
  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
