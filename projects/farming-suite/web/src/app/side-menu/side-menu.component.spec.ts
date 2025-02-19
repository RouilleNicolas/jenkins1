import { renderElement } from '@cooperl/design-system/testing';
import { SideMenuComponent } from './side-menu.component';

describe('[Farming Suite - Web] SideMenuComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(SideMenuComponent);

    expect(fixture.componentInstance).toBeInstanceOf(SideMenuComponent);
  });
});
