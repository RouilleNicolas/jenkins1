import { renderElement } from '@cooperl/design-system/testing';
import { CareerPageComponent } from './career.component';

describe('[Farming Suite - Animal Sheet] CareerPageComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(CareerPageComponent);

    expect(fixture.componentInstance).toBeInstanceOf(CareerPageComponent);
  });
});
