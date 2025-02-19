import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Component, inject, input } from '@angular/core';
import { ViewportService } from '@cooperl/design-system';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';

@Component({
  selector: 'design-system-toggle-button-item',
  imports: [
    // Angular
    // External
    // Internal
  ],
  template: `<ng-content />`,
  styleUrl: './toggle-button-item.component.scss',
  host: {
    '[class.selected]': 'selected()',
    '[class.handset]': 'isHandset()',
  },
  hostDirectives: [
    {
      directive: TestIdDirective,
      inputs: ['designSystemTestId: testId'],
    },
  ],
})
export class ToggleButtonItemComponent {
  public readonly selected = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
