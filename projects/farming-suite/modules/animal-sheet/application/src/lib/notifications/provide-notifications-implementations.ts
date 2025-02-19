import { makeEnvironmentProviders } from '@angular/core';
import {
  GetNotificationsCountUseCase,
  GetNotificationsDataUseCase,
  InMemoryGetNotificationsCountUseCaseImplementation,
  InMemoryGetNotificationsDataUseCaseImplementation,
} from '@cooperl/farming-suite/animal-sheet/domain';

export const provideNotificationsImplementations = () =>
  makeEnvironmentProviders([
    {
      provide: GetNotificationsCountUseCase,
      useClass: InMemoryGetNotificationsCountUseCaseImplementation,
    },
    {
      provide: GetNotificationsDataUseCase,
      useClass: InMemoryGetNotificationsDataUseCaseImplementation,
    },
  ]);
