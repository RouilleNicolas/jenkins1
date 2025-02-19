import { Type } from '@angular/core';
import { MatDatepicker, MatDateRangePicker } from '@angular/material/datepicker';
import { MatSuffix } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { DynamicFormInputDateRangeComponent } from '../elements/inputs/dynamic-form-input-date-range/dynamic-form-input-date-range.component';
import { DynamicFormInputDateComponent } from '../elements/inputs/dynamic-form-input-date/dynamic-form-input-date.component';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldSuffixTests<T extends { clearable?: boolean }, TComponent>(formElement: T, component: Type<TComponent>) {
  describe('Suffix', () => {
    it('should not have a suffix by default', async () => {
      // Given a form element
      // When the component is created
      const { fixture } = await renderFn(component, formElement);

      // Then the form field should not have a suffix
      expect(fixture.debugElement.query(By.directive(MatSuffix))).toBeNull();
    });

    it('should have a suffix when set in properties', async () => {
      // Given a form element with a suffix
      const element: T = {
        ...formElement,
        suffix: {
          icon: 'calendar_today',
        },
      };

      // When the component is created
      const { fixture } = await renderFn(component, element);

      // Then the form field should have a suffix
      expect(fixture.debugElement.query(By.directive(MatSuffix)).nativeElement).toBeVisible();
    });

    it('should be the icon specified in the property', async () => {
      // Given a form element with a suffix
      const element: T = {
        ...formElement,
        suffix: {
          icon: 'calendar_today',
        },
      };

      // When the component is created
      const { fixture } = await renderFn(component, element);

      // Then the form field should have the specified icon
      expect(fixture.debugElement.query(By.directive(MatSuffix)).nativeElement).toHaveTextContent('calendar_today');
    });

    const dateComponents: Type<unknown>[] = [DynamicFormInputDateComponent, DynamicFormInputDateRangeComponent];
    const isDateComponent = dateComponents.includes(component);
    if (isDateComponent) {
      it('should be the button that open the datepicker when clicked', async () => {
        // Given a form element with a suffix
        const element: T = {
          ...formElement,
          suffix: {
            icon: 'calendar_today',
          },
        };

        // When the component is created
        const { fixture } = await renderFn(component, element);
        fixture.detectChanges();

        // And the suffix is clicked
        fixture.debugElement.query(By.directive(MatSuffix)).nativeElement.click();
        fixture.detectChanges();

        // Then the datepicker should be open
        switch (component) {
          case DynamicFormInputDateComponent:
            expect(fixture.debugElement.query(By.directive(MatDatepicker)).nativeElement).toBeVisible();
            break;
          case DynamicFormInputDateRangeComponent:
            expect(fixture.debugElement.query(By.directive(MatDateRangePicker)).nativeElement).toBeVisible();
            break;
        }
      });
    }
  });
}
