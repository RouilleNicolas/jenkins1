import { FilterFn } from "./filter.function";

export interface RegisteredFilter<T> {
    key: string;
    filterFn: FilterFn<T>;
}