import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TableVirtualScrollDataSource, TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { generateData } from '../data.generator';
import { Datum } from '../datum.interface';

type DisplayableColumn = keyof Datum | 'actions';

@Component({
  selector: 'design-system-example-table-virtual-scroll',
  imports: [
    // Angular
    DatePipe,
    // External
    MatTableModule,
    MatIcon,
    MatMiniFabButton,
    ScrollingModule,
    TableVirtualScrollModule,
  ],
  templateUrl: './example-table-virtual-scroll.component.html',
  styleUrl: './example-table-virtual-scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleTableVirtualScrollComponent {
  protected readonly dataSource = new TableVirtualScrollDataSource<Datum>(generateData(100_000));
  protected displayedColumns: DisplayableColumn[] = ['id', 'age', 'birthDate', 'species', 'actions'];
}
