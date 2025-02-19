import { Type } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ComponentInput } from '@testing-library/angular';
import { WithHint } from '../interfaces/elements/hint/with-hint.interface';

const renderFn = <T, TComponent>(component: Type<TComponent>, element: T) =>
  renderElement(component, { inputs: { element } as ComponentInput<TComponent> });

export function generateFormFieldHintTests<T extends WithHint, TComponent>(formElement: T, component: Type<TComponent>) {
  describe('Hint', () => {
    it('should not have a hint by default', async () => {
      // Given a form element
      const element: T = { ...formElement };
      delete element.hint;

      // When the component is created
      const { fixture } = await renderFn(component, formElement);
      fixture.detectChanges();

      // Then the form field should not have a hint
      expect(fixture.debugElement.query(By.directive(MatHint))).toBeNull();
    });

    describe('Align', () => {
      it('should be defaulted', async () => {
        // Given a form element with a hint
        const element: T = {
          ...formElement,
          hint: {
            content: 'dynamic-forms.genericHint',
          },
        };

        // When the component is created
        const { fixture } = await renderFn(component, element);

        // Then the form field should have a hint
        const hint = fixture.debugElement.query(By.directive(MatHint)).nativeElement;
        expect(hint).not.toHaveClass('mat-mdc-form-field-hint-end');
      });

      it('should be set to end when specified in the properties', async () => {
        // Given a form element with a hint
        const element: T = {
          ...formElement,
          hint: {
            content: 'dynamic-forms.genericHint',
            align: 'end',
          },
        };

        // When the component is created
        const { fixture } = await renderFn(component, element);

        // Then the form field should have a hint
        const hint = fixture.debugElement.query(By.directive(MatHint)).nativeElement;
        expect(hint).toHaveClass('mat-mdc-form-field-hint-end');
      });

      it('should be set to start when specified in the properties', async () => {
        // Given a form element with a hint
        const element: T = {
          ...formElement,
          hint: {
            content: 'dynamic-forms.genericHint',
            align: 'start',
          },
        };

        // When the component is created
        const { fixture } = await renderFn(component, element);
        fixture.detectChanges();

        // Then the form field should have a hint
        const hint = fixture.debugElement.query(By.directive(MatHint)).nativeElement;
        expect(hint).not.toHaveClass('mat-mdc-form-field-hint-end');
      });
    });

    testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
      it('should have a hint when set in properties', async () => {
        // Given a form element with a hint
        const element: T = {
          ...formElement,
          hint: {
            content: 'dynamic-forms.genericHint',
          },
        };

        // When the component is created
        const { fixture } = await renderFn(component, element);
        setLanguageToTestedLocale(fixture);

        // Then the form field should have a hint
        const hint = fixture.debugElement.query(By.directive(MatHint)).nativeElement;
        expect(hint).toBeVisible();
        expect(hint).toHaveTextContent(translations['dynamic-forms'].genericHint);
      });
    });
  });
}
