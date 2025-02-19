import { renderElement } from '@cooperl/design-system/testing';
import { InternalMovementPageComponent } from './internal-movement.component';

describe('[Farming Suite - Animal Sheet] InternalMovementPageComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(InternalMovementPageComponent);

    expect(fixture.componentInstance).toBeInstanceOf(InternalMovementPageComponent);
  });
});
