import { InjectionToken } from '@angular/core';
import { UseCaseResource } from '@cooperl/utils';
import { AnimalNotification } from '../../models';

export type GetNotificationsDataUseCase = UseCaseResource<AnimalNotification[]>;

export const GetNotificationsDataUseCase = new InjectionToken<GetNotificationsDataUseCase>('GetNotificationsDataUseCase implementation');
