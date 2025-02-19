import { Type } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput, fireEvent } from '@testing-library/angular';
import { DynamicFormControlComponent } from '../elements/abstracts/dynamic-form-control.abstract';
import { DynamicFormAcceptedValueTypes } from '../interfaces/dynamic-form-accepted-value-types.interface';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldClearableTests<T extends { clearable?: boolean }, TComponent>(formElement: T, component: Type<TComponent>) {
  describe('Clearable', () => {
    it('should not display by default', async () => {
      // Given a form element with no clearable prop
      const element: T = {
        ...formElement,
      };
      delete element.clearable;

      // When the component is rendered
      const { fixture } = await renderFn(component, element);
      fixture.detectChanges();

      // Then no clear button should be displayed
      const clearButton = fixture.debugElement.query(By.directive(MatIcon));
      expect(clearButton).toBeNull();
    });

    it('should display a clear button if the element is clearable and the control has a value', async () => {
      // Given a form element that is clearable
      const element: T = {
        ...formElement,
        clearable: true,
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);
      fixture.detectChanges();

      // And the control has a value
      const instance = fixture.componentInstance as DynamicFormControlComponent<T, DynamicFormAcceptedValueTypes>;
      instance['formControl'].setValue('value');
      fixture.detectChanges();

      // Then a clear button should be displayed
      const clearButton = fixture.debugElement.query(By.directive(MatIcon)).nativeElement;
      expect(clearButton).toBeVisible();
      expect(clearButton).toHaveTextContent('close');
    });

    it('should not display a clear button if the element is not clearable', async () => {
      // Given a form element that is not clearable
      const element: T = {
        ...formElement,
        clearable: false,
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);
      fixture.detectChanges();

      // Then a clear button should be displayed
      const clearButton = fixture.debugElement.query(By.directive(MatIcon));
      expect(clearButton).toBeNull();
    });

    it('should not display a clear button if the element is clearable and the control has no value', async () => {
      // Given a form element that is clearable
      const element: T = {
        ...formElement,
        clearable: true,
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);
      fixture.detectChanges();

      // And the control has no value
      const instance = fixture.componentInstance as DynamicFormControlComponent<T, DynamicFormAcceptedValueTypes>;
      instance['formControl'].setValue(null);

      // Then no clear button should be displayed
      const clearButton = fixture.debugElement.query(By.directive(MatIcon));
      expect(clearButton).toBeNull();
    });

    it('should clear the value when the clear button is clicked', async () => {
      // Given a form element that is clearable
      const element: T = {
        ...formElement,
        clearable: true,
      };

      // When the component is rendered
      const { fixture } = await renderFn(component, element);
      fixture.detectChanges();

      // And the control has a value
      const instance = fixture.componentInstance as DynamicFormControlComponent<T, DynamicFormAcceptedValueTypes>;
      instance['formControl'].setValue('value');
      fixture.detectChanges();

      // And the clear button is clicked
      const clearButton = fixture.debugElement.query(By.directive(MatIcon)).nativeElement;
      fireEvent.click(clearButton);
      fixture.detectChanges();

      // Then the control should be cleared
      expect(instance['formControl'].value).toBeNull();
    });
  });
}
