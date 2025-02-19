import { A11yModule } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { TranslocoDirective } from '@jsverse/transloco';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { FilterExecutorDirective } from '../filter-executor.directive';
import { TableHeaderFilterWrapperComponent } from '../wrapper';

const defaultLabel = 'default.filters.text.label';
const defaultPlaceholder = 'default.filters.text.placeholder';

@Component({
  selector: 'design-system-table-header-filter-text',
  imports: [
    // Angular
    ReactiveFormsModule,
    // External
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    A11yModule,
    TranslocoDirective,
    // Internal
    TableHeaderFilterWrapperComponent,
    TestIdDirective,
  ],
  hostDirectives: [
    {
      directive: FilterExecutorDirective,
      inputs: ['filterId', 'filterExecutionMode', 'filterFn'],
    },
  ],
  templateUrl: './table-header-filter-text.component.html',
  styleUrl: './table-header-filter-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderFilterTextComponent<TDataSourceDatum> {
  public readonly label = input<string, string>(defaultLabel, {
    transform: (value) => value || defaultLabel,
  });
  public readonly placeholder = input<string, string>(defaultPlaceholder, {
    transform: (value) => value || defaultPlaceholder,
  });

  public readonly filterChange = output<string>();

  protected readonly filterControl = inject(FormBuilder).control<string | null>(null);
  protected readonly filterExecutor: FilterExecutorDirective<string, TDataSourceDatum> = inject(FilterExecutorDirective);
  protected wrapperOpen = false;

  public constructor() {
    this.filterControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap((searchString) => this._applyFilter(searchString ?? '')),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private _applyFilter(searchString: string): void {
    this.filterChange.emit(searchString);

    this.filterExecutor.applyFilter(searchString);
  }
}
