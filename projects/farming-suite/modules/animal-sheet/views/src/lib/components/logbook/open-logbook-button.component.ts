import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidePanelService, ViewportService } from '@cooperl/design-system';
import { TestIdDirective } from '@cooperl/design-system/directive/test-id';
import { GetNotificationsCountUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { TranslocoDirective } from '@jsverse/transloco';
import { NotificationsSideContentComponent } from './notification-side-content/notifications-side-content.component';
import { NotificationsCountComponent } from './notifications-count/notifications-count.component';

@Component({
  selector: 'farming-suite-animal-sheet-open-logbook-button',
  imports: [
    // Angular
    // External
    MatFabButton,
    MatIcon,
    MatBadge,
    MatBottomSheetModule,
    TranslocoDirective,
    // Internal
    NotificationsCountComponent,
  ],
  templateUrl: './open-logbook-button.component.html',
  styleUrl: './open-logbook-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.handset]': 'isHandsetViewport()',
  },
  hostDirectives: [
    {
      directive: TestIdDirective,
      inputs: ['designSystemTestId: testId'],
    },
  ],
})
export class OpenLogbookButtonComponent implements OnInit, OnDestroy {
  protected readonly notificationsCountResource = inject(GetNotificationsCountUseCase).execute();
  protected readonly notificationsCount = computed(() => this.notificationsCountResource.value() ?? 0);
  protected readonly isHandsetViewport = inject(ViewportService).isHandsetViewport;

  private readonly _sidePanelService = inject(SidePanelService);
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _getNotificationsCountUseCase = inject(GetNotificationsCountUseCase);

  public ngOnInit(): void {
    this._getNotificationsCountUseCase.poll();
  }

  public ngOnDestroy(): void {
    this._getNotificationsCountUseCase.stopPolling();
  }

  @HostListener('click')
  protected openNotifications(): void {
    if (this.isHandsetViewport()) {
      this._bottomSheet.open(NotificationsSideContentComponent);
    } else {
      this._sidePanelService.open(NotificationsSideContentComponent);
    }
  }
}
