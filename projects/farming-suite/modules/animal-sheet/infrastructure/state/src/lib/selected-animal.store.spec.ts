import { TestBed } from '@angular/core/testing';
import { SelectedAnimalStoreImplementation } from './selected-animal.store';

describe('[Farming Suite - Animal Sheet] SelectedAnimalStore', () => {
  let service: SelectedAnimalStoreImplementation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SelectedAnimalStoreImplementation],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(SelectedAnimalStoreImplementation);
  });

  it('should instantiate', () => {
    expect(service).toBeTruthy();
  });
});
