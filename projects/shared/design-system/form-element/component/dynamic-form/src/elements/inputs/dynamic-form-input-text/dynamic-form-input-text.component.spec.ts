import { MatInput } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { userEvent } from '@testing-library/user-event';
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
import { DynamicFormInputTextComponent } from './dynamic-form-input-text.component';
import { FormItemInputText } from './form-item-input-text.interface';

const defaultElement: FormItemInputText = {
  type: 'input',
  position: { x: 0, y: 0 },
  label: 'Date',
};

const renderInput = async (element = defaultElement) => renderElement(DynamicFormInputTextComponent, { inputs: { element } });

describe('DynamicFormInputTextComponent', () => {
  describe('Behavior', () => {
    generateControlRequiredTests(defaultElement, DynamicFormInputTextComponent, 'input');
    generateDisabledTests(
      defaultElement,
      DynamicFormInputTextComponent,
      (fixture) => fixture.debugElement.query(By.directive(MatInput)).nativeElement,
    );
    generateFormFieldAppearanceTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldClearableTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldFloatLabelTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldHintTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldLabelTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldPlaceholderTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldPrefixTests(defaultElement, DynamicFormInputTextComponent);
    generateFormFieldSuffixTests(defaultElement, DynamicFormInputTextComponent);
    generateFormValidationTests(defaultElement, DynamicFormInputTextComponent, 'invalid');

    describe('Control Validation', () => {
      describe('Regex', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a text input without regex validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have regex error when set in properties and control is valid', async () => {
          // Given a text input with regex validation
          const element: typeof defaultElement = {
            ...defaultElement,
            validation: {
              // 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter
              regex: '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$',
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue('Password1!');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have regex error when set in properties and control is invalid', async () => {
          // Given a text input with regex validation
          const element: typeof defaultElement = {
            ...defaultElement,
            validation: {
              // 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter
              regex: '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$',
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue('invalid');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });

      describe('Size', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a text input without size validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have size error when set in properties and control is valid', async () => {
          // Given a text input with size validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                size: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue('valid');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have size error when set in properties and control is invalid', async () => {
          // Given a text input with size validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                size: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue('invalid');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });

        // TODO : Find a way to make it work...
        // userEvent.type does not seems to put value in the input
        it.skip('should lock the input when the size is reached', async () => {
          // Given a text input with size validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                size: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // and the user type more than the size
          const input = fixture.debugElement.query(By.directive(MatInput)).nativeElement;
          userEvent.type(input, 'LongText');
          fixture.detectChanges();

          // Then the input should be locked to the size
          expect(input).toHaveValue('LongT');
        });
      });

      describe('Max Length', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a text input without max length validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have max length error when set in properties and control is valid', async () => {
          // Given a text input with max length validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                maxlength: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue('valid');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have max length error when set in properties and control is invalid', async () => {
          // Given a text input with max length validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                maxlength: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue('invalid value');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });

      describe('Min Length', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a text input without min length validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have min length error when set in properties and control is valid', async () => {
          // Given a text input with min length validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                minlength: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue('valid');
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have min length error when set in properties and control is invalid', async () => {
          // Given a text input with min length validation
          const element: typeof defaultElement = {
            ...defaultElement,
            text: {
              validation: {
                minlength: 5,
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue('Hi !');
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
        expect(fixture.debugElement.query(By.directive(MatInput)).nativeElement).toHaveValue('');
      });

      it('should set the default value', async () => {
        // Given a form select with a default value
        const element: typeof defaultElement = {
          ...defaultElement,
          defaultValue: 'default value',
        };

        // When the component is rendered
        const { fixture } = await renderInput(element);
        fixture.detectChanges();

        // Then the default value should be set
        expect(fixture.debugElement.query(By.directive(MatInput)).nativeElement).toHaveValue('default value');
      });
    });
  });
});
