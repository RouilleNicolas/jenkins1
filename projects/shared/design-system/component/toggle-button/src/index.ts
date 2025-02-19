import { ToggleButtonItemComponent } from './item/toggle-button-item.component';
import { ToggleButtonComponent } from './toggle-button.component';

export * from './item/toggle-button-item.component';
export * from './toggle-button.component';

export const ToggleButtonModule = [ToggleButtonComponent, ToggleButtonItemComponent] as const;
