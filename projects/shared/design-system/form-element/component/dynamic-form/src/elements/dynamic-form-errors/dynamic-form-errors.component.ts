import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatError, matFormFieldAnimations } from '@angular/material/form-field';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoDatePipe } from '@jsverse/transloco-locale';

/**
 * A component that displays validation errors for a form control.
 */
@Component({
  selector: 'design-system-dynamic-form-errors',
  imports: [
    // Angular
    KeyValuePipe,
    NgTemplateOutlet,
    // External
    MatError,
    TranslocoDirective,
    TranslocoDatePipe,
    // Internal
  ],
  host: {
    '[class.simulate-form-field]': 'simulateMatFormField()',
  },
  animations: [matFormFieldAnimations.transitionMessages],
  templateUrl: './dynamic-form-errors.component.html',
  styleUrl: './dynamic-form-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormErrorsComponent implements AfterViewInit {
  public readonly errors = input.required<ValidationErrors | null>();
  public readonly customRequiredMessage = input<string>('');
  public readonly customValidationMessage = input<string>('');

  /** Encapsulate the content with a simulated mat-mdc-form-field */
  public readonly simulateMatFormField = input(false, {
    transform: booleanAttribute,
  });
  /**
   * Add a condition to display the errors.
   *
   * This is only used when `simulateMatFormField` is set to `true`.
   */
  public readonly displayCondition = input<boolean | undefined>();

  /** State of the mat-hint and mat-error animations. */
  protected subscriptAnimationState: '' | 'enter' = '';
  protected keepOriginalOrder = () => 0;

  public ngAfterViewInit(): void {
    // Enable animations now. This ensures we don't animate on initial render.
    this.subscriptAnimationState = 'enter';
  }
}
