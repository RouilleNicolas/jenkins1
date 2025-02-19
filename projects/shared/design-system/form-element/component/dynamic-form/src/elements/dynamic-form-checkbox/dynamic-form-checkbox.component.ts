import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopValueAccessorDirective } from '@cooperl/utils/form-control-forward';
import { TranslocoDirective } from '@jsverse/transloco';
import { defaultTooltipPosition, defaultTooltipTouchGesture } from '../../interfaces/elements/tooltip/tooltip.interface';
import { DynamicFormControlComponent } from '../abstracts/dynamic-form-control.abstract';
import { DynamicFormErrorsComponent } from '../dynamic-form-errors/dynamic-form-errors.component';
import { defaultCheckboxLabelPosition, FormItemCheckbox } from './form-item-checkbox.interface';

@Component({
  selector: 'design-system-dynamic-form-checkbox',
  imports: [
    // Angular
    ReactiveFormsModule,
    // External
    MatCheckboxModule,
    MatTooltipModule,
    TranslocoDirective,
    // Internal
    DynamicFormErrorsComponent,
  ],
  hostDirectives: [NoopValueAccessorDirective],
  templateUrl: './dynamic-form-checkbox.component.html',
  styleUrl: './dynamic-form-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormCheckboxComponent extends DynamicFormControlComponent<FormItemCheckbox, boolean> {
  protected override readonly requiredValidator = Validators.requiredTrue;

  protected readonly labelPosition = computed(() => this.element().labelPosition ?? defaultCheckboxLabelPosition);
  protected readonly tooltipPosition = computed(() => this.element().tooltip?.position ?? defaultTooltipPosition);
  protected readonly tooltipTouchGesture = computed(() => this.element().tooltip?.touchGesture ?? defaultTooltipTouchGesture);
}
