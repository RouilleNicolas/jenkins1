import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatFormField } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { defaultFormFieldAppearance, FieldInput } from '../interfaces/elements/field/field-input.interface';
import { WithField } from '../interfaces/elements/field/with-field.interface';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldAppearanceTests<T extends WithField<FieldInput>, TComponent>(formElement: T, component: Type<TComponent>) {
  describe('Appearance', () => {
    it('should be defaulted', async () => {
      // Given an element with no outline appearance
      // When the component is rendered
      const { fixture } = await renderFn(component, formElement);

      // Then the form field should not have the outline appearance
      expect(getFormField(fixture).appearance).toBe(defaultFormFieldAppearance);
    });

    it('should have the outline appearance if set', async () => {
      // Given a form element with the outline appearance
      const element: T = {
        ...formElement,
        field: {
          appearance: 'outline',
        },
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);

      // Then the element should have the outline appearance
      expect(getFormField(fixture).appearance).toBe('outline');
    });

    it('should have the fill appearance if set', async () => {
      // Given a form element with the fill appearance
      const element: T = {
        ...formElement,
        field: {
          appearance: 'fill',
        },
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);

      // Then the element should have the fill appearance
      expect(getFormField(fixture).appearance).toBe('fill');
    });
  });
}

function getFormField(fixture: ComponentFixture<unknown>): MatFormField {
  return fixture.debugElement.query(By.directive(MatFormField)).componentInstance;
}
