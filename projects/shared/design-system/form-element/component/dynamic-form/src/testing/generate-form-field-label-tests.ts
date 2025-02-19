import { Type } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput, screen } from '@testing-library/angular';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldLabelTests<T extends { label?: string }, TComponent>(formElement: T, component: Type<TComponent>) {
  describe('Content', () => {
    describe('Label', () => {
      it('should not display the label if it is not provided', async () => {
        // Given a form element without a label
        const elementWithoutLabel: T = {
          ...formElement,
        };
        delete elementWithoutLabel.label;
        // When the component is rendered
        const { fixture } = await renderFn(component, elementWithoutLabel);

        // Then the label should not be displayed
        expect(fixture.debugElement.query(By.directive(MatLabel)).nativeElement).toHaveTextContent('');
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display the label', async () => {
          // Given a form element with a label
          const elementWithLabel: T = {
            ...formElement,
            label: 'dynamic-forms.genericLabel',
          };
          // When the component is rendered
          const { fixture } = await renderFn(component, elementWithLabel);
          setLanguageToTestedLocale(fixture);

          // Then the label should be displayed
          const translatedLabel = translations['dynamic-forms'].genericLabel;
          expect(screen.getByText(translatedLabel)).toBeVisible();
        });
      });
    });
  });
}
