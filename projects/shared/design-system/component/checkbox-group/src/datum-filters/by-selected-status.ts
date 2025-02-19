import { CheckboxGroupDatum } from "../checkbox-group-datum.interface";

/** Given a selected status, return a function that filters array of CheckboxGroupDatum by selected status */
export const bySelectedStatus = <T>(selected: boolean) => (datum: CheckboxGroupDatum<T>) => datum.selected === selected;
