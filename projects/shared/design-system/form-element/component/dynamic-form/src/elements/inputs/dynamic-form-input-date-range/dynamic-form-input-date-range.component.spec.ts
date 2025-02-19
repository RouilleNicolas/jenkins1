import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { MatCalendar, MatEndDate, MatStartDate } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { fireEvent, screen } from '@testing-library/angular';
import { addDays, subDays } from 'date-fns';
import {
  generateDisabledTests,
  generateFormFieldAppearanceTests,
  generateFormFieldFloatLabelTests,
  generateFormFieldHintTests,
  generateFormFieldLabelTests,
  generateFormFieldPrefixTests,
  generateFormFieldSuffixTests,
} from '../../../testing';
import { DynamicFormErrorsComponent } from '../../dynamic-form-errors/dynamic-form-errors.component';
import { defaultDateStartView, StartView } from '../dynamic-form-input-date/form-item-input-date.interface';
import { DynamicFormInputDateRangeComponent } from './dynamic-form-input-date-range.component';
import { FormItemInputDateRange } from './form-item-input-date-range.interface';

const defaultElement: FormItemInputDateRange = {
  type: 'input',
  position: { x: 0, y: 0 },
  label: 'Date',
  date: {
    dateType: 'range',
  },
};

const renderInput = async (element = defaultElement) => renderElement(DynamicFormInputDateRangeComponent, { inputs: { element } });

