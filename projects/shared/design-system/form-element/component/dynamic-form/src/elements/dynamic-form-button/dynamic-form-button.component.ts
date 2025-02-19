import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoDirective } from '@jsverse/transloco';
import { defaultTooltipPosition, defaultTooltipTouchGesture } from '../../interfaces/elements/tooltip/tooltip.interface';
import { defaultButtonColor, FormItemButton } from './form-item-button.interface';

/**
 * Component for rendering a button form item.
 */
@Component({
  selector: 'design-system-dynamic-form-button',
  imports: [
    // Angular
    // External
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslocoDirective,
    // Internal
  ],
  templateUrl: './dynamic-form-button.component.html',
  styleUrl: './dynamic-form-button.component.scss',
})
export class DynamicFormButtonComponent {
  public readonly element = input.required<FormItemButton>();

  protected readonly color = computed(() => this.element().color ?? defaultButtonColor);
  protected readonly tooltipPosition = computed(() => this.element().tooltip?.position ?? defaultTooltipPosition);
  protected readonly tooltipTouchGesture = computed(() => this.element().tooltip?.touchGesture ?? defaultTooltipTouchGesture);
}
