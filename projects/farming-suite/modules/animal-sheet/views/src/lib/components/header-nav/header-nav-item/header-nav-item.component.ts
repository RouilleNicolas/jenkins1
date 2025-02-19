import { Component, inject, input } from '@angular/core';
import { ViewportService } from '@cooperl/design-system';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';

@Component({
  selector: 'farming-suite-animal-sheet-header-nav-item',
  imports: [
    // Angular
    // External
    // Internal
  ],
  template: `<ng-content />`,
  styleUrl: './header-nav-item.component.scss',
  host: {
    '[class.active]': 'active()',
    '[class.handset]': 'isHandset()',
  },
  hostDirectives: [
    {
      directive: TestIdDirective,
      inputs: ['designSystemTestId: testId'],
    },
  ],
})
export class HeaderNavItemComponent {
  public readonly active = input<boolean>();

  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
