import { Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

/** @see https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55 */
@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NoopValueAccessorDirective,
    },
  ],
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
  public writeValue = noop;

  public registerOnChange = noop;

  public registerOnTouched = noop;
}
