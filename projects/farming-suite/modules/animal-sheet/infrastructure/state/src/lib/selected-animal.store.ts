import { effect, Injectable, signal } from '@angular/core';
import { SelectedAnimalStore } from '@cooperl/farming-suite/animal-sheet/domain';
import { Logger } from '@cooperl/logger';
import { Id } from '@cooperl/utils';

@Injectable()
export class SelectedAnimalStoreImplementation implements SelectedAnimalStore {
  public readonly animalId = signal<Id>(0);

  private readonly _logger = new Logger('SelectedAnimalStore');

  constructor() {
    effect(() => this._logger.debug('Selected animal ID:', this.animalId()));
  }
}
