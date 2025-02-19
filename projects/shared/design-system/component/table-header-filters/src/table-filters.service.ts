import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Logger } from "@cooperl/logger";
import { Subject } from "rxjs";
import { FilterFn } from "./filter.function";
import { RegisteredFilter } from "./registered-filter.interface";

interface FilterListChangedEvent {
  addedFilters?: string[];
  removedFilters?: string[];
  filterList: string[];
}

@Injectable()
export class TableFiltersService<T = unknown> {

  private readonly _filterListChanged = new Subject<FilterListChangedEvent>();
  public readonly filterListChanged$ = this._filterListChanged.asObservable();

  private readonly _logger = new Logger("TableFiltersService");
  private readonly _initialData: T[] = [];
  private readonly _filteredData: T[] = [];
  private readonly _dataSourceFilters = new Map<string, FilterFn<T>>();
  private _dataSource = new MatTableDataSource<T>([]);
  private _isInitialized = false;

  /**
   * Register a data source to be filtered.
   * @param dataSource The data source to be filtered.
   * @returns The instance of the service.
   */
  public registerDataSource(dataSource: MatTableDataSource<T>): this {
    // Clear the data sources
    this._initialData.length = 0;
    this._filteredData.length = 0;

    // Set the data sources
    this._dataSource = dataSource;
    this._initialData.push(...dataSource.data);
    this._filteredData.push(...dataSource.data);

    this._isInitialized = true;

    return this;
  }

  /**
   * Returns the registered filters ids.
   */
  public getRegisteredFiltersIds(): string[]  {
    return Array.from(this._dataSourceFilters.keys());
  }

  /**
   * Register a list of filters function to be applied on the data source when executeFilters is called.
   */
  public registerFilters(...registeredFilters: RegisteredFilter<T>[]): void {
    for (const { key, filterFn } of registeredFilters) {
      this._dataSourceFilters.set(key, filterFn as FilterFn<unknown>);
    }

    this._filterListChanged.next({
      addedFilters: registeredFilters.map((filter) => filter.key),
      filterList: Array.from(this._dataSourceFilters.keys()),
    });
  }

  /**
   * Unregister a list of filters function
   * @param filterKeys The keys of the filters to be unregistered.
   */
  public unregisterFilters(...filterKeys: string[]): void {
    for (const key of filterKeys) {
      this._dataSourceFilters.delete(key);
    }

    this._filterListChanged.next({
      removedFilters: filterKeys,
      filterList: Array.from(this._dataSourceFilters.keys()),
    });
  }


  /**
   * Execute all registered filters on the registered dataSource.
   */
  public executeFilters(): void {
    if (!this._isInitialized) {
      this._logger.warn("Service not initialized. Call init() before executing filters. Nothing has been done.");
      return;
    }

    let dataClone = [...this._initialData];

    for (const filterKeyValue of this._dataSourceFilters) {
      const value = filterKeyValue[1];

      if (value) {
        dataClone = dataClone.filter(value);
      }
    }

    this._dataSource.data = dataClone;
  }

  /**
   * Register and execute a list of filters function on the dataSource.
   * @param filterKeys The keys of the filters to be unregistered.
   */
  public registerAndExecuteFilters(...registeredFilters: RegisteredFilter<T>[]): void {
    this.registerFilters(...registeredFilters);
    this.executeFilters();
  }

  /**
   * Unregister and execute a list of filters function on the dataSource.
   * @param filterKeys The keys of the filters to be unregistered.
   */
  public unregisterAndExecuteFilters(...filterKeys: string[]): void {
    this.unregisterFilters(...filterKeys);
    this.executeFilters();
  }
}
