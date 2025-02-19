import { InjectionToken, WritableSignal } from '@angular/core';
import { Id } from '@cooperl/utils';

export interface SelectedAnimalStore {
  animalId: WritableSignal<Id>;
}

export const SelectedAnimalStore = new InjectionToken<SelectedAnimalStore>('SelectedAnimalStore implementation');
