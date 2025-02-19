import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatSelect } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput, fireEvent } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { MaybeArray } from 'date-fns';
import { WithOptions } from '../interfaces/elements/options/with-options.interface';
import { SelectableItem } from '../interfaces/elements/selectable-item.interface';
import { isFormItemWithOptions } from '../types-guards';

const render = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateDisabledTests<T, TComponent>(
  formElement: T,
  component: Type<TComponent>,
  getNodeFn: (fixture: ComponentFixture<TComponent>) => MaybeArray<HTMLElement>,
) {
  describe('Disabled property', () => {
    it('should be disabled when the disabled property is set', async () => {
      // Given a form element with the disabled property set
      const disabledElement: T = { ...formElement, disabled: true, field: { disabled: true } };

      // When the component is rendered
      const { fixture } = await render(component, disabledElement);

      // Then the element should be disabled
      const htmlElement = getNodeFn(fixture);

      if (Array.isArray(htmlElement)) {
        for (const element of htmlElement) {
          expect(element).toBeDisabled();
        }
      } else {
        expect(htmlElement).toBeDisabled();
      }
    });

    it('should not be disabled when the disabled property is set to false', async () => {
      // Given a form element with the disabled property not set
      const enabledElement: T = { ...formElement, disabled: false, field: { disabled: false } };

      // When the component is rendered
      const { fixture } = await render(component, enabledElement);

      // Then the element should not be disabled
      const htmlElement = getNodeFn(fixture);

      if (Array.isArray(htmlElement)) {
        for (const element of htmlElement) {
          expect(element).not.toBeDisabled();
        }
      } else {
        expect(htmlElement).not.toBeDisabled();
      }
    });

    it('should not be disabled when the disabled property is not set', async () => {
      // Given a form element with the disabled property not set
      // When the component is rendered
      const { fixture } = await render(component, formElement);

      // Then the element should not be disabled
      const htmlElement = getNodeFn(fixture);

      if (Array.isArray(htmlElement)) {
        for (const element of htmlElement) {
          expect(element).not.toBeDisabled();
        }
      } else {
        expect(htmlElement).not.toBeDisabled();
      }
    });

    if (isFormItemWithOptions(formElement)) {
      it('should disable any option that has the disabled property set', async () => {
        // Given a form element with an option with the disabled property set
        const disabledOptionElement: T & WithOptions<SelectableItem> = {
          ...formElement,
          options: {
            ...formElement.options,
            items: {
              ...formElement.options.items,
              'item-3': { label: 'item-3', value: 'option-3', disabled: true },
            },
          },
        };

        // When the component is rendered
        const { fixture } = await render(component, disabledOptionElement);

        // In the case of a select element, we need to click on the select element to open the options
        if (formElement.type === 'select') {
          fireEvent.click(fixture.debugElement.query(By.directive(MatSelect)).nativeElement);
        }

        // Then the option should be disabled
        switch (formElement.type) {
          case 'select': {
            const htmlElement = fixture.debugElement.query(By.css('.mdc-list-item--disabled')).nativeElement;
            expect(htmlElement).toHaveTextContent('item-3');
            break;
          }
          case 'radio': {
            const htmlElement = fixture.debugElement.query(By.css('#item-3 input')).nativeElement;
            expect(htmlElement).toBeDisabled();
            break;
          }
          default:
            throw new Error('Element type not supported');
        }
      });
    }
  });
}
