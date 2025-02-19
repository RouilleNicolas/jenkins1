import { Component, input } from '@angular/core';
import { Information } from './information.interface';

@Component({
  selector: 'farming-suite-animal-sheet-information',
  standalone: true,
  template: `
    <span class="information-title">{{ title() }}</span>
    <span class="information-content">{{ content() }}</span>
  `,
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  public readonly title = input.required<Information['title']>();
  public readonly content = input.required<Information['content']>();
}
