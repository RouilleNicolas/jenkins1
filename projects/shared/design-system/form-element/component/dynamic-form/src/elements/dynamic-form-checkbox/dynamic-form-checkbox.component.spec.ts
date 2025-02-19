import { MatCheckbox } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { screen } from '@testing-library/dom';
import { generateControlRequiredTests, generateDisabledTests, generateFormValidationTests, generateTooltipTests } from '../../testing';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';
import { defaultCheckboxLabelPosition, FormItemCheckbox } from './form-item-checkbox.interface';

const defaultCheckbox: FormItemCheckbox = {
  label: 'Checkbox',
  position: { x: 0, y: 0 },
  type: 'checkbox',
};

const renderCheckbox = (element = defaultCheckbox) => renderElement(DynamicFormCheckboxComponent, { inputs: { element } });

describe('DynamicFormCheckboxComponent', () => {
  describe('Behavior', () => {
    generateDisabledTests(defaultCheckbox, DynamicFormCheckboxComponent, () => screen.getByRole('checkbox'));
    generateTooltipTests(
      defaultCheckbox,
      DynamicFormCheckboxComponent,
      (fixture) => fixture.debugElement.query(By.directive(MatCheckbox)).nativeElement,
    );
    generateControlRequiredTests(defaultCheckbox, DynamicFormCheckboxComponent, 'checkbox');
    generateFormValidationTests(defaultCheckbox, DynamicFormCheckboxComponent, 'always');

    describe('Content', () => {
      testForAvailableLanguages(({ translations, setLanguageToTestedLocale }) => {
        it('should display the translated label', async () => {
          // Given a form checkbox with a translation key as label
          // When the component is rendered
          const { fixture } = await renderCheckbox({ ...defaultCheckbox, label: 'dynamic-forms.checkbox.label' });

          // Then the checkbox should contains the translated label
          setLanguageToTestedLocale(fixture);
          const checkbox = screen.getByText(translations['dynamic-forms'].checkbox.label);
          expect(checkbox).toBeVisible();
        });

        it('should display the translation key when the translation is missing', async () => {
          // Given a form checkbox with a translation key as label
          // When the component is rendered
          const { fixture } = await renderCheckbox({ ...defaultCheckbox, label: 'dynamic-forms.checkbox.not-found' });

          // Then the checkbox should contains the translation key
          setLanguageToTestedLocale(fixture);
          const checkbox = screen.getByText('dynamic-forms.checkbox.not-found');
          expect(checkbox).toBeVisible();
        });
      });
    });

    describe('Label position', () => {
      it('should be defaulted when property is not defined', async () => {
        // Given a form checkbox
        // When the component is rendered
        const { fixture } = await renderCheckbox(defaultCheckbox);

        // Then the label position should be defaulted to "after"
        const checkbox: MatCheckbox = fixture.debugElement.query(By.directive(MatCheckbox)).componentInstance;
        expect(checkbox.labelPosition).toBe(defaultCheckboxLabelPosition);
      });

      it('should be after the checkbox when property is set to "after"', async () => {
        // Given a form checkbox
        // When the component is rendered
        const { fixture } = await renderCheckbox(defaultCheckbox);

        // Then the label position should be after the checkbox
        const formField = fixture.debugElement.query(By.css('.mdc-form-field')).nativeElement;
        expect(formField).not.toHaveClass('mdc-form-field--align-end');
      });

      it('should be before the checkbox when property is set to "before"', async () => {
        // Given a form checkbox
        // When the component is rendered
        const { fixture } = await renderCheckbox({ ...defaultCheckbox, labelPosition: 'before' });

        // Then the label position should be before the checkbox
        const formField = fixture.debugElement.query(By.css('.mdc-form-field')).nativeElement;
        expect(formField).toHaveClass('mdc-form-field--align-end');
      });
    });

    describe('Indeterminate property', () => {
      it('should be false by default', async () => {
        // Given a form checkbox
        // When the component is rendered
        const { fixture } = await renderCheckbox(defaultCheckbox);

        // Then the checkbox should not be indeterminate
        const checkbox: MatCheckbox = fixture.debugElement.query(By.directive(MatCheckbox)).componentInstance;
        expect(checkbox.indeterminate).toBe(false);
      });

      it('should be true when property is set to true', async () => {
        // Given a form checkbox
        // When the component is rendered
        const { fixture } = await renderCheckbox({ ...defaultCheckbox, indeterminate: true });

        // Then the checkbox should be indeterminate
        const checkbox: MatCheckbox = fixture.debugElement.query(By.directive(MatCheckbox)).componentInstance;
        expect(checkbox.indeterminate).toBe(true);
      });

      it('should be false when property is set to false', async () => {
        // Given a form checkbox
        // When the component is rendered
        const { fixture } = await renderCheckbox({ ...defaultCheckbox, indeterminate: false });

        // Then the checkbox should not be indeterminate
        const checkbox: MatCheckbox = fixture.debugElement.query(By.directive(MatCheckbox)).componentInstance;
        expect(checkbox.indeterminate).toBe(false);
      });
    });

    describe('Default value', () => {
      it('should be false by default', async () => {
        // Given a form checkbox
        // When the component is rendered
        await renderCheckbox(defaultCheckbox);

        // Then the checkbox should be unchecked
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
      });

      it('should be true when property is set to true', async () => {
        // Given a form checkbox
        // When the component is rendered
        await renderCheckbox({ ...defaultCheckbox, defaultValue: true });

        // Then the checkbox should be unchecked
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
      });

      it('should be false when property is set to false', async () => {
        // Given a form checkbox
        // When the component is rendered
        await renderCheckbox({ ...defaultCheckbox, defaultValue: false });

        // Then the checkbox should be unchecked
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
      });
    });
  });
});
