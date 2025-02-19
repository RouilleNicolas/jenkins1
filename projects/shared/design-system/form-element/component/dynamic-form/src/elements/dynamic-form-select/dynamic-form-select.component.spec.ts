import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatOptgroup, MatOption, MatSelect } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { screen } from '@testing-library/angular';
import { fireEvent } from '@testing-library/dom';
import {
  generateDisabledTests,
  generateFormFieldAppearanceTests,
  generateFormFieldClearableTests,
  generateFormFieldFloatLabelTests,
  generateFormFieldLabelTests,
  generateFormFieldPlaceholderTests,
  generateFormValidationTests,
} from '../../testing';
import { DynamicFormSelectComponent } from './dynamic-form-select.component';
import { FormItemSelect } from './form-item-select.interface';

const defaultElement: FormItemSelect = {
  type: 'select',
  position: { x: 0, y: 0 },
  label: 'dynamic-forms.select.hand-writing.label',
  options: {
    items: {
      left: {
        label: 'dynamic-forms.select.hand-writing.options.left',
        value: 'left',
      },
      right: {
        label: 'dynamic-forms.select.hand-writing.options.right',
        value: 'right',
      },
    },
  },
};

const renderSelect = (element = defaultElement) => renderElement(DynamicFormSelectComponent, { inputs: { element } });

