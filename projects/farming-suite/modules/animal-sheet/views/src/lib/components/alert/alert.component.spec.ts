import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { Alert } from '@cooperl/farming-suite/animal-sheet/domain';
import { LanguageService } from '@cooperl/i18n';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { ComponentInput } from '@testing-library/angular';
import { AlertComponent } from './alert.component';

const today = new Date();
const defaultAlert: ComponentInput<AlertComponent> = {
  title: 'This is title',
  updateDate: today,
};

const renderAlert = (element = defaultAlert) => renderElement(AlertComponent, { inputs: element });

describe('[Farming Suite - Animal Sheet] AlertComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderAlert();
    expect(fixture.componentInstance).toBeInstanceOf(AlertComponent);
  });

  it('should throw an error if title is not provided', async () => {
    await expect(renderAlert({ updateDate: today } as Alert)).rejects.toThrow('NG0950');
  });

  it('should throw an error if updateDate and childrenAlerts are not provided', async () => {
    await expect(renderAlert({ title: 'Title' } as Alert)).rejects.toThrow('NG0950');
  });

  it('should not throw an error if updateDate is provided', async () => {
    const { fixture } = await renderAlert({ title: 'Title', updateDate: new Date() });
    expect(fixture.componentInstance).toBeInstanceOf(AlertComponent);
  });

  it('should not throw an error if childrenAlerts is provided with at least one alert', async () => {
    const { fixture } = await renderAlert({ title: 'Title', childrenAlerts: [{ title: '', updateDate: new Date() }] });
    expect(fixture.componentInstance).toBeInstanceOf(AlertComponent);
  });

  it('should display title', async () => {
    const { getByText } = await renderAlert();
    expect(getByText('This is title')).toBeVisible();
  });

  it('should display update date', async () => {
    const { fixture } = await renderAlert();
    expect(fixture.debugElement.query(By.css('.update-date')).nativeNode).toBeVisible();
  });

  it('should display children alerts', async () => {
    const { fixture } = await renderAlert({
      title: 'Title',
      childrenAlerts: [
        { title: 'Child 1', updateDate: new Date() },
        { title: 'Child 2', updateDate: new Date() },
      ],
    });

    expect(fixture.debugElement.queryAll(By.css('.child-alert')).length).toBe(2);
  });

  it('should hide icon if hideIcon is true', async () => {
    const { fixture } = await renderAlert({ ...defaultAlert, hideIcon: true });
    expect(fixture.debugElement.query(By.css('.alert-icon'))).toBeNull();
  });

  testForAvailableLanguages(({ setLanguageToTestedLocale }) => {
    it('should contains a translated text', async () => {
      const { fixture } = await renderAlert();
      setLanguageToTestedLocale(fixture);
      const translateService = TestBed.inject(LanguageService);
      const localeService = TestBed.inject(TranslocoLocaleService);
      const expectedText = translateService.translate('farming-suite.animal-sheet.components.alert.update-date', {
        'update-date': localeService.localizeDate(today),
      });
      expect(fixture.debugElement.query(By.css('.update-date')).nativeElement).toHaveTextContent(expectedText);
    });
  });
});
