import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { DynamicFormErrorsComponent } from '../elements/dynamic-form-errors/dynamic-form-errors.component';

const render = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormValidationTests<T, TComponent>(formElement: T, component: Type<TComponent>, displayOn: 'invalid' | 'always') {
  describe('Form Validation', () => {
    it('should have an error component in the DOM', async () => {
      // Given a form element
      // When the component is rendered
      const { fixture } = await render(component, formElement);

      if (displayOn === 'invalid') {
        const formControl = (fixture.componentInstance as { formControl: FormControl })['formControl'];
        // And the form control is invalid
        formControl.setErrors({ required: true });
        // And the form control is touched
        formControl.markAsTouched();

        fixture.detectChanges();
      }

      // Then the error component should be in the DOM
      const errorComponent = fixture.debugElement.query(By.directive(DynamicFormErrorsComponent));
      expect(errorComponent).not.toBeNull();
    });
  });
}