describe('DynamicFormInputDateRangeComponent', () => {
  describe('Behavior', () => {
    const controlsTestsCases = [
      { name: 'Start Date', control: 'start' },
      { name: 'End Date', control: 'end' },
    ];

    generateFormFieldAppearanceTests(defaultElement, DynamicFormInputDateRangeComponent);
    generateFormFieldFloatLabelTests(defaultElement, DynamicFormInputDateRangeComponent);
    generateDisabledTests(defaultElement, DynamicFormInputDateRangeComponent, (fixture) => fixture.debugElement.query(By.css('input')).nativeElement);
    generateFormFieldLabelTests(defaultElement, DynamicFormInputDateRangeComponent);
    generateFormFieldPrefixTests(defaultElement, DynamicFormInputDateRangeComponent);
    generateFormFieldSuffixTests(defaultElement, DynamicFormInputDateRangeComponent);
    generateFormFieldHintTests(defaultElement, DynamicFormInputDateRangeComponent);

    describe('Control Validation', () => {
      // Skip Regex validation tests for now
      // Reason : the regex validation is not working as expected,
      // the displayed value IS formatted correctly but the validation is checking the raw value which is a Date object
      describe.skip('Regex', () => {
        it.todo('should not have validation when not set in properties');

        it.todo('should not have regex error when set in properties and control is valid');

        it.todo('should have regex error when set in properties and control is invalid');
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
                max: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have max date error when set in properties and start date control is invalid', async () => {
          // Given a date input with max date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                max: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the start date control is invalid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(addDays(new Date(), 1) as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });

        it('should have max date error when set in properties and end date control is invalid', async () => {
          // Given a date input with max date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                max: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the end date control is invalid
          const instance = fixture.componentInstance;
          // Disclaimer: this is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(addDays(new Date(), 1) as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });

        it('should have max date error when set in properties and both controls are invalid', async () => {
          // Given a date input with max date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                max: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And both controls are invalid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(addDays(new Date(), 1) as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(addDays(new Date(), 1) as any);
          instance['formGroup'].markAllAsTouched();
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
                min: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the input is valid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should not show any error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent))).toBeNull();
        });

        it('should have min date error when set in properties and start date control is invalid', async () => {
          // Given a date input with min date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                min: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the start date control is invalid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(subDays(new Date(), 1) as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });

        it('should have min date error when set in properties and end date control is invalid', async () => {
          // Given a date input with min date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                min: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And the end date control is invalid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(new Date() as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(subDays(new Date(), 1) as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });

        it('should have min date error when set in properties and both controls are invalid', async () => {
          // Given a date input with min date validation
          const element: typeof defaultElement = {
            ...defaultElement,
            date: {
              validation: {
                min: new Date().toISOString(),
              },
            },
          };

          // When the component is created
          const { fixture } = await renderInput(element);
          fixture.detectChanges();

          // And both controls are invalid
          const instance = fixture.componentInstance;
          // Disclaimer: This is a hack to set the value of the form control
          instance['formGroup'].get(instance['startDateControlName'])?.setValue(subDays(new Date(), 1) as any);
          instance['formGroup'].get(instance['endDateControlName'])?.setValue(subDays(new Date(), 1) as any);
          instance['formGroup'].markAllAsTouched();
          fixture.detectChanges();

          // Then the input should show an error
          expect(fixture.debugElement.query(By.directive(DynamicFormErrorsComponent)).nativeElement).toBeVisible();
        });
      });
    });

    describe('Required property', () => {
      describe('FormGroup', () => {
        it('should be false by default', async () => {
          // Given a form element
          // When the component is rendered
          const { fixture } = await renderInput();

          // Then the form element should not be required
          expect(fixture.componentInstance['formGroup'].hasValidator(Validators.required)).toBe(false);
        });

        it('should be true when property is set to true', async () => {
          // Given a form element
          const requiredFormElement = {
            ...defaultElement,
            field: { required: true },
          };
          // When the component is rendered
          const { fixture } = await renderInput(requiredFormElement);

          // Then the form element should be required
          expect(fixture.componentInstance['formGroup'].hasValidator(Validators.required)).toBe(true);
        });

        it('should be false when property is set to false', async () => {
          // Given a form element
          const optionalFormElement = {
            ...defaultElement,
            field: { required: false },
          };
          // When the component is rendered
          const { fixture } = await renderInput(optionalFormElement);

          // Then the form element should not be required
          expect(fixture.componentInstance['formGroup'].hasValidator(Validators.required)).toBe(false);
        });

        testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
          it('should not display if the form element has not been touched', async () => {
            // Given a form element
            const requiredFormElement = {
              ...defaultElement,
              field: { required: true },
            };
            // When the component is rendered
            const { fixture } = await renderInput(requiredFormElement);
            setLanguageToTestedLocale(fixture);

            // Then the form element should not display an error message
            expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
          });

          it('should display an error message when required', async () => {
            // Given a form element
            const requiredFormElement = {
              ...defaultElement,
              field: { required: true },
            };
            // When the component is rendered
            const { fixture } = await renderInput(requiredFormElement);
            setLanguageToTestedLocale(fixture);

            // And the form element is not checked
            fixture.componentInstance['formGroup'].markAllAsTouched();
            fixture.detectChanges();

            // Then the form element should display an error message
            const error = screen.getByText(translations.forms.validation.required);
            expect(error).toBeVisible();
          });

          it('should not display an error message when required and control has a value', async () => {
            // Given a form element
            const requiredFormElement = {
              ...defaultElement,
              field: { required: true },
            };
            // When the component is rendered
            const { fixture } = await renderInput(requiredFormElement);
            setLanguageToTestedLocale(fixture);

            // And the form element has a value
            const startDateKey = fixture.componentInstance['startDateControlName'];
            const endDateKey = fixture.componentInstance['endDateControlName'];
            fixture.componentInstance['formGroup'].setValue({
              [startDateKey]: new Date() as any,
              [endDateKey]: new Date() as any,
            });
            fixture.componentInstance['formGroup'].markAllAsTouched();
            fixture.detectChanges();

            // Then the form element should not display an error message
            expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
          });

          it('should not display an error message when not required', async () => {
            // Given a form element
            const optionalFormElement = {
              ...defaultElement,
              field: { required: false },
            };
            // When the component is rendered
            const { fixture } = await renderInput(optionalFormElement);
            setLanguageToTestedLocale(fixture);

            // And the form element is not checked
            fixture.componentInstance['formGroup'].markAllAsTouched();
            fixture.detectChanges();

            // Then the form element should not display an error message
            expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
          });

          it('should display a custom required message when the property is set', async () => {
            // Given a form element
            const requiredFormElement = {
              ...defaultElement,
              field: {
                required: true,
                errorRequiredMessage: 'dynamic-forms.customErrorRequiredMessage',
              },
            };
            // When the component is rendered
            const { fixture } = await renderInput(requiredFormElement);
            setLanguageToTestedLocale(fixture);

            fixture.componentInstance['formGroup'].markAllAsTouched();
            fixture.detectChanges();

            // Then the form element should display the custom required message
            expect(screen.getByText(translations['dynamic-forms'].customErrorRequiredMessage)).toBeVisible();
          });
        });
      });

      describe('Start Date Control', () => {
        for (const { name, control } of controlsTestsCases) {
          describe(`${name} Control`, () => {
            it('should be false by default', async () => {
              // Given a form element
              // When the component is rendered
              const { fixture } = await renderInput();

              // Then the form element should not be required
              expect(fixture.componentInstance['formGroup'].get(control)?.hasValidator(Validators.required)).toBe(false);
            });

            it('should be true when property is set to true', async () => {
              // Given a form element
              const requiredFormElement = {
                ...defaultElement,
                field: { required: true },
              };
              // When the component is rendered
              const { fixture } = await renderInput(requiredFormElement);

              // Then the form element should be required
              expect(fixture.componentInstance['formGroup'].get(control)?.hasValidator(Validators.required)).toBe(true);
            });

            it('should be false when property is set to false', async () => {
              // Given a form element
              const optionalFormElement = {
                ...defaultElement,
                field: { required: false },
              };
              // When the component is rendered
              const { fixture } = await renderInput(optionalFormElement);

              // Then the form element should not be required
              expect(fixture.componentInstance['formGroup'].get(control)?.hasValidator(Validators.required)).toBe(false);
            });

            testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
              it('should not display if the form element has not been touched', async () => {
                // Given a form element
                const requiredFormElement = {
                  ...defaultElement,
                  field: { required: true },
                };
                // When the component is rendered
                const { fixture } = await renderInput(requiredFormElement);
                setLanguageToTestedLocale(fixture);

                // Then the form element should not display an error message
                expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
              });

              it('should display an error message when required', async () => {
                // Given a form element
                const requiredFormElement = {
                  ...defaultElement,
                  field: { required: true },
                };
                // When the component is rendered
                const { fixture } = await renderInput(requiredFormElement);
                setLanguageToTestedLocale(fixture);

                // And the form element is not checked
                fixture.componentInstance['formGroup'].get(control)?.markAsTouched();
                fixture.detectChanges();

                // Then the form element should display an error message
                const error = screen.getByText(translations.forms.validation.required);
                expect(error).toBeVisible();
              });

              it('should not display an error message when required and control has a value', async () => {
                // Given a form element
                const requiredFormElement = {
                  ...defaultElement,
                  field: { required: true },
                };
                // When the component is rendered
                const { fixture } = await renderInput(requiredFormElement);
                setLanguageToTestedLocale(fixture);

                // And the form element has a value
                fixture.componentInstance['formGroup'].get(control)?.setValue(new Date() as any);
                fixture.componentInstance['formGroup'].get(control)?.markAsTouched();
                fixture.detectChanges();

                // Then the form element should not display an error message
                expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
              });

              it('should not display an error message when not required', async () => {
                // Given a form element
                const optionalFormElement = {
                  ...defaultElement,
                  field: { required: false },
                };
                // When the component is rendered
                const { fixture } = await renderInput(optionalFormElement);
                setLanguageToTestedLocale(fixture);

                // And the form element is not checked
                fixture.componentInstance['formGroup'].get(control)?.markAsTouched();
                fixture.detectChanges();

                // Then the form element should not display an error message
                expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
              });

              it('should display a custom required message when the property is set', async () => {
                // Given a form element
                const requiredFormElement = {
                  ...defaultElement,
                  field: {
                    required: true,
                    errorRequiredMessage: 'dynamic-forms.customErrorRequiredMessage',
                  },
                };
                // When the component is rendered
                const { fixture } = await renderInput(requiredFormElement);
                setLanguageToTestedLocale(fixture);

                fixture.componentInstance['formGroup'].get(control)?.markAsTouched();
                fixture.detectChanges();

                // Then the form element should display the custom required message
                expect(screen.getByText(translations['dynamic-forms'].customErrorRequiredMessage)).toBeVisible();
              });
            });
          });
        }
      });
    });

    describe('Content', () => {
      describe('Placeholder', () => {
        for (const { name, control } of controlsTestsCases) {
          describe(`${name} Control`, () => {
            const directive = control === 'start' ? MatStartDate : MatEndDate;

            it('should not display the placeholder if it is not provided', async () => {
              // Given a form select without a placeholder
              const element: typeof defaultElement = {
                ...defaultElement,
                label: 'dynamic-forms.genericLabel',
              };

              // When the component is rendered
              const { fixture } = await renderInput(element);

              const input = fixture.debugElement.query(By.directive(directive)).nativeElement;
              expect(input).toHaveAttribute('placeholder', '');
            });

            testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
              it('should display the placeholder', async () => {
                // Given a form select with a placeholder
                const element: typeof defaultElement = {
                  ...defaultElement,
                  date: {
                    range: {
                      startPlaceholder: 'dynamic-forms.date-range-picker.startPlaceholder',
                      endPlaceholder: 'dynamic-forms.date-range-picker.endPlaceholder',
                    },
                  },
                  label: 'dynamic-forms.genericLabel',
                };

                // When the component is rendered
                const { fixture } = await renderInput(element);
                setLanguageToTestedLocale(fixture);

                const input = fixture.debugElement.query(By.directive(directive)).nativeElement;
                const expectedPlaceholder = translations['dynamic-forms']['date-range-picker'][`${control}Placeholder`];
                expect(input).toHaveAttribute('placeholder', expectedPlaceholder);
              });
            });
          });
        }
      });

      describe('Default Value', () => {
        it('should not have a default value by default', async () => {
          // Given a form element
          // When the component is rendered
          const { fixture } = await renderInput();

          // Then the form element should not have a default value
          const startDateKey = fixture.componentInstance['startDateControlName'];
          const endDateKey = fixture.componentInstance['endDateControlName'];
          expect(fixture.componentInstance['formGroup'].value).toStrictEqual({
            [startDateKey]: null,
            [endDateKey]: null,
          });
        });

        testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
          it('should have a default value when both default values are set', async () => {
            // Given a form element with a default value
            const today = new Date();
            const element: typeof defaultElement = {
              ...defaultElement,
              defaultValue: {
                start: today.toISOString(),
                end: today.toISOString(),
              },
            };

            // When the component is rendered
            const { fixture } = await renderInput(element);
            const localeService = TestBed.inject(TranslocoLocaleService);
            setLanguageToTestedLocale(fixture);
            fixture.detectChanges();

            // Then the form element should have a default value
            const startDateInput = fixture.debugElement.query(By.directive(MatStartDate)).nativeElement;
            const endDateInput = fixture.debugElement.query(By.directive(MatEndDate)).nativeElement;
            expect(startDateInput).toHaveValue(localeService.localizeDate(today));
            expect(endDateInput).toHaveValue(localeService.localizeDate(today));
          });

          it('should set only the start date when only the start date default value is set', async () => {
            // Given a form element with a default value
            const today = new Date();
            const element: typeof defaultElement = {
              ...defaultElement,
              defaultValue: {
                start: today.toISOString(),
              },
            };

            // When the component is rendered
            const { fixture } = await renderInput(element);
            const localeService = TestBed.inject(TranslocoLocaleService);
            setLanguageToTestedLocale(fixture);
            fixture.detectChanges();

            // Then the form element should have a default value
            const startDateInput = fixture.debugElement.query(By.directive(MatStartDate)).nativeElement;
            const endDateInput = fixture.debugElement.query(By.directive(MatEndDate)).nativeElement;
            expect(startDateInput).toHaveValue(localeService.localizeDate(today));
            expect(endDateInput).toHaveValue('');
          });

          it('should set only the end date when only the end date default value is set', async () => {
            // Given a form element with a default value
            const today = new Date();
            const element: typeof defaultElement = {
              ...defaultElement,
              defaultValue: {
                end: today.toISOString(),
              },
            };

            // When the component is rendered
            const { fixture } = await renderInput(element);
            const localeService = TestBed.inject(TranslocoLocaleService);
            setLanguageToTestedLocale(fixture);
            fixture.detectChanges();

            // Then the form element should have a default value
            const startDateInput = fixture.debugElement.query(By.directive(MatStartDate)).nativeElement;
            const endDateInput = fixture.debugElement.query(By.directive(MatEndDate)).nativeElement;
            expect(startDateInput).toHaveValue('');
            expect(endDateInput).toHaveValue(localeService.localizeDate(today));
          });
        });
      });
    });

    describe('Clearable', () => {
      it('should not display by default', async () => {
        // Given a form element with no clearable prop
        // When the component is rendered
        const { fixture } = await renderInput();
        fixture.detectChanges();

        // Then no clear button should be displayed
        const clearButton = fixture.debugElement.query(By.directive(MatIcon));
        expect(clearButton).toBeNull();
      });

      it('should display a clear button if the element is clearable and the control has a value', async () => {
        // Given a form element that is clearable
        const element: typeof defaultElement = {
          ...defaultElement,
          clearable: true,
        };

        // When the component is rendered
        const { fixture } = await renderInput(element);
        fixture.detectChanges();

        // And the control has a value
        const startDateKey = fixture.componentInstance['startDateControlName'];
        const endDateKey = fixture.componentInstance['endDateControlName'];
        fixture.componentInstance['formGroup'].setValue({
          [startDateKey]: new Date() as any,
          [endDateKey]: new Date() as any,
        });
        fixture.detectChanges();

        // Then a clear button should be displayed
        const clearButton = fixture.debugElement.query(By.directive(MatIcon)).nativeElement;
        expect(clearButton).toBeVisible();
        expect(clearButton).toHaveTextContent('close');
      });

      it('should not display a clear button if the element is not clearable', async () => {
        // Given a form element that is not clearable
        const element: typeof defaultElement = {
          ...defaultElement,
          clearable: false,
        };

        // When the component is rendered
        const { fixture } = await renderInput(element);
        fixture.detectChanges();

        // Then a clear button should be displayed
        const clearButton = fixture.debugElement.query(By.directive(MatIcon));
        expect(clearButton).toBeNull();
      });

      it('should not display a clear button if the element is clearable and the control has no value', async () => {
        // Given a form element that is clearable
        const element: typeof defaultElement = {
          ...defaultElement,
          clearable: true,
        };

        // When the component is rendered
        const { fixture } = await renderInput(element);
        fixture.detectChanges();

        // And the control has no value
        const startDateKey = fixture.componentInstance['startDateControlName'];
        const endDateKey = fixture.componentInstance['endDateControlName'];
        fixture.componentInstance['formGroup'].setValue({
          [startDateKey]: null,
          [endDateKey]: null,
        });

        // Then no clear button should be displayed
        const clearButton = fixture.debugElement.query(By.directive(MatIcon));
        expect(clearButton).toBeNull();
      });

      it('should clear the value when the clear button is clicked', async () => {
        // Given a form element that is clearable
        const element: typeof defaultElement = {
          ...defaultElement,
          clearable: true,
        };

        // When the component is rendered
        const { fixture } = await renderInput(element);
        fixture.detectChanges();

        // And the control has a value
        const startDateKey = fixture.componentInstance['startDateControlName'];
        const endDateKey = fixture.componentInstance['endDateControlName'];
        fixture.componentInstance['formGroup'].setValue({
          [startDateKey]: new Date() as any,
          [endDateKey]: new Date() as any,
        });
        fixture.detectChanges();

        // And the clear button is clicked
        const clearButton = fixture.debugElement.query(By.directive(MatIcon)).nativeElement;
        fireEvent.click(clearButton);
        fixture.detectChanges();

        // Then the control should be cleared
        expect(fixture.componentInstance['formGroup'].value).toStrictEqual({
          [startDateKey]: null,
          [endDateKey]: null,
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
