import { ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { combineLatest, filter, tap } from 'rxjs';
import { TableFiltersService } from '../table-filters.service';

const FilterActive = 'filter_alt_off';
const FilterInactive = 'filter_alt';

@Component({
  selector: 'design-system-table-header-filter-wrapper',
  imports: [
    // Angular
    // External
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatIcon,
    // Internal
  ],
  hostDirectives: [
    {
      directive: TestIdDirective,
      inputs: ['designSystemTestId: testId'],
    },
  ],
  templateUrl: './table-header-filter-wrapper.component.html',
  styleUrl: './table-header-filter-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderFilterWrapperComponent implements OnInit {
  public readonly filterId = input.required<string>();

  public readonly opened = output<void>();
  public readonly closed = output<void>();

  protected readonly filterIcon = signal(FilterInactive);

  private readonly _tableFilterService = inject(TableFiltersService, {
    skipSelf: true,
  });

  public constructor() {
    combineLatest([toObservable(this.filterId), this._tableFilterService.filterListChanged$])
      .pipe(
        filter(([filterId]) => filterId !== undefined),
        tap(([filterId, event]) => {
          this.filterIcon.update((icon) => {
            if (event.addedFilters?.includes(filterId)) {
              return FilterActive;
            }

            if (event.removedFilters?.includes(filterId)) {
              return FilterInactive;
            }

            return icon;
          });
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.filterIcon.update(() => (this._tableFilterService.getRegisteredFiltersIds().includes(this.filterId()) ? FilterActive : FilterInactive));
  }
}
