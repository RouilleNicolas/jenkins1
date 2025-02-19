import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { Logger } from '@cooperl/logger';
import { delay } from '@cooperl/utils';
import { GeneralPageData } from '../../../models';
import { GetGeneralPageDataUseCase, SelectedAnimalStore } from '../../../ports';
import { InMemoryGeneralPageDataFake } from './in-memory-general-page-data.fake';

@Injectable()
export class InMemoryGetGeneralPageDataUseCaseImplementation implements GetGeneralPageDataUseCase {
  private readonly _logger = new Logger('GetGeneralPageDataUseCase');

  private readonly _selectedAnimalId = inject(SelectedAnimalStore).animalId;

  private readonly _generalPageDataResource = resource({
    request: () => ({ id: this._selectedAnimalId() }),
    loader: ({ request }) => {
      this._logger.debug(`Fetching notifications of animal with id ${request.id}`);

      const data = InMemoryGeneralPageDataFake[request.id] ?? [];

      return Promise.resolve(data).then(delay(1000));
    },
  });

  execute(): ResourceRef<GeneralPageData | undefined> {
    return this._generalPageDataResource;
  }
}
