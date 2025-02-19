import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { NotificationsCountComponent } from './notifications-count.component';

const defaultInputs: ComponentInput<NotificationsCountComponent> = {
  count: 2,
};

const renderComponent = (inputs = defaultInputs) => renderElement(NotificationsCountComponent, { inputs });

describe('[Farming Suite - Animal Sheet] NotificationsCountComponent', () => {
  it('should create', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(NotificationsCountComponent);
  });

  it('should be visible', async () => {
    const { getByText } = await renderComponent();

    expect(getByText(defaultInputs.count?.toString() ?? 'this_should_not_appear')).toBeVisible();
  });
});
