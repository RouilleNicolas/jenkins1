import { CheckboxGroupDatum } from "./checkbox-group-datum.interface";

export type CheckboxGroupData<T> = string[] | CheckboxGroupDatum<T>[];
