import { renderElement } from '@cooperl/design-system/testing';
import { AppComponent } from './app.component';

describe('[Farming Suite - Web] AppComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(AppComponent);

    expect(fixture.componentInstance).toBeInstanceOf(AppComponent);
  });
});
