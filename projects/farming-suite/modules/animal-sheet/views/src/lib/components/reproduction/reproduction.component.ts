import { Component, computed, inject, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { LanguageService } from '@cooperl/i18n';
import { TranslocoDirective } from '@jsverse/transloco';
import { ComponentInput } from '@testing-library/angular';
import { InformationCardComponent } from '../information-card/information-card.component';

@Component({
  selector: 'farming-suite-animal-sheet-reproduction',
  imports: [
    // Internal
    InformationCardComponent,
    // External
    MatCard,
    MatCardHeader,
    MatCardContent,
    TranslocoDirective,
    // Angular
  ],
  templateUrl: './reproduction.component.html',
  styleUrl: './reproduction.component.scss',
})
export class ReproductionComponent {
  public readonly farrowingInterval = input<number>(0);
  public readonly averageGestationLength = input.required<number>();
  public readonly averageLactationLength = input.required<number>();
  public readonly intervalWeaningFertilizingService = input.required<number>();
  public readonly returnNumber = input.required<number>();
  public readonly abortionNumber = input.required<number>();

  private languageService = inject(LanguageService);
  private i18nPrefix = 'farming-suite.animal-sheet.components.reproduction.';

  protected readonly secondRowInformationCardItem = computed((): ComponentInput<InformationCardComponent>[] => {
    return [
      {
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}average-gestation-length.suffix`),
        value: this.averageGestationLength() + ' ' + this.languageService.translate<string>(`${this.i18nPrefix}day-suffix`),
      },
      {
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}average-lactation-length.suffix`),
        value: this.averageLactationLength() + ' ' + this.languageService.translate<string>(`${this.i18nPrefix}day-suffix`),
      },
      {
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}interval-weaning-fertilizing-service.suffix`),
        value: this.intervalWeaningFertilizingService() + ' ' + this.languageService.translate<string>(`${this.i18nPrefix}day-suffix`),
      },
    ];
  });

  protected readonly thirdRowInformationCardItem = computed((): ComponentInput<InformationCardComponent>[] => {
    return [
      {
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}return.suffix`),
        value: this.returnNumber(),
      },
      {
        subtitle: this.languageService.translate<string>(`${this.i18nPrefix}abortion.suffix`),
        value: this.abortionNumber(),
      },
    ];
  });
}
