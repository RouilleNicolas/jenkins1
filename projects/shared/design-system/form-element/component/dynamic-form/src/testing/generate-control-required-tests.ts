import { Type } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput, fireEvent } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { FormItemType } from '../interfaces/elements/form-item.interface';

type FormField<TComponent> = Type<TComponent> & { formControl: FormControl };
const render = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateControlRequiredTests<T, TComponent>(formElement: T, component: Type<TComponent>, itemType: FormItemType) {
  const requiredValidator = itemType === 'checkbox' ? Validators.requiredTrue : Validators.required;

  describe('Required property', () => {
    it('should be false by default', async () => {
      // Given a form element
      // When the component is rendered
      const { fixture } = await render(component, formElement);

      // Then the form element should not be required
      expect((fixture.componentInstance as FormField<TComponent>)['formControl'].hasValidator(requiredValidator)).toBe(false);
    });

    it('should be true when property is set to true', async () => {
      // Given a form element
      const requiredFormElement = { ...formElement, field: { required: true } };
      // When the component is rendered
      const { fixture } = await render(component, requiredFormElement);

      // Then the form element should be required
      expect((fixture.componentInstance as FormField<TComponent>)['formControl'].hasValidator(requiredValidator)).toBe(true);
    });

    it('should be false when property is set to false', async () => {
      // Given a form element
      const optionalFormElement = { ...formElement, field: { required: false } };
      // When the component is rendered
      const { fixture } = await render(component, optionalFormElement);

      // Then the form element should not be required
      expect((fixture.componentInstance as FormField<TComponent>)['formControl'].hasValidator(requiredValidator)).toBe(false);
    });

    testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
      it('should not display if the form element has not been touched', async () => {
        // Given a form element
        const requiredFormElement = { ...formElement, field: { required: true } };
        // When the component is rendered
        const { fixture } = await render(component, requiredFormElement);
        setLanguageToTestedLocale(fixture);

        // Then the form element should not display an error message
        expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
      });

      it('should display an error message when required', async () => {
        // Given a form element
        const requiredFormElement = { ...formElement, field: { required: true } };
        // When the component is rendered
        const { fixture } = await render(component, requiredFormElement);
        setLanguageToTestedLocale(fixture);

        // And the form element is not touched
        const element = fixture.componentInstance as FormField<TComponent>;
        element['formControl'].markAsTouched();
        fixture.detectChanges();

        // Then the form element should display an error message
        const error = screen.getByText(translations.forms.validation.required);
        expect(error).toBeVisible();
      });

      it('should not display an error message when required and control has a value', async () => {
        // Given a form element
        const requiredFormElement = { ...formElement, field: { required: true } };
        // When the component is rendered
        const { fixture } = await render(component, requiredFormElement);
        setLanguageToTestedLocale(fixture);

        // And the form element has a value
        const element = fixture.componentInstance as FormField<TComponent>;
        element['formControl'].markAsTouched();
        fixture.detectChanges();

        switch (itemType) {
          case 'input':
            element['formControl'].setValue('test');
            break;
          case 'select':
            fireEvent.click(screen.getByRole('button'));
            fireEvent.click(screen.getByRole('option'));
            break;
          case 'radio':
            fireEvent.click(screen.getByRole('radio'));
            break;
          case 'checkbox':
            fireEvent.click(screen.getByRole('checkbox'));
            break;
        }
        fixture.detectChanges();

        // Then the form element should not display an error message
        expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
      });

      it('should not display an error message when not required', async () => {
        // Given a form element
        const optionalFormElement = { ...formElement, field: { required: false } };
        // When the component is rendered
        const { fixture } = await render(component, optionalFormElement);
        setLanguageToTestedLocale(fixture);

        // And the form element is not touched
        const element = fixture.componentInstance as FormField<TComponent>;
        element['formControl'].markAsTouched();
        fixture.detectChanges();

        // Then the form element should not display an error message
        expect(screen.queryByText(translations.forms.validation.required)).toBeNull();
      });

      it('should display a custom required message when the property is set', async () => {
        // Given a form element
        const requiredFormElement = { ...formElement, field: { required: true, errorRequiredMessage: 'dynamic-forms.customErrorRequiredMessage' } };
        // When the component is rendered
        const { fixture } = await render(component, requiredFormElement);
        setLanguageToTestedLocale(fixture);

        const element = fixture.componentInstance as FormField<TComponent>;
        element['formControl'].markAsTouched();
        fixture.detectChanges();

        // Then the form element should display the custom required message
        expect(screen.getByText(translations['dynamic-forms'].customErrorRequiredMessage)).toBeVisible();
      });
    });
  });
}
