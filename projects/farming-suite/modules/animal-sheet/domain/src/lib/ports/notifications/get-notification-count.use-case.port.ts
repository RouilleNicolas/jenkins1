import { InjectionToken } from '@angular/core';
import { UseCaseResource } from '@cooperl/utils';

export interface GetNotificationsCountUseCase extends UseCaseResource<number> {
  poll(): void;
  stopPolling(): void;
}

export const GetNotificationsCountUseCase = new InjectionToken<GetNotificationsCountUseCase>('GetNotificationsCountUseCase implementation');
