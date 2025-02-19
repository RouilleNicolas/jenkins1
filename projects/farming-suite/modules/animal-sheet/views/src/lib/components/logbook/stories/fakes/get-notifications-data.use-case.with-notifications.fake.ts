import { ResourceRef, signal } from '@angular/core';
import { AnimalNotification, GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { fakeNotifications } from './notifications.fake';

export const FakeGetNotificationsDataUseCase: Partial<GetNotificationsDataUseCase> = {
  execute: () => ({ value: signal(fakeNotifications) }) as ResourceRef<AnimalNotification[]>,
};
