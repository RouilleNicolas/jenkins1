import { Type } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput, fireEvent } from '@testing-library/angular';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldPlaceholderTests<T extends { placeholder?: string }, TComponent>(
  formElement: T,
  component: Type<TComponent>,
  componentContainingPlaceholder: Type<MatInput> | Type<MatSelect> = MatInput,
) {
  describe('Content', () => {
    describe('Placeholder', () => {
      it('should not display the placeholder if it is not provided', async () => {
        // Given a form select without a placeholder
        const element: T = {
          ...formElement,
          label: 'dynamic-forms.genericLabel',
        };

        // When the component is rendered
        const { fixture } = await renderFn(component, element);

        const input = fixture.debugElement.query(By.directive(componentContainingPlaceholder)).nativeElement;
        if (componentContainingPlaceholder === MatSelect) {
          // And the user enter the input
          fireEvent.focus(input);

          // Then the placeholder should not be displayed
          expect(input).toHaveTextContent('');
        } else {
          expect(input).not.toHaveAttribute('placeholder');
        }
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display the placeholder', async () => {
          // Given a form select with a placeholder
          const element: T = {
            ...formElement,
            label: 'dynamic-forms.genericLabel',
            placeholder: 'dynamic-forms.genericPlaceholder',
          };

          // When the component is rendered
          const { fixture } = await renderFn(component, element);
          setLanguageToTestedLocale(fixture);

          const input = fixture.debugElement.query(By.directive(componentContainingPlaceholder)).nativeElement;
          const expectedPlaceholder = translations['dynamic-forms'].genericPlaceholder;
          if (componentContainingPlaceholder === MatSelect) {
            // And the user enter the input
            fireEvent.focus(input);

            // Then the placeholder should be displayed
            expect(input).toHaveTextContent(expectedPlaceholder);
          } else {
            expect(input).toHaveAttribute('placeholder', expectedPlaceholder);
          }
        });
      });
    });
  });
}
