import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { Logger } from '@cooperl/logger';
import { delay } from '@cooperl/utils';
import { AnimalNotification } from '../../models';
import { GetNotificationsDataUseCase, SelectedAnimalStore } from '../../ports';
import { InMemoryNotificationsDataFake } from './in-memory-notifications-data.fake';

@Injectable()
export class InMemoryGetNotificationsDataUseCaseImplementation implements GetNotificationsDataUseCase {
  private readonly _logger = new Logger('GetNotificationsDataUseCase');
  private readonly _selectedAnimalId = inject(SelectedAnimalStore).animalId;

  private readonly _notifications = resource({
    request: () => ({ id: this._selectedAnimalId() }),
    loader: ({ request }) => {
      this._logger.debug(`Fetching notifications of animal with id ${request.id}`);

      const data = InMemoryNotificationsDataFake[request.id] ?? [];

      return Promise.resolve(data).then(delay(1000));
    },
  });

  public execute(): ResourceRef<AnimalNotification[] | undefined> {
    return this._notifications;
  }
}
