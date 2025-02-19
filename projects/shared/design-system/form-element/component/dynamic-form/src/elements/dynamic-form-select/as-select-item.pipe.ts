import { Pipe, PipeTransform } from "@angular/core";
import { SelectItem } from "./options-select.interface";

@Pipe({
  name: 'asSelectItem',
  pure: true,
  standalone: true,
})
export class AsSelectItemPipe implements PipeTransform {
  public transform(value: unknown): SelectItem {
    return value as SelectItem;
  }
}
