import { CheckboxGroupDatum } from "../checkbox-group-datum.interface";

/** Given a list of ids, return a function that filters array of CheckboxGroupDatum by id */
export const byId = <T>(ids: string[]) => (datum: CheckboxGroupDatum<T>) => ids.includes(datum.id);
