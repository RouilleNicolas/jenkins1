import { ResourceRef, signal } from '@angular/core';
import { GetNotificationsCountUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { noop } from 'rxjs';

export const FakeGetNotificationsCountUseCaseWithNoNotifications: Partial<GetNotificationsCountUseCase> = {
  execute: () => ({ value: signal(0) }) as ResourceRef<number>,
  poll: noop,
  stopPolling: noop,
};
