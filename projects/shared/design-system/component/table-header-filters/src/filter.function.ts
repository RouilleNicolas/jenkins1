export type FilterFn<T = unknown> = (value: T, index: number, array: T[]) => boolean;
export type FilterFnInput<TSelection, TDataSourceDatum> = (selection: TSelection) => FilterFn<TDataSourceDatum>
