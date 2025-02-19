import { Provider, signal } from '@angular/core';
import { renderElement } from '@cooperl/design-system/testing';
import { AnimalNotification, GetNotificationsDataUseCase } from '@cooperl/farming-suite/animal-sheet/domain';
import { ComponentInput } from '@testing-library/angular';
import { NotificationsSideContentComponent } from './notifications-side-content.component';

const fakeGetNotificationsDataUseCase: Partial<GetNotificationsDataUseCase> = {
  execute: () => ({ value: signal<AnimalNotification[]>([]) }) as ReturnType<GetNotificationsDataUseCase['execute']>,
};

const defaultInputs: ComponentInput<NotificationsSideContentComponent> = {};
const defaultProviders: Provider[] = [
  {
    provide: GetNotificationsDataUseCase,
    useValue: fakeGetNotificationsDataUseCase,
  },
];

const renderComponent = (inputs = defaultInputs, providers = defaultProviders) =>
  renderElement(NotificationsSideContentComponent, { inputs, providers });

describe('[Farming Suite - Animal Sheet] NotificationsSideContentComponent', () => {
  it('should create', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(NotificationsSideContentComponent);
  });
});
