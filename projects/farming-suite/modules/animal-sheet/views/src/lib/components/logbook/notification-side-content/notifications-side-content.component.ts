import { Component, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { TranslocoDirective } from '@jsverse/transloco';
import { NotificationsCountComponent } from '../notifications-count/notifications-count.component';

@Component({
  selector: 'farming-suite-animal-sheet-notifications-side-content',
  imports: [
    // Angular
    // External
    TranslocoDirective,
    MatIcon,
    // Internal
    NotificationsCountComponent,
  ],
  templateUrl: './notifications-side-content.component.html',
  styleUrl: './notifications-side-content.component.scss',
})
export class NotificationsSideContentComponent {
  protected readonly notificationsResource = inject(GetNotificationsDataUseCase).execute();
  protected readonly notificationsCount = computed(() => this.notificationsResource.value()?.length ?? 0);
}
