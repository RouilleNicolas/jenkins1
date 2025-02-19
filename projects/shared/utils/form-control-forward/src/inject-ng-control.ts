import { inject } from '@angular/core';
import { FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';

/** @see https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55 */
export function injectNgControl(): FormControlDirective | FormControlName | NgModel | undefined {
  const ngControl: NgControl | null = inject(NgControl, { self: true, optional: true });

  if (!ngControl) {
    return undefined;
  }

  if (
    ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
  ) {
    return ngControl;
  }

  throw new Error('NgControl doit être de type FormControlDirective, FormControlName ou NgModel');
}
