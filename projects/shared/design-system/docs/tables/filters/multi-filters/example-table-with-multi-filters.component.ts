import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CheckboxGroupDatum, CheckboxSelectionChange } from '@cooperl/design-system/component/checkbox-group';
import {
  FilterFn,
  FilterFnInput,
  TableFiltersService,
  TableHeaderFilterCheckboxGroupComponent,
  TableHeaderFilterTextComponent,
} from '@cooperl/design-system/component/table-header-filters';
import { uniq } from '@cooperl/utils/uniq';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { generateData } from '../../data.generator';
import { Datum } from '../../datum.interface';

type MoveableColumn = keyof Datum;
type DisplayableColumn = MoveableColumn | 'actions';

const data = generateData(100);

@Component({
  selector: 'design-system-example-table-filter-with-multi-filters',
  imports: [
    // Angular
    DatePipe,
    ReactiveFormsModule,
    // External
    MatTableModule,
    MatIcon,
    MatMiniFabButton,
    MatPaginator,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    // Internal
    TableHeaderFilterCheckboxGroupComponent,
    TableHeaderFilterTextComponent,
  ],
  providers: [TableFiltersService],
  templateUrl: './example-table-with-multi-filters.component.html',
  styleUrl: './example-table-with-multi-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleTableWithMultiFiltersComponent implements AfterViewInit {
  protected readonly dataSource = new MatTableDataSource<Datum>(data);
  protected readonly displayedColumns: DisplayableColumn[] = ['id', 'age', 'name', 'birthDate', 'species', 'actions'];
  protected readonly filters = {
    age: 'age',
    name: 'name',
    species: 'species',
  };
  protected readonly filterNameControl = inject(FormBuilder).control<string>('');

  // Example of usage of the TableHeaderFilterCheckboxGroupComponent with immediate filter execution
  protected readonly uniqAges = uniq(data, ({ age }) => age)
    .sort((a, b) => a - b)
    .map<CheckboxGroupDatum<number>>((age) => ({
      id: age.toString(),
      label: age.toString(),
      value: age,
      selected: true,
    }));
  protected readonly filterByAgeFn: FilterFnInput<CheckboxSelectionChange<number>[], Datum> = (selection) => (datum) =>
    !!selection.find(({ value }) => datum.age === value);

  protected readonly uniqSpecies = uniq(data, ({ species }) => species)
    .sort()
    .map<CheckboxGroupDatum<string>>((species) => ({
      id: species,
      label: species,
      value: species,
      selected: true,
    }));

  protected readonly filterByNameFn: FilterFnInput<string, Datum> = (searchTerm) => (datum) =>
    datum.name.toLowerCase().includes(searchTerm.toLowerCase());

  private readonly _paginator = viewChild(MatPaginator);
  private readonly _tableFiltersService = inject(TableFiltersService<Datum>).registerDataSource(this.dataSource);

  constructor() {
    this.filterNameControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => this.filterByName(this.filterNameControl.value)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected filterByName(name: string | null) {
    if (!name) {
      this._tableFiltersService.unregisterAndExecuteFilters(this.filters.name);
    } else {
      const filterByName: FilterFn<Datum> = (datum) => datum.name.toLowerCase().includes(name.toLowerCase());
      this._tableFiltersService.registerAndExecuteFilters({
        key: this.filters.name,
        filterFn: filterByName,
      });
    }
  }

  // Example of usage of the TableHeaderFilterCheckboxGroupComponent with manual filter execution
  protected filterBySpecies(selectedSpecies: CheckboxSelectionChange<string>[]) {
    const filterBySpecies: FilterFn<Datum> = (datum) => !!selectedSpecies.find(({ value }) => datum.species === value);
    this._tableFiltersService.registerAndExecuteFilters({
      key: this.filters.species,
      filterFn: filterBySpecies,
    });
  }

  protected clearNameFilter() {
    this.filterNameControl.setValue(null);
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this._paginator() ?? null;
  }
}
