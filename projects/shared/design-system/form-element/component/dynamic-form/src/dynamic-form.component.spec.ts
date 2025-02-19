import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { fireEvent } from '@testing-library/dom';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormInputTextComponent } from './elements/inputs/dynamic-form-input-text/dynamic-form-input-text.component';
import { DynamicFormResponse } from './interfaces/dynamic-form-response.interface';

describe('DynamicFormComponent', () => {
  describe('Behavior', () => {
    describe('Form Elements', () => {
      const elements: DynamicFormResponse['items'] = {
        'input-1': {
          position: { x: 0, y: 0 },
          type: 'input',
        },
        'input-2': {
          position: { x: 1, y: 0 },
          type: 'input',
        },
        'input-3': {
          position: { x: 0, y: 2, size: { x: 2, y: 2 } },
          type: 'input',
        },
      };

      it('should render all form elements specified in the form definition', async () => {
        // Given the form is rendered
        const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements } });
        fixture.detectChanges();

        // Then all form elements should be rendered
        const gridList = fixture.debugElement.query(By.directive(MatGridList)).nativeElement;
        const formElements = fixture.debugElement.queryAll(By.directive(DynamicFormInputTextComponent));
        for (const element of formElements) {
          expect(gridList).toContainElement(element.nativeElement);
        }
      });

      it('should have column equals to the maximum y position of the form elements', async () => {
        // Given the form is rendered
        const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements } });
        fixture.detectChanges();

        // Then the form should have the correct number of columns
        const gridList = fixture.debugElement.query(By.directive(MatGridList)).componentInstance as MatGridList;
        expect(gridList.cols).toBe(2);
      });

      it("should set the colspan of the form elements to it's position.size.y value", async () => {
        // Given the form is rendered
        const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements } });
        fixture.autoDetectChanges();

        // Then the form elements should have the correct colspan
        const formElements = fixture.debugElement.queryAll(By.directive(MatGridTile));
        expect((formElements[0].componentInstance as MatGridTile).colspan).toBe(1);
        expect((formElements[1].componentInstance as MatGridTile).colspan).toBe(1);
        expect((formElements[2].componentInstance as MatGridTile).colspan).toBe(2);
      });

      it("should set the rowspan of the form elements to it's position.size.x value", async () => {
        // Given the form is rendered
        const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements } });
        fixture.detectChanges();

        // Then the form elements should have the correct rowspan
        const formElements = fixture.debugElement.queryAll(By.directive(MatGridTile));
        expect((formElements[0].componentInstance as MatGridTile).rowspan).toBe(1);
        expect((formElements[1].componentInstance as MatGridTile).rowspan).toBe(1);
        expect((formElements[2].componentInstance as MatGridTile).rowspan).toBe(2);
      });

      it('should render the form elements in the correct column and row', async () => {
        // Given the form is rendered
        const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements } });
        fixture.detectChanges();

        // Then the form elements should be rendered in the correct position
        const formElements = fixture.debugElement.queryAll(By.directive(DynamicFormInputTextComponent));
        // We can test sequentially because the form elements should be rendered in the order they are defined
        expect((formElements[0].componentInstance as DynamicFormInputTextComponent).element().position).toEqual({ x: 0, y: 0 });
        expect((formElements[1].componentInstance as DynamicFormInputTextComponent).element().position).toEqual({ x: 1, y: 0 });
        expect((formElements[2].componentInstance as DynamicFormInputTextComponent).element().position).toEqual({ x: 0, y: 2, size: { x: 2, y: 2 } });
      });
    });

    describe('Form Actions', () => {
      describe('Submit', () => {
        it('should submit the form data when the submit button is clicked', async () => {
          // Given the form is rendered
          const elements: DynamicFormResponse['items'] = {
            'input-1': {
              position: { x: 0, y: 0 },
              type: 'input',
            },
          };
          const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements } });
          const submitSpy = jest.spyOn(fixture.componentInstance.submitted, 'emit');
          fixture.detectChanges();

          // When the input has a value
          fixture.componentInstance['formGroup'].get('input-1')?.setValue('test' as never);
          fixture.detectChanges();

          // And the submit button is clicked
          const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
          fireEvent.click(submitButton.nativeElement);

          // Then the form should be submitted
          expect(submitSpy).toHaveBeenCalledWith({ 'input-1': 'test' });
        });

        it('should be disabled when the form is invalid', async () => {
          // Given the form is rendered
          const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements: {} } });

          // When the form is invalid
          fixture.componentInstance['formGroup'].setErrors({ invalid: true });
          fixture.detectChanges();

          // Then the submit button should be disabled
          expect(fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement).toBeDisabled();
        });

        testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
          it('should display the translated submit button text', async () => {
            // Given the form is rendered
            const { fixture } = await renderElement(DynamicFormComponent, { inputs: { elements: {} } });

            // When the language is set to the tested locale
            setLanguageToTestedLocale(fixture);

            // Then the submit button should display the translated text
            const expectedText = translations.forms.submit;
            expect(fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement).toHaveTextContent(expectedText);
          });
        });
      });
    });
  });
});
