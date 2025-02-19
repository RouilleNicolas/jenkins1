import { makeEnvironmentProviders } from '@angular/core';
import {
  GetGeneralPageDataUseCase,
  GetHeaderDataUseCase,
  InMemoryGetGeneralPageDataUseCaseImplementation,
  InMemoryGetHeaderDataUseCaseImplementation,
  SelectedAnimalStore,
} from '@cooperl/farming-suite/animal-sheet/domain';
import { SelectedAnimalStoreImplementation } from '@cooperl/farming-suite/animal-sheet/state';
import { provideNotificationsImplementations } from './notifications/provide-notifications-implementations';

export const provideAnimalSheetPortsImplementations = () =>
  makeEnvironmentProviders([
    { provide: SelectedAnimalStore, useClass: SelectedAnimalStoreImplementation },
    // Notifications
    provideNotificationsImplementations(),
    // Header
    { provide: GetHeaderDataUseCase, useClass: InMemoryGetHeaderDataUseCaseImplementation },
    // General Page
    { provide: GetGeneralPageDataUseCase, useClass: InMemoryGetGeneralPageDataUseCaseImplementation },
  ]);
