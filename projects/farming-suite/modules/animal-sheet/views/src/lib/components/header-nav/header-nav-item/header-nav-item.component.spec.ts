import { Provider, signal } from '@angular/core';
import { ViewportService } from '@cooperl/design-system';
import { renderElement } from '@cooperl/design-system/testing';
import { aliasedInput, ComponentInput } from '@testing-library/angular';
import { HeaderNavItemComponent } from './header-nav-item.component';

const defaultInputs: ComponentInput<HeaderNavItemComponent> = {
  active: false,
  ...aliasedInput('testId', 'header-nav-item'),
};

const renderComponent = (inputs = defaultInputs, providers: Provider[] = []) => renderElement(HeaderNavItemComponent, { inputs, providers });

describe('[Farming Suite - Animal Sheet] HeaderNavItemComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(HeaderNavItemComponent);
  });

  describe('Handset css class', () => {
    it('should not have handset css class when viewport is not handset', async () => {
      const { fixture } = await renderComponent(defaultInputs, [
        {
          provide: ViewportService,
          useValue: {
            isHandsetViewport: signal(false),
          },
        },
      ]);

      expect(fixture.nativeElement).not.toHaveClass('handset');
    });

    it('should have handset css class when viewport is handset', async () => {
      const { fixture } = await renderComponent(defaultInputs, [
        {
          provide: ViewportService,
          useValue: {
            isHandsetViewport: signal(true),
          },
        },
      ]);

      expect(fixture.nativeElement).toHaveClass('handset');
    });
  });

  describe('Active css class', () => {
    it('should not have active css class when input is not set', async () => {
      const { fixture } = await renderComponent();

      expect(fixture.nativeElement).not.toHaveClass('active');
    });

    it('should have active css class when input is set', async () => {
      const { fixture } = await renderComponent({ ...defaultInputs, active: true });

      expect(fixture.nativeElement).toHaveClass('active');
    });
  });
});
