import { Type } from '@angular/core';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { screen } from '@testing-library/angular';
import { generateDisabledTests, generateTooltipTests } from '../../testing';
import { DynamicFormButtonComponent } from './dynamic-form-button.component';
import { FormItemButton } from './form-item-button.interface';

interface TestCase {
  style: FormItemButton['style'];
  expectedDirective: Type<MatButton | MatFabButton | MatIconButton | MatMiniFabButton>;
  directiveSelector: string;
  withIcon?: boolean;
  withLabel?: boolean;
}

const defaultButton: FormItemButton = {
  position: { x: 0, y: 0 },
  type: 'button',
  label: 'Button',
  icon: 'icon',
};

const renderButton = (element = defaultButton) => renderElement(DynamicFormButtonComponent, { inputs: { element } });

describe('DynamicFormButtonComponent', () => {
  describe('Behavior', () => {
    it('should contains one and only one button', async () => {
      await renderButton();

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    const testCases: TestCase[] = [
      { style: 'fab', expectedDirective: MatFabButton, directiveSelector: 'mat-fab', withIcon: true },
      { style: 'fab-extended', expectedDirective: MatFabButton, directiveSelector: 'mat-fab', withIcon: true, withLabel: true },
      { style: 'flat', expectedDirective: MatButton, directiveSelector: 'mat-flat-button', withLabel: true },
      { style: 'icon', expectedDirective: MatIconButton, directiveSelector: 'mat-icon-button', withIcon: true },
      { style: 'mini-fab', expectedDirective: MatMiniFabButton, directiveSelector: 'mat-mini-fab', withIcon: true },
      { style: 'raised', expectedDirective: MatButton, directiveSelector: 'mat-raised-button', withLabel: true },
      { style: 'stroked', expectedDirective: MatButton, directiveSelector: 'mat-stroked-button', withLabel: true },
      { style: undefined, expectedDirective: MatButton, directiveSelector: 'mat-button', withLabel: true },
    ];

    for (const testCase of testCases) {
      describe(`${testCase.style ?? 'default'} button`, () => {
        const formButton: FormItemButton = { ...defaultButton, style: testCase.style };

        generateDisabledTests(formButton, DynamicFormButtonComponent, () => screen.getByRole('button'));
        generateTooltipTests(formButton, DynamicFormButtonComponent, () => screen.getByRole('button'));

        describe('Directive', () => {
          it('should have the associated directive instance attached', async () => {
            // Given a form button
            // When the component is rendered
            const { fixture } = await renderButton(formButton);

            // Then the button should have the associated directive attached
            const button = fixture.debugElement.query(By.directive(testCase.expectedDirective));
            expect(button).toBeDefined();
          });

          it('should have the associated directive selector', async () => {
            // Given a form button
            // When the component is rendered
            await renderButton(formButton);

            // Then the button should have the associated directive selector
            const button = screen.getByRole('button');
            expect(button).toHaveAttribute(testCase.directiveSelector);
          });

          if (testCase.style === 'fab-extended') {
            it('should have the extended attribute', async () => {
              // Given a form button with the fab-extended style
              // When the component is rendered
              const { fixture } = await renderButton(formButton);

              // Then the button should have the extended attribute
              const button = fixture.debugElement.query(By.directive(testCase.expectedDirective));
              const buttonInstance = button.componentInstance;
              expect(buttonInstance.extended).toBe(true);
            });
          }
        });

        describe('Color property', () => {
          it('should have the primary color by default', async () => {
            // Given a form button
            // When the component is rendered
            const { fixture } = await renderButton(formButton);

            // Then the button should have the primary color by default
            const button = fixture.debugElement.query(By.directive(testCase.expectedDirective));
            const buttonInstance = button.componentInstance;
            expect(buttonInstance.color).toBe('primary');
          });

          it('should have the accent color when the color property is set to accent', async () => {
            // Given a form button with the color property set to accent
            const accentButton: FormItemButton = { ...formButton, color: 'accent' };

            // When the component is rendered
            const { fixture } = await renderButton(accentButton);

            // Then the button should have the accent color
            const button = fixture.debugElement.query(By.directive(testCase.expectedDirective));
            const buttonInstance = button.componentInstance;
            expect(buttonInstance.color).toBe('accent');
          });

          it('should have the warn color when the color property is set to warn', async () => {
            // Given a form button with the color property set to warn
            const warnButton: FormItemButton = { ...formButton, color: 'warn' };

            // When the component is rendered
            const { fixture } = await renderButton(warnButton);

            // Then the button should have the warn color
            const button = fixture.debugElement.query(By.directive(testCase.expectedDirective));
            const buttonInstance = button.componentInstance;
            expect(buttonInstance.color).toBe('warn');
          });

          it('should have the primary color when the color property is set to primary', async () => {
            // Given a form button with the color property set to primary
            const primaryButton: FormItemButton = { ...formButton, color: 'primary' };

            // When the component is rendered
            const { fixture } = await renderButton(primaryButton);

            // Then the button should have the primary color
            const button = fixture.debugElement.query(By.directive(testCase.expectedDirective));
            const buttonInstance = button.componentInstance;
            expect(buttonInstance.color).toBe('primary');
          });
        });

        describe('Content', () => {
          if (testCase.withLabel) {
            it('should contains text', async () => {
              // Given a form button
              // When the component is rendered
              await renderButton(formButton);

              // Then the button should contains the label
              const button = screen.getByRole('button');
              expect(button).toHaveTextContent('Button');
            });

            testForAvailableLanguages(({ translations, setLanguageToTestedLocale }) => {
              it('should contains a translated text', async () => {
                // Given a form button with a translation key label
                const translatedButton: FormItemButton = { ...formButton, label: 'dynamic-forms.button.label' };

                // When the component is rendered
                const { fixture } = await renderButton(translatedButton);

                // Then the button should contains the translated label
                setLanguageToTestedLocale(fixture);
                const button = screen.getByRole('button');
                expect(button).toHaveTextContent(translations['dynamic-forms'].button.label);
              });

              it('should contains a translation key if the translation is missing', async () => {
                // Given a form button with a translation key label
                const translatedButton: FormItemButton = { ...formButton, label: 'dynamic-forms.button.notTranslated' };

                // When the component is rendered
                const { fixture } = await renderButton(translatedButton);

                // Then the button should contains the translation key
                setLanguageToTestedLocale(fixture);
                const button = screen.getByRole('button');
                expect(button).toHaveTextContent('dynamic-forms.button.notTranslated');
              });
            });
          } else {
            it('should not contains text', async () => {
              // Given a form button
              // When the component is rendered
              await renderButton(formButton);

              // Then the button should contains the label
              const button = screen.getByRole('button');
              expect(button).not.toHaveTextContent('Button');
            });
          }

          if (testCase.withIcon) {
            it('should contains an icon', async () => {
              // Given a form button
              // When the component is rendered
              await renderButton(formButton);

              // Then the button should contains the icon
              const icon = screen.getByText('icon');
              expect(icon).toBeDefined();
            });
          } else {
            it('should not contains an icon', async () => {
              // Given a form button with no icon
              // When the component is rendered
              await renderButton(formButton);

              // Then the button should contains the icon
              expect(screen.queryByText('icon')).toBeNull();
            });
          }

          if (testCase.withLabel && testCase.withIcon) {
            it('should contains text and icon', async () => {
              // Given a form button
              // When the component is rendered
              await renderButton(formButton);

              // Then the button should contains the label and the icon
              const button = screen.getByRole('button');
              expect(button).toHaveTextContent('Button');
              const icon = screen.getByText('icon');
              expect(icon).toBeDefined();
            });
          }
        });
      });
    }
  });
});
