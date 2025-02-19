import { MatInput } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import {
  generateControlRequiredTests,
  generateDisabledTests,
  generateFormFieldAppearanceTests,
  generateFormFieldClearableTests,
  generateFormFieldFloatLabelTests,
  generateFormFieldHintTests,
  generateFormFieldLabelTests,
  generateFormFieldPlaceholderTests,
  generateFormFieldPrefixTests,
  generateFormFieldSuffixTests,
  generateFormValidationTests,
} from '../../../testing';
import { DynamicFormErrorsComponent } from '../../dynamic-form-errors/dynamic-form-errors.component';
import { DynamicFormInputNumberComponent } from './dynamic-form-input-number.component';
import { FormItemInputNumber } from './form-item-input-number.interface';

const defaultElement: FormItemInputNumber = {
  type: 'input',
  position: { x: 0, y: 0 },
  label: 'Date',
  number: {},
};

const renderInput = async (element = defaultElement) => renderElement(DynamicFormInputNumberComponent, { inputs: { element } });

describe('DynamicFormInputNumberComponent', () => {
  describe('Behavior', () => {
    generateControlRequiredTests(defaultElement, DynamicFormInputNumberComponent, 'input');
    generateDisabledTests(
      defaultElement,
      DynamicFormInputNumberComponent,
      (fixture) => fixture.debugElement.query(By.directive(MatInput)).nativeElement,
    );
    generateFormFieldAppearanceTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldClearableTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldFloatLabelTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldHintTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldLabelTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldPlaceholderTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldPrefixTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormFieldSuffixTests(defaultElement, DynamicFormInputNumberComponent);
    generateFormValidationTests(defaultElement, DynamicFormInputNumberComponent, 'invalid');

    describe('Control Validation', () => {
      describe('Max', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a number input without max validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have max error when set in properties and control is valid', async () => {
          // Given a number input with max validation
          const element: typeof defaultElement = {
            ...defaultElement,
            number: {
              validation: {
                max: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue(3);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have max error when set in properties and control is invalid', async () => {
          // Given a number input with max validation
          const element: typeof defaultElement = {
            ...defaultElement,
            number: {
              validation: {
                max: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue(999);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });

      describe('Min Date', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a number input without min validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have min error when set in properties and control is valid', async () => {
          // Given a number input with min validation
          const element: typeof defaultElement = {
            ...defaultElement,
            number: {
              validation: {
                min: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue(999);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have min error when set in properties and control is invalid', async () => {
          // Given a number input with min validation
          const element: typeof defaultElement = {
            ...defaultElement,
            number: {
              validation: {
                min: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue(2);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });
    });

    describe('Default value', () => {
      it('should not set the default value when not set', async () => {
        // Given a form select without a default value
        // When the component is rendered
        const { fixture } = await renderInput(defaultElement);
        fixture.detectChanges();

        // Then the input should not have any value
        expect(fixture.debugElement.query(By.directive(MatInput)).nativeElement).toHaveValue(null);
      });

      it('should set the default value', async () => {
        // Given a form select with a default value
        const element: typeof defaultElement = {
          ...defaultElement,
          defaultValue: 5,
        };

        // When the component is rendered
        const { fixture } = await renderInput(element);
        fixture.detectChanges();

        // Then the default value should be set
        expect(fixture.debugElement.query(By.directive(MatInput)).nativeElement).toHaveValue(5);
      });
    });
  });
});
