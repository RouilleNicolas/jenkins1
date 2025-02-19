import { ComponentFixture } from '@angular/core/testing';
import { MatRadioButton } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { generateDisabledTests, generateFormValidationTests } from '../../testing';
import { DynamicFormRadioComponent } from './dynamic-form-radio.component';
import { defaultRadioLabelPosition, FormItemRadio } from './form-item-radio.interface';

const defaultElement: FormItemRadio = {
  label: 'Checkbox',
  position: { x: 0, y: 0 },
  type: 'radio',
  options: {
    items: {
      'item-1': { label: 'dynamic-forms.radio.items.item-1', value: 'option-1' },
      'item-2': { label: 'dynamic-forms.radio.items.item-2', value: 'option-2' },
    },
  },
};

const renderRadio = (element = defaultElement) => renderElement(DynamicFormRadioComponent, { inputs: { element } });

describe('DynamicFormRadioComponent', () => {
  describe('Behavior', () => {
    generateFormValidationTests(defaultElement, DynamicFormRadioComponent, 'always');
    generateDisabledTests(defaultElement, DynamicFormRadioComponent, (fixture) =>
      fixture.debugElement.queryAll(By.css('input[type="radio"]')).map((el) => el.nativeElement),
    );

    describe('Items content', () => {
      testForAvailableLanguages(({ translations, setLanguageToTestedLocale }) => {
        it('should display the translated items labels', async () => {
          // Given a form radio with translation keys as items labels
          // When the component is rendered
          const { fixture } = await renderRadio();

          // Then the radio should contains the translated items labels
          setLanguageToTestedLocale(fixture);
          for (const item of Object.keys(defaultElement.options.items ?? {})) {
            expect(getRadioItem(item, fixture).nativeElement).toHaveTextContent(translations['dynamic-forms'].radio.items[item]);
          }
        });

        it('should display the translation key as label if the translation is missing', async () => {
          // Given a form radio with an item missing translation
          const element: typeof defaultElement = {
            ...defaultElement,
            options: {
              items: {
                ...defaultElement.options.items,
                'item-3': { label: 'dynamic-forms.radio.items.item-3', value: 'option-3' },
              },
            },
          };

          // When the component is rendered
          const { fixture } = await renderRadio(element);

          // Then the radio with missing translation should display the translation key as label
          // And the other radio should display the translated items labels
          setLanguageToTestedLocale(fixture);

          if (!element.options.items) {
            throw new Error('No items found, aborting test');
          }

          for (const item of Object.keys(element.options.items ?? {})) {
            if (item === 'item-3') {
              expect(getRadioItem(item, fixture).nativeElement).toHaveTextContent(element.options.items[item].label);
            } else {
              expect(getRadioItem(item, fixture).nativeElement).toHaveTextContent(translations['dynamic-forms'].radio.items[item]);
            }
          }
        });
      });
    });

    describe('Default value', () => {
      it('should select the radio with the default value prop set', async () => {
        // Given a form radio with a default value
        const element: typeof defaultElement = {
          ...defaultElement,
          options: {
            ...defaultElement.options,
            items: {
              ...defaultElement.options.items,
              'item-3': { label: 'dynamic-forms.radio.items.item-3', value: 'option-3', default: true },
            },
          },
        };

        // When the component is rendered
        const { fixture } = await renderRadio(element);

        // Then the radio with the default value should be selected
        expect(getRadioItemInput('item-3', fixture).nativeElement).toBeChecked();
      });

      it('should not select any radio if the default value prop is not set', async () => {
        // Given a form radio without a default value
        // When the component is rendered
        const { fixture } = await renderRadio();

        // Then no radio should be selected
        for (const item of Object.keys(defaultElement.options.items ?? {})) {
          expect(getRadioItemInput(item, fixture).nativeElement).not.toBeChecked();
        }
      });
    });

    describe('Label Position', () => {
      it('should be defaulted when property is not defined', async () => {
        // Given a form radio
        // When the component is rendered
        const { fixture } = await renderRadio(defaultElement);

        // Then the label position should be defaulted to "after"
        const labelPositions = fixture.debugElement
          .queryAll(By.directive(MatRadioButton))
          .map((x) => (x.componentInstance as MatRadioButton).labelPosition);
        for (const labelPosition of labelPositions) {
          expect(labelPosition).toBe(defaultRadioLabelPosition);
        }
      });

      it('should be set to the value defined in the property', async () => {
        // Given a form radio with a label position
        const element: typeof defaultElement = {
          ...defaultElement,
          options: {
            ...defaultElement.options,
            items: {
              ...defaultElement.options.items,
              'item-3': { label: 'dynamic-forms.radio.items.item-3', value: 'option-3', labelPosition: 'before' },
              'item-4': { label: 'dynamic-forms.radio.items.item-4', value: 'option-4', labelPosition: 'after' },
            },
          },
        };

        // When the component is rendered
        const { fixture } = await renderRadio(element);

        // Then the label position should be set to the value defined in the property
        expect((getRadioItem('item-3', fixture).componentInstance as MatRadioButton).labelPosition).toBe('before');
        expect((getRadioItem('item-4', fixture).componentInstance as MatRadioButton).labelPosition).toBe('after');
      });
    });
  });
});

function getRadioItem(itemId: string, fixture: ComponentFixture<DynamicFormRadioComponent>) {
  return fixture.debugElement.query(By.css(`#${itemId}`));
}

function getRadioItemInput(itemId: string, fixture: ComponentFixture<DynamicFormRadioComponent>) {
  return getRadioItem(itemId, fixture).query(By.css('input'));
}
