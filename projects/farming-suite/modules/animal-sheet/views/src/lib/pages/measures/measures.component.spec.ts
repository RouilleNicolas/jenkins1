import { renderElement } from '@cooperl/design-system/testing';
import { MeasuresPageComponent } from './measures.component';

describe('[Farming Suite - Animal Sheet] MeasuresPageComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(MeasuresPageComponent);

    expect(fixture.componentInstance).toBeInstanceOf(MeasuresPageComponent);
  });
});
