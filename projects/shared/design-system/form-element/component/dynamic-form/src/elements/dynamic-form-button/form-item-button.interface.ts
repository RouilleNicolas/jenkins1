import { ThemePalette } from "@angular/material/core";
import { WithEvents } from "../../interfaces/elements/events/with-events.interface";
import { FormItem } from "../../interfaces/elements/form-item.interface";
import { WithTooltip } from "../../interfaces/elements/tooltip/with-tooltip.interface";

export type ButtonStyle = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab' | 'fab-extended';
export type ButtonColor = Exclude<ThemePalette, undefined>;

export interface FormItemButton
  extends FormItem<'button'>,
  WithTooltip,
  WithEvents {
  label?: string;
  /**
   * The Design System style applied.
   *
   * Warning : This is not a css class nor a style object.
   */
  style?: ButtonStyle;
  /**
   * The color palette of the button.
   *
   * @default 'primary'
   */
  color?: ButtonColor;
  icon?: string;
  hidden?: boolean;
  disabled?: boolean;
}

export const defaultButtonColor: FormItemButton['color'] = 'primary';
