import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatCheckbox } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { testForAvailableLanguages } from '@cooperl/i18n/testing';
import { aliasedInput, ComponentInput, fireEvent, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { CheckboxGroupDatum } from './checkbox-group-datum.interface';
import { CheckboxGroupComponent } from './checkbox-group.component';

const defaultData: string[] = ['datum1', 'datum2', 'datum3'];
const defaultInputs: ComponentInput<CheckboxGroupComponent<unknown>> = {
  data: defaultData,
  ...aliasedInput('testId', 'header-nav-item'),
};

const renderCheckboxGroup = (inputs = defaultInputs) => renderElement(CheckboxGroupComponent, { inputs });

describe('CheckboxGroupComponent', () => {
  describe('Unit tests', () => {
    it('should transform the data input to an array of CheckboxGroupDatum', async () => {
      // Given an array of datum
      // When the component is rendered with the data
      const { fixture } = await renderCheckboxGroup();

      // Then the data should be transformed to an array of CheckboxGroupDatum
      const component = fixture.componentInstance;
      expect(component.data()).toStrictEqual([
        { id: '0', value: 'datum1', label: 'datum1' },
        { id: '1', value: 'datum2', label: 'datum2' },
        { id: '2', value: 'datum3', label: 'datum3' },
      ]);
    });
  });

  describe('Behavior tests', () => {
    const defaultInputsWithMasterCheckbox = { ...defaultInputs, withMasterCheckbox: true };
    const getMasterCheckbox = (fixture: ComponentFixture<CheckboxGroupComponent<unknown>>): DebugElement =>
      fixture.debugElement.query(By.css('.master-checkbox'));
    const getMasterCheckboxInstance = (fixture: ComponentFixture<CheckboxGroupComponent<unknown>>): MatCheckbox =>
      getMasterCheckbox(fixture).componentInstance;

    describe('Orientation', () => {
      it('should have the horizontal orientation by default', async () => {
        // Given the component is rendered
        const { fixture } = await renderCheckboxGroup();
        fixture.detectChanges();

        // Then the container should have the horizontal orientation
        expect(fixture.nativeElement).toHaveClass('horizontal-orientation');
      });

      it('should have the vertical orientation if set to vertical', async () => {
        // Given the component is rendered with the vertical orientation
        const { fixture } = await renderCheckboxGroup({ ...defaultInputs, orientation: 'vertical' });
        fixture.detectChanges();

        // Then the container should have the vertical orientation
        expect(fixture.nativeElement).toHaveClass('vertical-orientation');
      });

      it('should have the horizontal orientation if set to horizontal', async () => {
        // Given the component is rendered with the horizontal orientation
        const { fixture } = await renderCheckboxGroup({ ...defaultInputs, orientation: 'horizontal' });
        fixture.detectChanges();

        // Then the container should have the horizontal orientation
        expect(fixture.nativeElement).toHaveClass('horizontal-orientation');
      });
    });

    describe('Master checkbox', () => {
      describe('Display', () => {
        it('should not be present by default', async () => {
          // Given the component is rendered
          const { fixture } = await renderCheckboxGroup();

          // Then the master checkbox should not be present
          expect(getMasterCheckbox(fixture)).toBeNull();
        });

        it('should not be present if withMasterCheckbox is false', async () => {
          // Given the component is rendered with withMasterCheckbox set to false
          const { fixture } = await renderCheckboxGroup({ ...defaultInputs, withMasterCheckbox: false });

          // Then the master checkbox should not be present
          expect(getMasterCheckbox(fixture)).toBeNull();
        });

        it('should be present if withMasterCheckbox is true', async () => {
          // Given the component is rendered with withMasterCheckbox set to true
          const { fixture } = await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // Then the master checkbox should be present
          expect(getMasterCheckbox(fixture).nativeElement).toBeVisible();
        });

        it('should have the masterCheckboxClasses classes', async () => {
          // Given the component is rendered with masterCheckboxClasses
          const { fixture } = await renderCheckboxGroup({ ...defaultInputsWithMasterCheckbox, masterCheckboxClasses: 'master-classes' });

          // Then the master checkbox should have the masterCheckboxClasses classes
          expect(getMasterCheckbox(fixture).nativeElement).toHaveClass('master-classes');
        });

        testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
          it('should have the translated masterCheckboxLabel as label', async () => {
            // Given the component is rendered with masterCheckboxLabel
            const { fixture } = await renderCheckboxGroup({ ...defaultInputsWithMasterCheckbox, masterCheckboxLabel: 'checkboxGroup.master.label' });
            setLanguageToTestedLocale(fixture);

            // Then the master checkbox should have the masterCheckboxLabel as label
            expect(getMasterCheckbox(fixture).nativeElement).toHaveTextContent(translations.checkboxGroup.master.label);
          });
        });
      });

      describe('Actions', () => {
        it('should check all child checkboxes when checked when unchecked', async () => {
          // Given the component is rendered
          await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // Ensure all checkboxes are unchecked
          const checkboxes = screen.getAllByRole('checkbox');
          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }

          // When the user checks the master checkbox
          fireEvent.click(checkboxes[0]);

          // Then all checkboxes should be checked
          for (const element of checkboxes) {
            expect(element).toBeChecked();
          }
        });

        it('should check all child checkboxes when checked when indeterminate', async () => {
          // Given the component is rendered
          const { fixture } = await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // Ensure all checkboxes are unchecked
          const checkboxes = screen.getAllByRole('checkbox');
          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }

          // When the user check a child checkbox
          fireEvent.click(checkboxes[1]);
          expect(checkboxes[1]).toBeChecked();

          // Ensure the master checkbox is indeterminate
          expect(checkboxes[0]).toHaveAttribute('aria-checked', 'mixed');
          expect(getMasterCheckboxInstance(fixture).indeterminate).toBe(true);

          // When the user checks the master checkbox
          fireEvent.click(checkboxes[0]);

          // Then all checkboxes should be checked
          for (const element of checkboxes) {
            expect(element).toBeChecked();
          }
        });

        it('should uncheck all child checkboxes when unchecked', async () => {
          // Given the component is rendered
          await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // Ensure all checkboxes are unchecked
          const checkboxes = screen.getAllByRole('checkbox');
          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }

          // When the user click the master checkbox
          fireEvent.click(checkboxes[0]);

          // Ensure all checkboxes are checked
          for (const element of checkboxes) {
            expect(element).toBeChecked();
          }

          // And the user unchecks the master checkbox
          fireEvent.click(checkboxes[0]);

          // Then all checkboxes should be unchecked
          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }
        });
      });
    });

    describe('Child checkboxes', () => {
      const getAllCheckboxesComponents = (fixture: ComponentFixture<CheckboxGroupComponent<unknown>>) =>
        fixture.debugElement.queryAll(By.directive(MatCheckbox));
      const getAllCheckboxesComponentsNativeElements = (fixture: ComponentFixture<CheckboxGroupComponent<unknown>>): HTMLElement[] =>
        getAllCheckboxesComponents(fixture).map((element) => element.nativeElement);

      describe('Display', () => {
        it('should have a container with the checkboxContainerClasses classes', async () => {
          // Given the component is rendered with checkboxContainerClasses
          await renderCheckboxGroup({ ...defaultInputs, checkboxContainerClasses: 'container-classes' });

          // Then the container should have the checkboxContainerClasses classes
          expect(screen.getByRole('group')).toHaveClass('container-classes');
        });

        it('should create a checkbox for each datum', async () => {
          // Given the component is rendered with data
          const { fixture } = await renderCheckboxGroup();

          // Then the component should have a checkbox for each datum
          const checkboxes = screen.getAllByRole('checkbox');
          expect(checkboxes).toHaveLength(defaultData.length);

          const checkboxComponents = getAllCheckboxesComponentsNativeElements(fixture);
          for (const element of checkboxComponents) {
            expect(element).toBeVisible();
          }
        });

        it('should have the checkboxesClasses classes for each checkbox', async () => {
          // Given the component is rendered with checkboxesClasses
          const { fixture } = await renderCheckboxGroup({ ...defaultInputs, checkboxesClasses: 'checkbox-classes' });

          // Then each checkbox should have the checkboxesClasses classes
          const checkboxComponents = getAllCheckboxesComponentsNativeElements(fixture);
          for (const element of checkboxComponents) {
            expect(element).toHaveClass('checkbox-classes');
          }
        });

        it('should add classes to the checkbox if datum has classes', async () => {
          // Given the component is rendered with data with classes
          const { fixture } = await renderCheckboxGroup({
            ...defaultInputs,
            data: defaultData.map<CheckboxGroupDatum<string>>((datum, index) => ({
              id: datum,
              value: datum,
              label: datum,
              classes: `datum-${index}`,
            })),
          });

          // Then each checkbox should have the datum classes
          const checkboxComponents = getAllCheckboxesComponentsNativeElements(fixture);
          for (const [index, element] of checkboxComponents.entries()) {
            expect(element).toHaveClass(`datum-${index}`);
          }
        });

        it('should have both checkboxClasses and datum classes if both are present', async () => {
          // Given the component is rendered with data with classes
          const { fixture } = await renderCheckboxGroup({
            ...defaultInputs,
            checkboxesClasses: 'checkbox-classes',
            data: defaultData.map<CheckboxGroupDatum<string>>((datum, index) => ({
              id: datum,
              value: datum,
              label: datum,
              classes: `datum-${index}`,
            })),
          });

          // Then each checkbox should have the datum classes
          const checkboxComponents = getAllCheckboxesComponentsNativeElements(fixture);
          for (const [index, element] of checkboxComponents.entries()) {
            expect(element).toHaveClass(`checkbox-classes`);
            expect(element).toHaveClass(`datum-${index}`);
          }
        });

        it('should be checked if datum is selected', async () => {
          // Given the component is rendered with data with a selected datum
          const checkedIndex = 1;
          await renderCheckboxGroup({
            ...defaultInputs,
            data: defaultData.map<CheckboxGroupDatum<string>>((datum, index) => ({
              id: datum,
              value: datum,
              label: datum,
              selected: index === checkedIndex,
            })),
          });

          // Then the second checkbox should be checked
          const checkboxes = screen.getAllByRole('checkbox');
          for (const element of checkboxes) {
            if (element === checkboxes[checkedIndex]) {
              expect(element).toBeChecked();
            } else {
              expect(element).not.toBeChecked();
            }
          }
        });

        it('should be unchecked if datum is not selected', async () => {
          // Given the component is rendered with data with a selected datum
          await renderCheckboxGroup();

          // Then all checkboxes should be unchecked
          const checkboxes = screen.getAllByRole('checkbox');
          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }
        });

        testForAvailableLanguages(({ setLanguageToTestedLocale, translations }) => {
          it('should have the datum label as label', async () => {
            // Given the component is rendered with data with a label
            const { fixture } = await renderCheckboxGroup({
              ...defaultInputs,
              data: defaultData.map<CheckboxGroupDatum<string>>((datum) => ({ id: datum, value: datum, label: 'checkboxGroup.child.label' })),
            });
            setLanguageToTestedLocale(fixture);

            // Then each checkbox should have the datum label as label
            const checkboxes = getAllCheckboxesComponentsNativeElements(fixture);
            for (const element of checkboxes) {
              expect(element).toHaveTextContent(translations.checkboxGroup.child.label);
            }
          });
        });
      });

      describe('Actions', () => {
        it('should check the checkbox when clicked when unchecked', async () => {
          // Given the component is rendered
          await renderCheckboxGroup();

          // When the user clicks a checkbox
          const checkboxes = screen.getAllByRole('checkbox');
          fireEvent.click(checkboxes[0]);

          // Then the checkbox should be checked
          expect(checkboxes[0]).toBeChecked();

          // And the other checkboxes should be unchecked
          for (const element of checkboxes.slice(1)) {
            expect(element).not.toBeChecked();
          }
        });

        it('should uncheck the checkbox when clicked when checked', async () => {
          // Given the component is rendered
          await renderCheckboxGroup();

          // When the user clicks a checkbox
          const checkboxes = screen.getAllByRole('checkbox');
          fireEvent.click(checkboxes[0]);
          expect(checkboxes[0]).toBeChecked();

          // And the user clicks the checkbox again
          fireEvent.click(checkboxes[0]);

          // Then the checkbox should be unchecked
          expect(checkboxes[0]).not.toBeChecked();
        });

        it('should check the master checkbox when all checkboxes are checked', async () => {
          // Given the component is rendered
          const { fixture } = await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // When the user checks all child checkboxes
          const checkboxes = screen.getAllByRole('checkbox');
          expect(checkboxes).toHaveLength((defaultInputsWithMasterCheckbox.data?.length ?? 0) + 1);

          for (const element of checkboxes) {
            // Avoid clicking the master checkbox
            if (element === checkboxes[0]) {
              continue;
            }

            fireEvent.click(element);
            expect(element).toBeChecked();
          }

          // Then the master checkbox should be checked
          expect(checkboxes[0]).toBeChecked();
          expect(getMasterCheckboxInstance(fixture).indeterminate).toBe(false);
        });

        it('should uncheck the master checkbox when all checkboxes are unchecked', async () => {
          // Given the component is rendered
          const { fixture } = await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // When the use checks all child checkboxes
          const checkboxes = screen.getAllByRole('checkbox');
          expect(checkboxes).toHaveLength((defaultInputsWithMasterCheckbox.data?.length ?? 0) + 1);

          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }

          // Then the master checkbox should not be checked
          expect(checkboxes[0]).not.toBeChecked();
          expect(getMasterCheckboxInstance(fixture).indeterminate).toBe(false);
        });

        it('should set the master checkbox to indeterminate when some checkboxes are checked', async () => {
          // Given the component is rendered
          const { fixture } = await renderCheckboxGroup(defaultInputsWithMasterCheckbox);

          // When the user checks a child checkbox
          const checkboxes = screen.getAllByRole('checkbox');
          expect(checkboxes).toHaveLength((defaultInputsWithMasterCheckbox.data?.length ?? 0) + 1);

          // Ensure all checkboxes are unchecked
          for (const element of checkboxes) {
            expect(element).not.toBeChecked();
          }

          fireEvent.click(checkboxes[1]);
          expect(checkboxes[1]).toBeChecked();

          // Then the master checkbox should be indeterminate
          expect(checkboxes[0]).toHaveAttribute('aria-checked', 'mixed');
          expect(getMasterCheckboxInstance(fixture).indeterminate).toBe(true);
        });
      });
    });
  });
});
