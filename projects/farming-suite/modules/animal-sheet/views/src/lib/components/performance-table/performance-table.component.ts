import { Component, effect, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslocoDirective } from '@jsverse/transloco';
import { CalculateAveragePipe } from './calculate-average.pipe';
import { RankTableElement } from './performance-table.interface';

@Component({
  selector: 'farming-suite-animal-sheet-performance-table',
  imports: [
    //Internal
    CalculateAveragePipe,
    //External
    MatButtonModule,
    MatIcon,
    MatTableModule,
    TranslocoDirective,
    //Angular
  ],
  templateUrl: './performance-table.component.html',
  styleUrl: './performance-table.component.scss',
})
export class PerformanceTableComponent {
  public readonly rankElements = input.required<RankTableElement[]>();

  protected readonly dataSource = new MatTableDataSource<RankTableElement>();
  protected readonly displayedColumns = [
    'career',
    'mating-number',
    'doses-number',
    'iss1',
    'issf',
    'gestation-duration',
    'nt',
    'nv',
    'mn',
    'mo',
    'eld-input',
    'eld-output',
    'adopted',
    'removed',
    'observation',
  ];
  protected readonly averageDisplayedColumns = [
    'average',
    'average-mating-number',
    'average-doses-number',
    'average-iss1',
    'average-issf',
    'average-gestation-duration',
    'average-nt',
    'average-nv',
    'average-mn',
    'average-mo',
    'average-eld-input',
    'average-eld-output',
    'average-adopted',
    'average-removed',
    'average-observation',
  ];

  constructor() {
    effect(() => (this.dataSource.data = this.rankElements()));
  }
}
