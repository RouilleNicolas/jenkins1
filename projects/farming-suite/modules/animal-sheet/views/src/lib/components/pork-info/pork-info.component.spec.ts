import { TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { ComponentInput } from '@testing-library/angular';
import { PorkInfoComponent } from './pork-info.component';

const defaultInputs: ComponentInput<PorkInfoComponent> = {
  title: 'Title',
  content: 'Content',
};

const renderComponent = (inputs = defaultInputs) => renderElement(PorkInfoComponent, { inputs });

describe('[Farming Suite - Animal Sheet] PorkInfoComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderComponent();
    expect(fixture.componentInstance).toBeInstanceOf(PorkInfoComponent);
  });

  describe('Title', () => {
    it('should throw an error if title is not provided', async () => {
      await expect(renderComponent({ content: 'Content' })).rejects.toThrow('NG0950');
    });

    it('should render the title', async () => {
      const { getByText } = await renderComponent();
      expect(getByText('Title')).toBeVisible();
    });
  });

  describe('Content', () => {
    it('should throw an error if content is not provided', async () => {
      await expect(renderComponent({ title: 'Title' })).rejects.toThrow('NG0950');
    });

    it('should render the content', async () => {
      const { getByText } = await renderComponent();
      expect(getByText('Content')).toBeVisible();
    });

    describe('With Date', () => {
      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should render the date with the correct locale', async () => {
          const testedDate = new Date('2022-01-01');
          const { getByText, fixture } = await renderComponent({ ...defaultInputs, date: testedDate });
          const localeService = TestBed.inject(TranslocoLocaleService);

          setLanguageToTestedLocale(fixture);

          const expectedText = translations['farming-suite']['animal-sheet'].components['pork-info']['date-prefix'];
          const expectedDate = localeService.localizeDate(testedDate);
          const expectedDateText = `${expectedText} ${expectedDate}`;
          expect(getByText(expectedDateText)).toBeVisible();
        });
      });
    });

    describe('With Route', () => {
      it('should display an icon', async () => {
        const { fixture } = await renderComponent({ ...defaultInputs, route: '/route' });
        const icon = fixture.debugElement.query(By.directive(MatIcon));

        expect(icon.nativeElement).toBeVisible();
      });

      it('should have a specific host css class', async () => {
        const { fixture } = await renderComponent({ ...defaultInputs, route: '/route' });
        expect(fixture.nativeElement).toHaveClass('with-route');
      });
    });
  });
});
