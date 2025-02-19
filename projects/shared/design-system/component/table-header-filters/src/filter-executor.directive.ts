import { Directive, inject, input } from "@angular/core";
import { FilterExecutionMode } from "./filter-execution-mode.type";
import { FilterFnInput } from "./filter.function";
import { RegisteredFilter } from "./registered-filter.interface";
import { TableFiltersService } from "./table-filters.service";

@Directive({
  selector: '[designSystemFilterExecutor]',
  standalone: true,
})
export class FilterExecutorDirective<TSelection, TDataSourceDatum> {

  public readonly filterId = input.required<string>();
  public readonly filterExecutionMode = input.required<FilterExecutionMode>();
  public readonly filterFn = input<FilterFnInput<TSelection, TDataSourceDatum>>();

  private readonly _tableFiltersService = inject(TableFiltersService);

  public applyFilter(selection: TSelection): void {
    if (this.filterExecutionMode() !== 'manual') {
      const filterFn = this.filterFn();

      if (!filterFn) {
        throw new Error('filterFn input must be provided when filterExecutionMode is not manual');
      }

      const registeredFilter: RegisteredFilter<TDataSourceDatum> = { key: this.filterId(), filterFn: filterFn(selection) };

      switch (this.filterExecutionMode()) {
        case 'immediate':
          this._tableFiltersService.registerAndExecuteFilters(registeredFilter);
          break;
        case 'deferred':
          this._tableFiltersService.registerFilters(registeredFilter);
          break;
      }
    }
  }

}
