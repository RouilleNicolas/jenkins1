import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectedAnimalStore } from '@cooperl/farming-suite/animal-sheet/domain';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'farming-suite-animal-sheet-views-main-layout',
  imports: [
    // Angular
    RouterOutlet,
    // External
    // Internal
    HeaderComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--header-height]': 'headerHeight + "px"',
  },
})
export class MainLayoutComponent {
  public readonly id = input.required<string>();

  protected headerHeight = 0;

  constructor() {
    const selectedAnimalId = inject(SelectedAnimalStore).animalId;
    effect(() => selectedAnimalId.set(this.id()));
  }
}
