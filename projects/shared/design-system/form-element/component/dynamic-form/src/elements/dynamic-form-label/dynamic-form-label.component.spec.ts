import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { DynamicFormLabelComponent } from './dynamic-form-label.component';
import { FormItemLabel } from './form-item-label.interface';

const defaultLabel: FormItemLabel = {
  position: { x: 0, y: 0 },
  type: 'label',
  content: 'Label',
};

const renderLabel = (element = defaultLabel) => renderElement(DynamicFormLabelComponent, { inputs: { element } });

describe('DynamicFormLabelComponent', () => {
  testForAvailableLanguages(({ translations, setLanguageToTestedLocale }) => {
    it('should render the translated label', async () => {
      // Given a label with a translated key
      // When the component is rendered
      const { fixture } = await renderLabel({ ...defaultLabel, content: 'dynamic-forms.labels.foo' });

      // Then the label should display the translated content
      setLanguageToTestedLocale(fixture);
      const label = fixture.nativeElement;
      expect(label).toHaveTextContent(translations['dynamic-forms'].labels.foo);
    });

    it('should render the untranslated key when the translation is missing', async () => {
      // Given a label with a missing translation key
      // When the component is rendered
      const { fixture } = await renderLabel({ ...defaultLabel, content: 'dynamic-forms.labels.bar' });

      // Then the label should display the untranslated key
      setLanguageToTestedLocale(fixture);
      const label = fixture.nativeElement;
      expect(label).toHaveTextContent('dynamic-forms.labels.bar');
    });
  });
});
