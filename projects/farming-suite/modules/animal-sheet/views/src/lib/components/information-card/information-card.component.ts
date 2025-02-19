import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'farming-suite-animal-sheet-information-card',
  imports: [
    //Internal
    //External
    MatCard,
    MatCardHeader,
    MatCardContent,
    //Angular
  ],
  templateUrl: './information-card.component.html',
  styleUrl: './information-card.component.scss',
})
export class InformationCardComponent {
  public readonly subtitle = input.required<string>();
  public readonly value = input.required<string | number>();
  public readonly suffix = input<string>();
}
