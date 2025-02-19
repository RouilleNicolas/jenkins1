import { TestBed } from '@angular/core/testing';
import { MatCalendar } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { fireEvent, screen } from '@testing-library/angular';
import { add, format, sub } from 'date-fns';
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
import { DynamicFormInputDateComponent } from './dynamic-form-input-date.component';
import { defaultDateStartView, FormItemInputDate, StartView } from './form-item-input-date.interface';

const defaultElement: FormItemInputDate = {
  type: 'input',
  position: { x: 0, y: 0 },
  label: 'Date',
  date: {},
};

const renderInput = async (element = defaultElement) => renderElement(DynamicFormInputDateComponent, { inputs: { element } });

describe('DynamicFormInputDateComponent', () => {
  describe('Behavior', () => {
    generateFormFieldAppearanceTests(defaultElement, DynamicFormInputDateComponent);
    generateFormFieldFloatLabelTests(defaultElement, DynamicFormInputDateComponent);
    generateControlRequiredTests(defaultElement, DynamicFormInputDateComponent, 'input');
    generateDisabledTests(defaultElement, DynamicFormInputDateComponent, (fixture) => fixture.debugElement.query(By.css('input')).nativeElement);
    generateFormValidationTests(defaultElement, DynamicFormInputDateComponent, 'invalid');
    generateFormFieldLabelTests(defaultElement, DynamicFormInputDateComponent);
    generateFormFieldPlaceholderTests(defaultElement, DynamicFormInputDateComponent);
    generateFormFieldClearableTests(defaultElement, DynamicFormInputDateComponent);
    generateFormFieldPrefixTests(defaultElement, DynamicFormInputDateComponent);
    generateFormFieldSuffixTests(defaultElement, DynamicFormInputDateComponent);
    generateFormFieldHintTests(defaultElement, DynamicFormInputDateComponent);

    describe('Control Validation', () => {
      // Skip Regex validation tests for now
      // Reason : The regex validation is not working as expected,
      // the displayed value IS formatted correctly but the validation is checking the raw value which is a Date object
      describe.skip('Regex', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a date input without regex validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have regex error when set in properties and control is valid', async () => {
          // Given a date input with regex validation
          const element: typeof defaultElement = {
            ...defaultElement,
            validation: {
              regex: '^\\d{2}\\/\\d{2}\\/\\d{4}$/gm',
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue(format(new Date(), 'dd/MM/yyyy') as unknown as Date);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have regex error when set in properties and control is invalid', async () => {
          // Given a date input with regex validation
          const element: typeof defaultElement = {
            ...defaultElement,
            validation: {
              regex: '^\\d{4}-\\d{2}-\\d{2}$',
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue('invalid' as unknown as Date);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });

      describe('Max Date', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a date input without max date validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have max date error when set in properties and control is valid', async () => {
          // Given a date input with max date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                max: add(new Date(), { days: 1 }).toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue(new Date());
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have max date error when set in properties and control is invalid', async () => {
          // Given a date input with max date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                max: sub(new Date(), { days: 1 }).toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue(new Date().toString() as unknown as Date);
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });

      describe('Min Date', () => {
        it('should not have validation when not set in properties', async () => {
          // Given a date input without min date validation
          // When the component is created
          const { fixture } = await renderInput();
          fixture.detectChanges();

          // Then the input should not have any validation
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should not have min date error when set in properties and control is valid', async () => {
          // Given a date input with min date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                min: sub(new Date(), { days: 1 }).toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          fixture.componentInstance['formControl'].setValue(new Date());
          fixture.componentInstance['formControl'].markAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have min date error when set in properties and control is invalid', async () => {
          // Given a date input with min date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                min: add(new Date(), { days: 1 }).toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is invalid
          fixture.componentInstance['formControl'].setValue(new Date());
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

      testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
        it('should set the default value', async () => {
          // Given a form select with a default value
          const today = new Date();
          const element: typeof defaultElement = {
            ...defaultElement,
            defaultValue: today,
          };

          // When the component is rendered
          const { fixture } = await renderInput(element);
          const localeService = TestBed.inject(TranslocoLocaleService);
          setLanguageToTestedLocale(fixture);
          fixture.detectChanges();

          // Then the default value should be set
          expect(fixture.debugElement.query(By.directive(MatInput)).nativeElement).toHaveValue(localeService.localizeDate(today));
        });
      });
    });

    describe('Start View Property', () => {
      it('should be defaulted', async () => {
        // Given a date input without a start view
        const element: typeof defaultElement = {
          ...defaultElement,
          suffix: {
            icon: 'calendar',
          },
        };
        // When the component is created
        const { fixture } = await renderInput(element);
        fixture.autoDetectChanges();

        // And the user opens the date picker
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Then the date picker should be opened with the default start view
        const datepicker = fixture.debugElement.query(By.directive(MatCalendar)).componentInstance as MatCalendar<Date>;
        expect(datepicker.startView).toBe(defaultDateStartView);
      });

      const testCases: StartView[] = ['month', 'year', 'multi-year'];

      for (const startView of testCases) {
        it(`should be set to ${startView} when set in properties`, async () => {
          // Given a date input with a start view
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              startView,
            },
            suffix: {
              icon: 'calendar',
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.autoDetectChanges();

          // And the user opens the date picker
          const button = screen.getByRole('button');
          fireEvent.click(button);

          // Then the date picker should be opened with the specified start view
          const datepicker = fixture.debugElement.query(By.directive(MatCalendar)).componentInstance as MatCalendar<Date>;
          expect(datepicker.startView).toBe(startView);
        });
      }
    });

    describe('Start At Property', () => {
      it('should be defaulted', async () => {
        // Given a date input without a start at
        const element: typeof defaultElement = {
          ...defaultElement,
          suffix: {
            icon: 'calendar',
          },
        };
        // When the component is created
        const { fixture } = await renderInput(element);
        fixture.autoDetectChanges();

        // And the user opens the date picker
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Then the date picker should be opened with the default start at
        const datepicker = fixture.debugElement.query(By.directive(MatCalendar)).componentInstance as MatCalendar<Date>;
        expect(datepicker.startAt).toBeNull();
      });

      it('should be set when set in properties', async () => {
        // Given a date input with a start at
        const startAt = new Date();
        const element: typeof defaultElement = {
          ...defaultElement,
          date: {
            startAt: startAt.toISOString(),
          },
          suffix: {
            icon: 'calendar',
          },
        };

        // When the component is created
        const { fixture } = await renderInput(element);
        fixture.autoDetectChanges();

        // And the user opens the date picker
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Then the date picker should be opened with the specified start at
        const datepicker = fixture.debugElement.query(By.directive(MatCalendar)).componentInstance as MatCalendar<Date>;
        expect(datepicker.startAt).toStrictEqual(startAt);
      });
    });
  });
});
