import { CheckboxSelectionChange } from "@cooperl/design-system/component/checkbox-group";
import { FilterFn } from "../filter.function";

/**
 * A function that takes a selection of checkbox values and returns a filter function.
 *
 * The returned filter function is expected to be used to filter a data source.
 */
export type TableHeaderFilterCheckboxFilterFn<TCheckboxValue, TDataSourceDatum> = (selection: CheckboxSelectionChange<TCheckboxValue>[]) => FilterFn<TDataSourceDatum>;
