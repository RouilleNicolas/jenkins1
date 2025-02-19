import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { LanguageService } from '@cooperl/i18n';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { ComponentInput, screen } from '@testing-library/angular';
import { DynamicFormErrorsComponent } from './dynamic-form-errors.component';

const renderComponent = (inputs: ComponentInput<DynamicFormErrorsComponent>) => renderElement(DynamicFormErrorsComponent, { inputs });

describe('DynamicFormErrorsComponent', () => {
  describe('Behavior', () => {
    describe('Default view', () => {
      testErrorDisplays();
    });

    describe('Simulating MatFormField error appearance', () => {
      it('should have specific css class when input is set', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: null,
        });

        // Then the component should have the specific css class
        expect(fixture.nativeElement).toHaveClass('simulate-form-field');
      });

      it('should not have specific css class when input is not set', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to false
        const { fixture } = await renderComponent({
          simulateMatFormField: false,
          errors: null,
        });

        // Then the component should not have the specific css class
        expect(fixture.nativeElement).not.toHaveClass('simulate-form-field');
      });

      it('should not have specific css class when input is set to false', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to false
        const { fixture } = await renderComponent({
          simulateMatFormField: false,
          errors: null,
        });

        // Then the component should not have the specific css class
        expect(fixture.nativeElement).not.toHaveClass('simulate-form-field');
      });

      it('should have a subscript wrapper', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: null,
        });

        // Then the component should have a subscript wrapper
        const subscriptWrapper = fixture.debugElement.query(By.css('div.mat-mdc-form-field-subscript-wrapper'));
        expect(subscriptWrapper.nativeElement).toBeVisible();
      });

      it('should not have an error wrapper when there are no errors', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true and no errors
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: null,
        });

        // Then the component should not have an error wrapper
        const errorWrapper = fixture.debugElement.query(By.css('div.mat-mdc-form-field-error-wrapper'));
        expect(errorWrapper).toBeNull();
      });

      it('should not have an error wrapper when there are errors and a custom display condition that returns false', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true, errors and a custom display condition that returns false
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: { required: true },
          displayCondition: false,
        });

        // Then the component should not have an error wrapper
        const errorWrapper = fixture.debugElement.query(By.css('div.mat-mdc-form-field-error-wrapper'));
        expect(errorWrapper).toBeNull();
      });

      it('should have an error wrapper when there are errors and no custom display condition', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true and errors
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: { required: true },
        });

        // Then the component should have an error wrapper
        const errorWrapper = fixture.debugElement.query(By.css('div.mat-mdc-form-field-error-wrapper'));
        expect(errorWrapper.nativeElement).toBeVisible();
      });

      it('should have an error wrapper when there are errors and a custom display condition that returns true', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true, errors and a custom display condition that returns true
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: { required: true },
          displayCondition: true,
        });

        // Then the component should have an error wrapper
        const errorWrapper = fixture.debugElement.query(By.css('div.mat-mdc-form-field-error-wrapper'));
        expect(errorWrapper.nativeElement).toBeVisible();
      });

      it('should not have a mat-error when there are no errors', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true and no errors
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: null,
        });

        // Then the component should not have a mat-error
        const matError = fixture.debugElement.query(By.css('mat-error'));
        expect(matError).toBeNull();
      });

      it('should not have a mat-error when there are errors and a custom display condition that returns false', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true, errors and a custom display condition that returns false
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: { required: true },
          displayCondition: false,
        });

        // Then the component should not have a mat-error
        const matError = fixture.debugElement.query(By.css('mat-error'));
        expect(matError).toBeNull();
      });

      it('should have a mat-error when there are errors and no custom display condition', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true and errors
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: { required: true },
        });

        // Then the component should have a mat-error
        const matError = fixture.debugElement.query(By.css('mat-error'));
        expect(matError.nativeElement).toBeVisible();
      });

      it('should have a mat-error when there are errors and a custom display condition that returns true', async () => {
        // Given a DynamicFormErrorsComponent with the simulateMatFormField set to true, errors and a custom display condition that returns true
        const { fixture } = await renderComponent({
          simulateMatFormField: true,
          errors: { required: true },
          displayCondition: true,
        });

        // Then the component should have a mat-error
        const matError = fixture.debugElement.query(By.css('mat-error'));
        expect(matError.nativeElement).toBeVisible();
      });

      testErrorDisplays();
    });
  });
});

