import { formatPercent, PercentPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { ViewportService } from '@cooperl/design-system';
import { LanguageService } from '@cooperl/i18n';
import { TranslocoDirective } from '@jsverse/transloco';
import { PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { InformationCardComponent } from '../information-card/information-card.component';
echarts.use([PieChart, GridComponent, CanvasRenderer]);

@Component({
  selector: 'farming-suite-animal-sheet-results-by-litter',
  imports: [
    //Internal
    InformationCardComponent,
    //External
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatChip,
    TranslocoDirective,
    NgxEchartsDirective,
    //Angular
    PercentPipe,
  ],
  templateUrl: './results-by-litter.component.html',
  styleUrl: './results-by-litter.component.scss',
  providers: [provideEchartsCore({ echarts })],
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class ResultsByLitterComponent {
  public readonly littersWeanedOnFarm = input.required<number>();
  public readonly mummifiedSum = input.required<number>();
  public readonly bornAliveSum = input.required<number>();
  public readonly stillbornSum = input.required<number>();

  private readonly languageService = inject(LanguageService);

  protected readonly isHandset = inject(ViewportService).isHandsetViewport;

  protected readonly bornSum = computed(() => this.mummifiedSum() + this.bornAliveSum() + this.stillbornSum());
  protected readonly bornAverage = computed(() => this.bornSum() / this.littersWeanedOnFarm());
  protected readonly mummifiedAverage = computed(() => this.littersWeanedOnFarm() / this.mummifiedSum());
  protected readonly bornAliveAverage = computed(() => this.littersWeanedOnFarm() / this.bornAliveSum());
  protected readonly stillbornAverage = computed(() => this.littersWeanedOnFarm() / this.stillbornSum());
  protected readonly bornLossPercent = computed(() => (this.mummifiedSum() + this.stillbornSum()) / this.bornSum());
  protected readonly remainingBornLossPercent = computed(() => 1 - this.bornLossPercent());
  protected readonly mummifiedPercent = computed(() => this.mummifiedSum() / this.bornSum());
  protected readonly bornAlivePercent = computed(() => this.bornAliveSum() / this.bornSum());
  protected readonly stillbornPercent = computed(() => this.stillbornSum() / this.bornSum());
  protected readonly chartOptions = computed((): ECBasicOption => {
    return {
      series: [
        {
          label: {
            show: false,
          },
          type: 'pie',
          width: '128px',
          height: '64px',
          radius: ['30%', '70%'],
          center: ['25%', '50%'],
          startAngle: 180,
          endAngle: 360,
          data: [
            { value: this.bornLossPercent(), name: 'lossPercent', itemStyle: { color: '#007C8F' } },
            { value: this.remainingBornLossPercent(), name: 'remaining', itemStyle: { color: '#FFD3E6' } },
          ],
        },
      ],
    };
  });
  protected readonly averageInformationCardOptions = computed(() => {
    return [
      {
        subtitle: `(${formatPercent(this.mummifiedPercent(), this.languageService.getActiveLang(), '2.2-2')})`,
        value: this.mummifiedAverage().toFixed(2),
        suffix: this.languageService.translate('farming-suite.animal-sheet.components.results-by-litter.mummified.suffix'),
      },
      {
        subtitle: `(${this.languageService.translate('farming-suite.animal-sheet.components.results-by-litter.born-alive.subtitle', { value: formatPercent(this.bornAlivePercent(), this.languageService.getActiveLang(), '2.2-2') })})`,
        value: this.bornAliveAverage().toFixed(2),
        suffix: this.languageService.translate('farming-suite.animal-sheet.components.results-by-litter.born-alive.suffix'),
      },
      {
        subtitle: `(${formatPercent(this.stillbornPercent(), this.languageService.getActiveLang(), '2.2-2')})`,
        value: this.stillbornAverage().toFixed(2),
        suffix: this.languageService.translate('farming-suite.animal-sheet.components.results-by-litter.stillborn.suffix'),
      },
    ];
  });
}
