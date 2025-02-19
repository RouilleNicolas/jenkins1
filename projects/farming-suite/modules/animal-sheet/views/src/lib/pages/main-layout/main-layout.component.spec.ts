import { signal } from '@angular/core';
import { renderElement } from '@cooperl/design-system/testing';
import { GetHeaderDataUseCase, SelectedAnimalStore } from '@cooperl/farming-suite/animal-sheet/domain';
import { MainLayoutComponent } from './main-layout.component';

const fakeSelectedAnimalStore: Partial<SelectedAnimalStore> = {
  animalId: signal('1'),
};

const fakeGetHeaderDataUseCase: Partial<GetHeaderDataUseCase> = {
  execute: () => ({ value: signal({}) }) as ReturnType<GetHeaderDataUseCase['execute']>,
};

const renderMainLayoutComponent = () =>
  renderElement(MainLayoutComponent, {
    inputs: { id: '1' },
    providers: [
      { provide: SelectedAnimalStore, useValue: fakeSelectedAnimalStore },
      { provide: GetHeaderDataUseCase, useValue: fakeGetHeaderDataUseCase },
    ],
  });

describe('[Farming Suite - Animal Sheet] MainLayoutComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderMainLayoutComponent();

    expect(fixture.componentInstance).toBeInstanceOf(MainLayoutComponent);
  });
});
