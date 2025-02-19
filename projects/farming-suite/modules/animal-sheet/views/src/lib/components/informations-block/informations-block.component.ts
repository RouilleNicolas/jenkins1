import { Component, inject, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ViewportService } from '@cooperl/design-system';

@Component({
  selector: 'farming-suite-animal-sheet-informations-block',
  imports: [
    // Angular
    // External
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    //Internal
  ],
  templateUrl: './informations-block.component.html',
  styleUrl: './informations-block.component.scss',
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class InformationsBlockComponent {
  public readonly title = input.required<string>();
  public readonly suffix = input<string>();
  public readonly value = input.required<number>();
  public readonly isPercentValue = input<boolean>(false);

  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
