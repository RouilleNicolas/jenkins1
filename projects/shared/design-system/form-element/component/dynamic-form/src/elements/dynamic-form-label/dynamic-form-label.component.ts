import { Component, input } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormItemLabel } from './form-item-label.interface';

@Component({
  selector: 'design-system-dynamic-form-label',
  imports: [
    // Angular
    // External
    MatLabel,
    TranslocoDirective,
    // Internal
  ],
  templateUrl: './dynamic-form-label.component.html',
  styleUrl: './dynamic-form-label.component.scss',
})
export class DynamicFormLabelComponent {
  public readonly element = input.required<FormItemLabel>();
}
