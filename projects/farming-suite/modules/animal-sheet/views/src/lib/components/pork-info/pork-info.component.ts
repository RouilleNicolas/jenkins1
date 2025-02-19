import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ViewportService } from '@cooperl/design-system';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoDatePipe } from '@jsverse/transloco-locale';

@Component({
  selector: 'farming-suite-animal-sheet-pork-info',
  imports: [
    // Angular
    // External
    TranslocoDirective,
    TranslocoDatePipe,
    MatIcon,
    // Internal
  ],
  templateUrl: './pork-info.component.html',
  styleUrl: './pork-info.component.scss',
  host: {
    '[class.with-route]': 'route()',
    '[class.handset]': 'isHandset()',
  },
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: ['routerLink: route'],
    },
  ],
})
export class PorkInfoComponent {
  public readonly title = input.required<string>();
  public readonly content = input.required<string | number>();
  public readonly date = input<Date>();

  /** Declared here to be able to set host.class.with-route with ease :) */
  public readonly route = input<RouterLink['routerLink']>();

  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
