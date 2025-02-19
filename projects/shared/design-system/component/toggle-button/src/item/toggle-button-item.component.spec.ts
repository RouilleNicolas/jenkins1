import { Provider, signal } from '@angular/core';
import { ViewportService } from '@cooperl/design-system';
import { renderElement } from '@cooperl/design-system/testing';
import { aliasedInput, ComponentInput } from '@testing-library/angular';
import { ToggleButtonItemComponent } from './toggle-button-item.component';

const defaultInputs: ComponentInput<ToggleButtonItemComponent> = {
  selected: false,
  ...aliasedInput('testId', 'header-nav-item'),
};

const renderComponent = (inputs = defaultInputs, providers: Provider[] = []) => renderElement(ToggleButtonItemComponent, { inputs, providers });

describe('[Design System] ToggleButtonItemComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(ToggleButtonItemComponent);
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

  describe('Selected css class', () => {
    it('should not have selected css class when input is not set', async () => {
      const { fixture } = await renderComponent();

      expect(fixture.nativeElement).not.toHaveClass('selected');
    });

    it('should have selected css class when input is set', async () => {
      const { fixture } = await renderComponent({ ...defaultInputs, selected: true });

      expect(fixture.nativeElement).toHaveClass('selected');
    });
  });
});
