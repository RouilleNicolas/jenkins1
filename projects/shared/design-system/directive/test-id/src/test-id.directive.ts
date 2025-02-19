import { Directive, input } from '@angular/core';

@Directive({
  selector: '[designSystemTestId]',
  standalone: true,
  host: {
    '[attr.data-cy]': 'designSystemTestId()',
    '[attr.robot-anchor]': 'designSystemTestId()',
    '[attr.data-testid]': 'designSystemTestId()',
  },
})
export class TestIdDirective {
  public readonly designSystemTestId = input.required<string>();
}
