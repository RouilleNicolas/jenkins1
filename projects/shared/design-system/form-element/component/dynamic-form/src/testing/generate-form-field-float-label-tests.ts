import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatFormField } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { defaultFormFieldFloatLabel, FieldInput } from '../interfaces/elements/field/field-input.interface';
import { WithField } from '../interfaces/elements/field/with-field.interface';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldFloatLabelTests<T extends WithField<FieldInput>, TComponent>(formElement: T, component: Type<TComponent>) {
  describe('Float label', () => {
    it('should be defaulted', async () => {
      // Given an element with no float label prop
      // When the component is rendered
      const { fixture } = await renderFn(component, formElement);

      // Then the float label should be defaulted
      expect(getFormField(fixture).floatLabel).toBe(defaultFormFieldFloatLabel);
    });

    it('should be set to auto when set', async () => {
      // Given an element with float label prop set to true
      const element: T = {
        ...formElement,
        field: {
          floatLabel: 'auto',
        },
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);

      // Then the float label should be set to true
      expect(getFormField(fixture).floatLabel).toBe('auto');
    });

    it('should be set to always when set', async () => {
      // Given an element with float label prop set to true
      const element: T = {
        ...formElement,
        field: {
          floatLabel: 'always',
        },
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);

      // Then the float label should be set to true
      expect(getFormField(fixture).floatLabel).toBe('always');
    });
  });
}

function getFormField(fixture: ComponentFixture<unknown>): MatFormField {
  return fixture.debugElement.query(By.directive(MatFormField)).componentInstance;
}
