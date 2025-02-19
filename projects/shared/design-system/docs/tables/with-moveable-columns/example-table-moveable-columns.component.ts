import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { generateData } from '../data.generator';
import { Datum } from '../datum.interface';

type MoveableColumn = keyof Datum;
type DisplayableColumn = MoveableColumn | 'actions';

@Component({
  selector: 'design-system-example-table-moveable-columns',
  imports: [
    // Angular
    DatePipe,
    // External
    MatTableModule,
    MatIcon,
    MatMiniFabButton,
    DragDropModule,
  ],
  templateUrl: './example-table-moveable-columns.component.html',
  styleUrl: './example-table-moveable-columns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleTableMoveableColumnsComponent {
  protected readonly dataSource = new MatTableDataSource<Datum>(generateData(10));
  protected readonly displayedColumns: DisplayableColumn[] = ['id', 'age', 'birthDate', 'species', 'actions'];

  protected reorderColumns(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex + 1, event.currentIndex + 1);
  }
}
