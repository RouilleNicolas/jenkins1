import { Pipe, PipeTransform } from '@angular/core';
import { RankTableElement } from './performance-table.interface';
@Pipe({
  name: 'calculateAverage',
  pure: false,
  standalone: true,
})
export class CalculateAveragePipe implements PipeTransform {
  transform(rankTableElements: RankTableElement[], column: keyof Omit<RankTableElement, 'observation'>): number {
    return rankTableElements.reduce((sum, currentValue) => sum + currentValue[column], 0) / rankTableElements.length;
  }
}
