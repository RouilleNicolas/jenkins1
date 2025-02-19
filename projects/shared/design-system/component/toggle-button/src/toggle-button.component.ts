import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ViewportService } from '@cooperl/design-system';

@Component({
  selector: 'design-system-toggle-button',
  imports: [
    // Angular
    // External
    // Internal
  ],
  template: `<ng-content />`,
  styleUrl: './toggle-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class ToggleButtonComponent {
  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
