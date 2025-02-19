import { Component, input } from '@angular/core';

@Component({
  selector: 'farming-suite-animal-sheet-notifications-count',
  imports: [
    // Angular
    // External
    // Internal
  ],
  template: `{{ count() }}`,
  styleUrl: './notifications-count.component.scss',
})
export class NotificationsCountComponent {
  public readonly count = input.required<number>();
}
