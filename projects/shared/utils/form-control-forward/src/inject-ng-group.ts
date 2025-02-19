import { inject } from '@angular/core';
import { FormGroupDirective, FormGroupName, NgModelGroup } from '@angular/forms';

/** @see https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55 */
export function injectNgGroup(): FormGroupDirective | FormGroupName | NgModelGroup | undefined {
  const ngGroup: NgModelGroup | null = inject(NgModelGroup, { self: true, optional: true });

  if (!ngGroup) {
    return undefined;
  }

  if (
    ngGroup instanceof FormGroupDirective ||
    ngGroup instanceof FormGroupName ||
    ngGroup instanceof NgModelGroup
  ) {
    return ngGroup;
  }

  throw new Error('NgGroup doit être de type FormGroupDirective, FormGroupName ou NgModelGroup');
}
