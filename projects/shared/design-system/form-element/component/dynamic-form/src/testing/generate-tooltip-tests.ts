import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatTooltip, TooltipPosition, TooltipTouchGestures } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput } from '@testing-library/angular';
import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';

const render = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateTooltipTests<T, TComponent>(
  formElement: T,
  component: Type<TComponent>,
  getNodeFn: (fixture: ComponentFixture<TComponent>) => HTMLElement,
) {
  describe('Tooltip property', () => {
    it('should have the tooltip when the tooltip property is set', async () => {
      // Given a form element with the tooltip property set
      const elementWithTooltip: T = {
        ...formElement,
        tooltip: {
          content: 'Tooltip',
        },
      };

      // When the component is rendered
      const { fixture } = await render(component, elementWithTooltip);

      // Then the component should have an attached tooltip, displayed on mouse hover
      const htmlElement = getNodeFn(fixture);
      fireEvent.mouseEnter(htmlElement);
      // The Node with the tooltip role is never visible in the DOM. It's used for aria purposes.
      const tooltip = getTooltipByText('Tooltip');
      expect(tooltip).toBeVisible();
    });

    it('should not have the tooltip when the tooltip property is not set', async () => {
      // Given a form element with the tooltip property not set
      // When the component is rendered
      const { fixture } = await render(component, formElement);

      // Then the component should not have an attached tooltip
      const htmlElement = getNodeFn(fixture);
      fireEvent.mouseEnter(htmlElement);
      // The Node with the tooltip role is never visible in the DOM. It's used for aria purposes.
      expect(getTooltipByText('Tooltip')).toBeNull();
    });

    it('should have the tooltip position defaulted to above', async () => {
      // Given a form component with the tooltip property set
      const elementWithTooltip: T = {
        ...formElement,
        tooltip: {
          content: 'Tooltip',
        },
      };

      // When the component is rendered
      const { fixture } = await render(component, elementWithTooltip);

      // Then the component should have the tooltip above
      const tooltip = fixture.debugElement.query(By.directive(MatTooltip)).injector.get(MatTooltip);
      expect(tooltip.position).toBe('above');
    });

    const tooltipPositions: TooltipPosition[] = ['above', 'below', 'before', 'after', 'left', 'right'];
    for (const position of tooltipPositions) {
      it(`should have the tooltip position set to ${position}`, async () => {
        // Given a form component with the tooltip property set
        const elementWithTooltip: T = {
          ...formElement,
          tooltip: {
            content: 'Tooltip',
            position,
          },
        };

        // When the component is rendered
        const { fixture } = await render(component, elementWithTooltip);

        // Then the component should have the tooltip position set to the specified value
        const tooltip = fixture.debugElement.query(By.directive(MatTooltip)).injector.get(MatTooltip);
        expect(tooltip.position).toBe(position);
      });
    }

    it('should have the tooltip touch gesture defaulted to auto', async () => {
      // Given a form component with the tooltip property set
      const elementWithTooltip: T = {
        ...formElement,
        tooltip: {
          content: 'Tooltip',
        },
      };

      // When the component is rendered
      const { fixture } = await render(component, elementWithTooltip);

      // Then the component should have the tooltip touch gesture set to auto
      const tooltip = fixture.debugElement.query(By.directive(MatTooltip)).injector.get(MatTooltip);
      expect(tooltip.touchGestures).toBe('auto');
    });

    const tooltipTouchGestures: TooltipTouchGestures[] = ['auto', 'on', 'off'];

    for (const touchGesture of tooltipTouchGestures) {
      it(`should have the tooltip touch gesture set to ${touchGesture}`, async () => {
        // Given a form component with the tooltip property set
        const elementWithTooltip: T = {
          ...formElement,
          tooltip: {
            content: 'Tooltip',
            touchGesture,
          },
        };

        // When the component is rendered
        const { fixture } = await render(component, elementWithTooltip);

        // Then the component should have the tooltip touch gesture set to the specified value
        const tooltip = fixture.debugElement.query(By.directive(MatTooltip)).injector.get(MatTooltip);
        expect(tooltip.touchGestures).toBe(touchGesture);
      });
    }

    describe('Tooltip content', () => {
      testForAvailableLanguages(({ translations, setLanguageToTestedLocale }) => {
        it('should display a translated content when the tooltip content is a translation key', async () => {
          // Given a form component with the tooltip property set
          const elementWithTooltip: T = {
            ...formElement,
            tooltip: {
              content: 'dynamic-forms.tooltip.content',
            },
          };

          // When the component is rendered
          const { fixture } = await render(component, elementWithTooltip);

          // Then the component should display the translated content
          setLanguageToTestedLocale(fixture);
          const htmlElement = getNodeFn(fixture);
          fireEvent.mouseEnter(htmlElement);
          // The Node with the tooltip role is never visible in the DOM. It's used for aria purposes.
          const tooltip = getTooltipByText(translations['dynamic-forms'].tooltip.content);
          expect(tooltip).toBeVisible();
        });

        it('should display the translation key when the translation is missing', async () => {
          // Given a form component with the tooltip property set
          const elementWithTooltip: T = {
            ...formElement,
            tooltip: {
              content: 'dynamic-forms.tooltip.not-found',
            },
          };

          // When the component is rendered
          const { fixture } = await render(component, elementWithTooltip);

          // Then the component should display the translation key
          const htmlElement = getNodeFn(fixture);
          fireEvent.mouseEnter(htmlElement);
          // The Node with the tooltip role is never visible in the DOM. It's used for aria purposes.
          const tooltip = getTooltipByText('dynamic-forms.tooltip.not-found');
          expect(tooltip).toBeVisible();
        });
      });
    });
  });
}

function getTooltipByText(tooltipText: string): HTMLElement | null {
  return screen.queryByText(tooltipText, { ignore: '[role="tooltip"]' });
}
