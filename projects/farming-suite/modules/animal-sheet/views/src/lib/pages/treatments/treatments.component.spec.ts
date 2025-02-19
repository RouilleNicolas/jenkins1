import { renderElement } from '@cooperl/design-system/testing';
import { TreatmentsPageComponent } from './treatments.component';

describe('[Farming Suite - Animal Sheet] TreatmentsPageComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(TreatmentsPageComponent);

    expect(fixture.componentInstance).toBeInstanceOf(TreatmentsPageComponent);
  });
});
