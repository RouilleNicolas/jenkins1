import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { ChangeOrderButtonComponent } from './change-order-button.component';

const renderComponent = () => renderElement(ChangeOrderButtonComponent, {});

describe('[Farming Suite - Animal Sheet] ChangeOrderButtonComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.componentInstance).toBeInstanceOf(ChangeOrderButtonComponent);
  });

  it('should have a visible button', async () => {
    const { getByRole } = await renderComponent();

    expect(getByRole('button')).toBeVisible();
  });

  it('should have a test id on the button', async () => {
    const { getByTestId } = await renderComponent();
    const testId = 'change-order';

    const button = getByTestId(testId);
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('data-cy', testId);
    expect(button).toHaveAttribute('robot-anchor', testId);
    expect(button).toHaveAttribute('data-testid', testId);
  });

  it('should have a visible icon', async () => {
    const { fixture } = await renderComponent();

    expect(fixture.debugElement.query(By.directive(MatIcon)).nativeElement).toBeVisible();
  });

  testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
    it('should have a visible translated text', async () => {
      const { fixture, getByText } = await renderComponent();

      setLanguageToTestedLocale(fixture);

      expect(getByText(translations.common['change-order'])).toBeVisible();
    });
  });
});
