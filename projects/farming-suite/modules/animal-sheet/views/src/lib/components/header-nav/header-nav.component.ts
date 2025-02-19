import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewportService } from '@cooperl/design-system';
import { ToggleButtonModule } from '@cooperl/design-system/component/toggle-button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CareerRoute } from '../../pages/career';
import { CommentsRoute } from '../../pages/comments';
import { GeneralRoute } from '../../pages/general';
import { InternalMovementRoute } from '../../pages/internal-movement';
import { MeasuresRoute } from '../../pages/measures';
import { TreatmentsRoute } from '../../pages/treatments';

@Component({
  selector: 'farming-suite-animal-sheet-header-nav',
  imports: [
    // Angular
    RouterLink,
    RouterLinkActive,
    // External
    TranslocoDirective,
    // Internal
    ToggleButtonModule,
  ],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.handset]': 'isHandset()',
  },
})
export class HeaderNavComponent {
  protected readonly navTabs = [GeneralRoute, CareerRoute, MeasuresRoute, InternalMovementRoute, CommentsRoute, TreatmentsRoute];
  protected readonly isHandset = inject(ViewportService).isHandsetViewport;
}
