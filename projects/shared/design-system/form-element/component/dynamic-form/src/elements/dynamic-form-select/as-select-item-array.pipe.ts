import { Pipe, PipeTransform } from "@angular/core";
import { MaybeArray } from "date-fns";
import { SelectItem } from "./options-select.interface";

@Pipe({
  name: "asSelectItemArray",
  standalone: true,
})
export class AsSelectItemArrayPipe implements PipeTransform {
  public transform(value: MaybeArray<SelectItem> | null): SelectItem[] {
    return value as SelectItem[];
  }
}
