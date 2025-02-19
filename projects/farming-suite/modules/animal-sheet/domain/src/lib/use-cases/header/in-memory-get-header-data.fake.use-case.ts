import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { Logger } from '@cooperl/logger';
import { delay } from '@cooperl/utils';
import { AnimalSheetHeader } from '../../models';
import { GetHeaderDataUseCase, SelectedAnimalStore } from '../../ports';
import { InMemoryHeaderDataFake } from './in-memory-header-data.fake';

@Injectable()
export class InMemoryGetHeaderDataUseCaseImplementation implements GetHeaderDataUseCase {
  private readonly _logger = new Logger('GetHeaderDataUseCase');
  private readonly _selectedAnimalId = inject(SelectedAnimalStore).animalId;

  private readonly _headerData = resource({
    request: () => ({ id: this._selectedAnimalId() }),
    loader: ({ request }) => {
      this._logger.debug(`Fetching sheet of animal with id ${request.id}`);
      const animal = InMemoryHeaderDataFake[request.id];

      if (animal) {
        return Promise.resolve(animal).then(delay(1000));
      } else {
        return Promise.reject(`Animal with id ${request.id} not found`).then(delay(1000));
      }
    },
  });

  public execute(): ResourceRef<AnimalSheetHeader | undefined> {
    return this._headerData;
  }
}