describe('DynamicFormSelectComponent', () => {
  describe('Behavior', () => {
    generateDisabledTests(defaultElement, DynamicFormSelectComponent, (fixture) =>
      fixture.debugElement.queryAll(By.css('mat-option')).map((el) => el.nativeElement),
    );
    generateFormValidationTests(defaultElement, DynamicFormSelectComponent, 'invalid');
    generateFormFieldAppearanceTests(defaultElement, DynamicFormSelectComponent);
    generateFormFieldFloatLabelTests(defaultElement, DynamicFormSelectComponent);
    generateFormFieldLabelTests(defaultElement, DynamicFormSelectComponent);
    generateFormFieldPlaceholderTests(defaultElement, DynamicFormSelectComponent, MatSelect);
    generateFormFieldClearableTests(defaultElement, DynamicFormSelectComponent);

    describe('Content', () => {
      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display the options', async () => {
          // Given a form select with options
          // When the component is rendered
          const { fixture } = await renderSelect();
          setLanguageToTestedLocale(fixture);

          // And the user opened
          clickOnSelect(translations['dynamic-forms'].select['hand-writing'].label);
          fixture.detectChanges();

          // Then the options should be displayed
          const options = fixture.debugElement.queryAll(By.directive(MatOption));
          expect(options.length).toBe(2);

          for (const option of options) {
            expect(option.nativeElement).toBeVisible();
          }

          expect(options[0].nativeElement).toHaveTextContent(translations['dynamic-forms'].select['hand-writing'].options.left);
          expect(options[1].nativeElement).toHaveTextContent(translations['dynamic-forms'].select['hand-writing'].options.right);
        });
      });
    });

    describe('Default value', () => {
      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should select the option with the default value prop set', async () => {
          // Given a form select with a default value
          const element: typeof defaultElement = {
            ...defaultElement,
            options: {
              ...defaultElement.options,
              items: {
                ...defaultElement.options.items,
                right: {
                  ...(defaultElement.options.items ?? {})['right'],
                  default: true,
                },
              },
            },
          };

          // When the component is rendered
          const { fixture } = await renderSelect(element);
          setLanguageToTestedLocale(fixture);
          fixture.detectChanges();

          // Then the select with the default value should be selected
          expect(fixture.debugElement.query(By.directive(MatSelect)).nativeElement).toHaveTextContent(
            translations['dynamic-forms'].select['hand-writing'].options.right,
          );
        });
      });

      it('should not select anything if the default value prop is not set in any options', async () => {
        // Given a form select without a default value
        // When the component is rendered
        const { fixture } = await renderSelect();

        // Then no option should be selected
        const element = fixture.debugElement.query(By.directive(MatSelect)).nativeElement;
        for (const item of Object.values(defaultElement.options.items ?? {})) {
          expect(element).not.toHaveTextContent(item.label);
        }
      });
    });

    describe('Groups', () => {
      const element: typeof defaultElement = {
        ...defaultElement,
        label: 'dynamic-forms.select.animals.label',
        options: {
          items: {
            cat: {
              label: 'dynamic-forms.select.animals.options.cat',
              value: 'cat',
              group: 'mammals',
            },
            dog: {
              label: 'dynamic-forms.select.animals.options.dog',
              value: 'dog',
              group: 'mammals',
            },
            bird: {
              label: 'dynamic-forms.select.animals.options.bird',
              value: 'bird',
              group: 'oviparous',
            },
            lizard: {
              label: 'dynamic-forms.select.animals.options.lizard',
              value: 'lizard',
              group: 'oviparous',
            },
          },
          groups: {
            mammals: { label: 'dynamic-forms.select.animals.groups.mammals' },
            oviparous: { label: 'dynamic-forms.select.animals.groups.oviparous' },
          },
        },
      };

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should group the options if the element has groups', async () => {
          // Given a form select with groups
          // When the component is rendered
          const { fixture } = await renderSelect(element);
          setLanguageToTestedLocale(fixture);

          // And the user opened
          clickOnSelect(translations['dynamic-forms'].select.animals.label);
          fixture.detectChanges();

          // Then the groups should be displayed
          const groups = fixture.debugElement.queryAll(By.directive(MatOptgroup));
          expect(groups.length).toBe(2);

          for (const group of groups) {
            expect(group.nativeElement).toBeVisible();
          }

          // Then the groups should contain the correct options
          expect(groups[0].nativeElement).toHaveTextContent(translations['dynamic-forms'].select.animals.groups.mammals);
          expect(groups[0].nativeElement).toHaveTextContent(translations['dynamic-forms'].select.animals.options.cat);
          expect(groups[0].nativeElement).toHaveTextContent(translations['dynamic-forms'].select.animals.options.dog);
          expect(groups[0].nativeElement).not.toHaveTextContent(translations['dynamic-forms'].select.animals.groups.oviparous);
          expect(groups[0].nativeElement).not.toHaveTextContent(translations['dynamic-forms'].select.animals.options.bird);
          expect(groups[0].nativeElement).not.toHaveTextContent(translations['dynamic-forms'].select.animals.options.lizard);

          expect(groups[1].nativeElement).toHaveTextContent(translations['dynamic-forms'].select.animals.groups.oviparous);
          expect(groups[1].nativeElement).toHaveTextContent(translations['dynamic-forms'].select.animals.options.bird);
          expect(groups[1].nativeElement).toHaveTextContent(translations['dynamic-forms'].select.animals.options.lizard);
          expect(groups[1].nativeElement).not.toHaveTextContent(translations['dynamic-forms'].select.animals.groups.mammals);
          expect(groups[1].nativeElement).not.toHaveTextContent(translations['dynamic-forms'].select.animals.options.cat);
          expect(groups[1].nativeElement).not.toHaveTextContent(translations['dynamic-forms'].select.animals.options.dog);
        });
      });

      it('should disable a whole group if the group is disabled', async () => {
        // Given a form select with a disabled group
        const elementWithDisabledGroup: typeof element = {
          ...element,
          options: {
            ...element.options,
            groups: {
              ...element.options.groups,
              mammals: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...element.options.groups!['mammals'],
                disabled: true,
              },
            },
          },
        };

        // When the component is rendered
        const { fixture } = await renderSelect(elementWithDisabledGroup);

        // And the user opened
        clickOnSelect('Animals');

        const groups = fixture.debugElement.queryAll(By.directive(MatOptgroup));

        // Then the disabled group and it's options should be disabled
        const mammalsGroup = groups[0];
        const groupInstance = mammalsGroup.componentInstance as MatOptgroup;
        expect(groupInstance.disabled).toBe(true);
        for (const option of mammalsGroup.queryAll(By.directive(MatOption))) {
          expect((option.componentInstance as MatOption).disabled).toBe(true);
        }

        // And the other group should not be disabled
        const oviparousGroup = groups[1];
        const oviparousGroupInstance = oviparousGroup.componentInstance as MatOptgroup;
        expect(oviparousGroupInstance.disabled).toBe(false);
        for (const option of oviparousGroup.queryAll(By.directive(MatOption))) {
          expect((option.componentInstance as MatOption).disabled).toBe(false);
        }
      });
    });

    describe('Hide Single Selection Indicator', () => {
      it('should be defaulted', async () => {
        // Given a form select with no hideSingleSelectionIndicator prop
        // When the component is rendered
        const { fixture } = await renderSelect();

        // Then the hideSingleSelectionIndicator should be false
        const component = fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
        expect(component.hideSingleSelectionIndicator).toBe(false);
      });

      it('should be set to true if prop is true', async () => {
        // Given a form select with hideSingleSelectionIndicator set to true
        const element: typeof defaultElement = {
          ...defaultElement,
          hideSingleSelectionIndicator: true,
        };

        // When the component is rendered
        const { fixture } = await renderSelect(element);

        // Then the hideSingleSelectionIndicator should be true
        const component = fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
        expect(component.hideSingleSelectionIndicator).toBe(true);
      });

      it('should be set to false if prop is false', async () => {
        // Given a form select with hideSingleSelectionIndicator set to false
        const element: typeof defaultElement = {
          ...defaultElement,
          hideSingleSelectionIndicator: false,
        };

        // When the component is rendered
        const { fixture } = await renderSelect(element);

        // Then the hideSingleSelectionIndicator should be false
        const component = fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
        expect(component.hideSingleSelectionIndicator).toBe(false);
      });
    });

    describe('Multiple', () => {
      it('should not be multiple by default', async () => {
        // Given a form select with no multiple prop
        // When the component is rendered
        const { fixture } = await renderSelect();

        // Then the select should not be multiple
        const component = fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
        expect(component.multiple).toBe(false);
      });

      testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
        it('should display multiple elements when selected if multiple is true', async () => {
          // Given a form select with multiple set to true and multiple options selected
          const element: typeof defaultElement = {
            ...defaultElement,
            multiple: true,
          };

          // When the component is rendered
          const { fixture } = await renderSelect(element);
          setLanguageToTestedLocale(fixture);
          fixture.detectChanges();

          // And the user opened the select
          clickOnSelect(translations['dynamic-forms'].select['hand-writing'].label);

          // And the user select the options
          const options = fixture.debugElement.queryAll(By.directive(MatOption));
          for (const option of options) {
            fireEvent.click(option.nativeElement);
          }

          // Then the select should contains the selected options
          const expectedTextContent = [
            translations['dynamic-forms'].select['hand-writing'].options.left,
            translations['dynamic-forms'].select['hand-writing'].options.right,
          ].join(', ');
          expect(fixture.debugElement.query(By.directive(MatSelect)).nativeElement).toHaveTextContent(expectedTextContent);
        });
      });

      describe('Chip appearance', () => {
        it('should not be chip appearance if multiple and multipleChip props are not set', async () => {
          // Given a form select with no multiple and multipleChip props
          // When the component is rendered
          const { fixture } = await renderSelect();

          // When the user opened the select
          clickOnSelect('Hand writing');

          // And the user select an option
          fireEvent.click(screen.getByText('Left'));

          // Then the select should not have the chip appearance
          const chip = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip));
          expect(chip).toBeNull();
        });

        it('should not be chip appearance if multiple and multipleChip props are set to false', async () => {
          // Given a form select with multiple and multipleChip set to false
          const element: typeof defaultElement = {
            ...defaultElement,
            multiple: true,
            multipleChip: false,
          };

          // When the component is rendered
          const { fixture } = await renderSelect(element);

          // When the user opened the select
          clickOnSelect('Hand writing');

          // And the user select an option
          fireEvent.click(screen.getByText('Left'));

          // Then the select should not have the chip appearance
          const chip = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip));
          expect(chip).toBeNull();
        });

        it('should not be chip appearance if multiple is false', async () => {
          // Given a form select with multiple set to false
          const element: typeof defaultElement = {
            ...defaultElement,
            multiple: false,
            multipleChip: true,
          };

          // When the component is rendered
          const { fixture } = await renderSelect(element);

          // When the user opened the select
          clickOnSelect('Hand writing');

          // And the user select an option
          fireEvent.click(screen.getByText('Left'));

          // Then the select should not have the chip appearance
          const chip = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip));
          expect(chip).toBeNull();
        });

        describe('Highlight appearance', () => {
          test('should highligh the chip if the field appearance is outline', async () => {
            // Given a form select with multiple and multipleChip set to true and the field appearance set to outline
            const element: typeof defaultElement = {
              ...defaultElement,
              field: {
                ...defaultElement.field,
                appearance: 'outline',
              },
              multiple: true,
              multipleChip: true,
            };

            // When the component is rendered
            const { fixture } = await renderSelect(element);

            // When the user opened the select
            clickOnSelect('Hand writing');

            // And the user select an option
            fireEvent.click(screen.getByText('Left'));

            // Then the select should have the chip appearance
            const chipInstance = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip)).componentInstance as MatChip;
            expect(chipInstance.highlighted).toBe(true);
          });

          test('should not highligh the chip if the field appearance is not outline', async () => {
            // Given a form select with multiple and multipleChip set to true and the field appearance set to fill
            const element: typeof defaultElement = {
              ...defaultElement,
              field: {
                ...defaultElement.field,
                appearance: 'fill',
              },
              multiple: true,
              multipleChip: true,
            };

            // When the component is rendered
            const { fixture } = await renderSelect(element);

            // When the user opened the select
            clickOnSelect('Hand writing');

            // And the user select an option
            fireEvent.click(screen.getByText('Left'));

            // Then the select should have the chip appearance
            const chipInstance = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip)).componentInstance as MatChip;
            expect(chipInstance.highlighted).toBe(false);
          });
        });

        testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
          it('should be chip appearance if multiple and multipleChip props are set to true', async () => {
            // Given a form select with multiple and multipleChip set to true
            const element: typeof defaultElement = {
              ...defaultElement,
              multiple: true,
              multipleChip: true,
            };
            // When the component is rendered
            const { fixture } = await renderSelect(element);
            setLanguageToTestedLocale(fixture);
            fixture.detectChanges();

            // When the user opened the select
            clickOnSelect(translations['dynamic-forms'].select['hand-writing'].label);

            // And the user select an option
            fireEvent.click(screen.getByText(translations['dynamic-forms'].select['hand-writing'].options.left));

            // Then the select should have the chip appearance
            const chip = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip));
            expect(chip.nativeElement).toBeVisible();
            expect(chip.nativeElement).toHaveTextContent(translations['dynamic-forms'].select['hand-writing'].options.left);
          });
        });

        describe('Remove button', () => {
          test('should display a remove button on the chip', async () => {
            // Given a form select with multiple and multipleChip set to true
            const element: typeof defaultElement = {
              ...defaultElement,
              multiple: true,
              multipleChip: true,
            };
            // When the component is rendered
            const { fixture } = await renderSelect(element);
            fixture.detectChanges();

            // When the user opened the select
            clickOnSelect('Hand writing');

            // And the user select an option
            fireEvent.click(screen.getByText('Left'));
            fixture.detectChanges();

            // Then the select should have the chip appearance
            const icon = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatIcon));
            expect(icon.nativeElement).toBeVisible();
            expect(icon.nativeElement).toHaveTextContent('cancel');
          });

          test('should remove the chip when the user clicks on the remove button', async () => {
            // Given a form select with multiple and multipleChip set to true
            const element: typeof defaultElement = {
              ...defaultElement,
              multiple: true,
              multipleChip: true,
            };
            // When the component is rendered
            const { fixture } = await renderSelect(element);
            fixture.detectChanges();

            // When the user opened the select
            clickOnSelect('Hand writing');

            // And the user select an option
            fireEvent.click(screen.getByText('Left'));
            fixture.detectChanges();

            // And the user clicks on the remove button
            fireEvent.click(fixture.debugElement.query(By.directive(MatIcon)).nativeElement);
            fixture.detectChanges();

            // Then the chip should be removed
            const chip = fixture.debugElement.query(By.directive(MatSelect)).query(By.directive(MatChip));
            expect(chip).toBeNull();
          });
        });
      });
    });
  });
});

function clickOnSelect(label: string) {
  const select = screen.getByText(label);
  fireEvent.click(select);
}
