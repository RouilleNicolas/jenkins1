import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetGeneralPageDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';

@Component({
  selector: 'farming-suite-animal-sheet-views-general-page',
  imports: [
    // Angular
    // External
    // Internal
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralPageComponent {
  protected readonly generalPageResource = inject(GetGeneralPageDataUseCase).execute();
}
