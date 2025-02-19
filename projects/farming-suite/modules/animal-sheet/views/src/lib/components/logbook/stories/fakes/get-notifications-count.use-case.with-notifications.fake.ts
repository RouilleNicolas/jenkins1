import { ResourceRef, signal } from '@angular/core';
import { GetNotificationsCountUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { noop } from 'rxjs';
import { fakeNotifications } from './notifications.fake';

export const FakeGetNotificationsCountUseCaseWithNotifications: Partial<GetNotificationsCountUseCase> = {
  execute: () => ({ value: signal(fakeNotifications.length) }) as ResourceRef<number>,
  poll: noop,
  stopPolling: noop,
};
