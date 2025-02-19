import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'farming-suite-animal-sheet-change-order-button',
  imports: [
    // Angular
    // External
    MatButton,
    MatIcon,
    TranslocoDirective,
    // Internal
    TestIdDirective,
  ],
  template: `
    <button mat-stroked-button *transloco="let t" designSystemTestId="change-order">
      <mat-icon>grid_view</mat-icon>
      {{ t('common.change-order') }}
    </button>
  `,
  styleUrl: './change-order-button.component.scss',
})
export class ChangeOrderButtonComponent {}