function testErrorDisplays() {
  it('should display nothing when there are no errors', async () => {
    // Given a DynamicFormErrorsComponent with no errors
    const { fixture } = await renderComponent({
      errors: null,
    });

    // Then the component should not display anything
    expect(fixture.nativeElement).toBeEmptyDOMElement();
  });

  testForAvailableLanguages<DynamicFormErrorsComponent>(({ translations, setLanguageToTestedLocale: switchLanguage }) => {
    describe('Required error', () => {
      it('should display the required error when the control is required', async () => {
        // Given a DynamicFormErrorsComponent with a required error
        const { fixture } = await renderComponent({
          errors: { required: true },
        });

        switchLanguage(fixture);

        // Then the component should display the required error
        expect(screen.getByText(translations.forms.validation.required)).toBeVisible();
      });

      it('should display a custom required message when provided', async () => {
        // Given a DynamicFormErrorsComponent with a custom required message
        const { fixture } = await renderComponent({
          errors: { required: true },
          customRequiredMessage: 'forms.validation.customRequiredMessage',
        });

        switchLanguage(fixture);

        // Then the component should display the custom required message (not translated because we don't use any test translation files for now)
        expect(screen.getByText(translations.forms.validation.customRequiredMessage)).toBeVisible();
      });

      it('should display translation key when custom required message translation is not found', async () => {
        // Given a DynamicFormErrorsComponent with a custom required message
        await renderComponent({
          errors: { required: true },
          customRequiredMessage: 'forms.validation.notTranslated',
        });

        // Then the component should display the custom required message (not translated because we don't use any test translation files for now)
        expect(screen.getByText('forms.validation.notTranslated')).toBeVisible();
      });
    });

    describe('Pattern error', () => {
      it('should display the pattern error when the control has a pattern error', async () => {
        // Given a DynamicFormErrorsComponent with a pattern error
        const { fixture } = await renderComponent({
          errors: { pattern: true },
        });

        switchLanguage(fixture);

        // Then the component should display the pattern error
        expect(screen.getByText(translations.forms.validation.pattern)).toBeVisible();
      });

      it('should display a custom validation message when provided', async () => {
        // Given a DynamicFormErrorsComponent with a custom validation message
        const { fixture } = await renderComponent({
          errors: { pattern: true },
          customValidationMessage: 'forms.validation.customValidationMessage',
        });

        switchLanguage(fixture);

        // Then the component should display the custom validation message (not translated because we don't use any test translation files for now)
        expect(screen.getByText(translations.forms.validation.customValidationMessage)).toBeVisible();
      });

      it('should display translation key when custom validation message translation is not found', async () => {
        // Given a DynamicFormErrorsComponent with a custom validation message
        await renderComponent({
          errors: { pattern: true },
          customValidationMessage: 'forms.validation.notTranslated',
        });

        // Then the component should display the custom validation message (not translated because we don't use any test translation files for now)
        expect(screen.getByText('forms.validation.notTranslated')).toBeVisible();
      });
    });

    describe('Min Date error', () => {
      it('should display the min date error when the control has a min date error', async () => {
        // Given a DynamicFormErrorsComponent with a min date error
        const today = new Date();
        await renderComponent({
          errors: { minDate: { min: today } },
        });

        // Then the component should display the min date error
        const languageService = TestBed.inject(LanguageService);
        const localeService = TestBed.inject(TranslocoLocaleService);
        const translatedError = languageService.translate('forms.validation.minDate', { min: localeService.localizeDate(today) });
        expect(screen.getByText(translatedError)).toBeVisible();
      });
    });

    describe('Material Datepicker Min Date error', () => {
      it('should display the min date error when the control has a min date error', async () => {
        // Given a DynamicFormErrorsComponent with a min date error
        const today = new Date();
        await renderComponent({
          errors: { matDatepickerMin: { min: today } },
        });

        // Then the component should display the min date error
        const languageService = TestBed.inject(LanguageService);
        const localeService = TestBed.inject(TranslocoLocaleService);
        const translatedError = languageService.translate('forms.validation.minDate', { min: localeService.localizeDate(today) });
        expect(screen.getByText(translatedError)).toBeVisible();
      });
    });

    describe('Max Date error', () => {
      it('should display the max date error when the control has a max date error', async () => {
        // Given a DynamicFormErrorsComponent with a max date error
        const today = new Date();
        await renderComponent({
          errors: { maxDate: { max: today } },
        });

        // Then the component should display the max date error
        const languageService = TestBed.inject(LanguageService);
        const localeService = TestBed.inject(TranslocoLocaleService);
        const translatedError = languageService.translate('forms.validation.maxDate', { max: localeService.localizeDate(today) });
        expect(screen.getByText(translatedError)).toBeVisible();
      });
    });

    describe('Material Datepicker Max Date error', () => {
      it('should display the max date error when the control has a max date error', async () => {
        // Given a DynamicFormErrorsComponent with a max date error
        const today = new Date();
        await renderComponent({
          errors: { matDatepickerMax: { max: today } },
        });

        // Then the component should display the max date error
        const languageService = TestBed.inject(LanguageService);
        const localeService = TestBed.inject(TranslocoLocaleService);
        const translatedError = languageService.translate('forms.validation.maxDate', { max: localeService.localizeDate(today) });
        expect(screen.getByText(translatedError)).toBeVisible();
      });
    });

    describe('Default errors', () => {
      it('should display the error by its key', async () => {
        // Given a DynamicFormErrorsComponent with an unknown error
        await renderComponent({
          errors: { something: true },
        });

        // Then the component should display the error
        expect(screen.getByText('forms.validation.something')).toBeVisible();
      });

      it('should display the error and its value when the error is an object', async () => {
        // Given a DynamicFormErrorsComponent with a min error
        await renderComponent({
          errors: { min: { min: 5 } },
        });

        // Then the component should display the error and its value
        const languageService = TestBed.inject(LanguageService);
        const translatedError = languageService.translate('forms.validation.min', { min: 5 });
        expect(screen.getByText(translatedError)).toBeVisible();
      });
    });
  });
}
