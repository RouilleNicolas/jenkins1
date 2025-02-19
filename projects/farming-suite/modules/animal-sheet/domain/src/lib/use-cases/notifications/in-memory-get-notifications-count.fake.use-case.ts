import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { Logger } from '@cooperl/logger';
import { delay } from '@cooperl/utils';
import { GetNotificationsCountUseCase, SelectedAnimalStore } from '../../ports';
import { InMemoryNotificationsDataFake } from './in-memory-notifications-data.fake';

@Injectable()
export class InMemoryGetNotificationsCountUseCaseImplementation implements GetNotificationsCountUseCase {
  private _poller: number | null = null;
  private readonly _logger = new Logger('GetNotificationsCountUseCase');
  private readonly _selectedAnimalId = inject(SelectedAnimalStore).animalId;

  private readonly _notificationsCount = resource({
    request: () => ({ id: this._selectedAnimalId() }),
    loader: ({ request }) => {
      this._logger.debug(`Fetching notifications count of animal with id ${request.id}`);
      const count = (InMemoryNotificationsDataFake[request.id] ?? []).length;

      return Promise.resolve(count).then(delay(1000));
    },
  });

  public execute(): ResourceRef<number | undefined> {
    return this._notificationsCount;
  }

  public poll(): void {
    if (this._poller !== null) {
      this._logger.warn('Notifications count polling is already running');
      return;
    }

    this._logger.debug('Starting notifications count polling');

    this._poller = window.setInterval(() => {
      this._logger.debug('Refreshing notifications count');
      this._notificationsCount.reload();
    }, 30_000);
  }

  public stopPolling(): void {
    if (this._poller !== null) {
      this._logger.debug('Stopping notifications count polling');
      window.clearInterval(this._poller);
      this._poller = null;
    }
  }
}
