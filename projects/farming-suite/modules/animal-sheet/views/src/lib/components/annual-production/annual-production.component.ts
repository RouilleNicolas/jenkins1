import { Component, inject, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ViewportService } from '@cooperl/design-system';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'farming-suite-animal-sheet-annual-production',
  imports: [
    //Internal
    //External
    TranslocoDirective,
    //Angular
    MatCard,
    MatCardHeader,
    MatCardContent,
  ],
  templateUrl: './annual-production.component.html',
  styleUrl: './annual-production.component.scss',
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class AnnualProductionComponent {
  public readonly value = input.required<number>();
  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
