import { Options } from "./elements/options/options.interface";
import { SelectableItem } from "./elements/selectable-item.interface";

export type FetchActionResponse<T extends SelectableItem = SelectableItem> = Required<Options<T>>['items'];
