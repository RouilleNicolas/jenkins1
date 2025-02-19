import { MatDivider } from '@angular/material/divider';
import { By } from '@angular/platform-browser';
import { renderElement } from '@cooperl/design-system/testing';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { DynamicFormDividerComponent } from './dynamic-form-divider.component';
import { FormItemDivider } from './form-item-divider.interface';

const defaultDivider: FormItemDivider = {
  position: { x: 0, y: 0 },
  type: 'divider',
};

const renderDivider = (element = defaultDivider) => renderElement(DynamicFormDividerComponent, { inputs: { element } });

describe('DynamicFormDividerComponent', () => {
  describe('Behavior', () => {
    describe('Vertical property', () => {
      it('should be defaulted as horizontal', async () => {
        const { fixture } = await renderDivider();

        const divider: MatDivider = fixture.debugElement.query(By.directive(MatDivider)).componentInstance;
        expect(divider.vertical).toBe(false);
      });

      it('should be set as vertical when prop is true', async () => {
        const { fixture } = await renderDivider({ ...defaultDivider, vertical: true });

        const divider: MatDivider = fixture.debugElement.query(By.directive(MatDivider)).componentInstance;
        expect(divider.vertical).toBe(true);
      });

      it('should be set as vertical when prop is false', async () => {
        const { fixture } = await renderDivider({ ...defaultDivider, vertical: false });

        const divider: MatDivider = fixture.debugElement.query(By.directive(MatDivider)).componentInstance;
        expect(divider.vertical).toBe(false);
      });

      it('should have height: 100% when prop is true', async () => {
        await renderDivider({ ...defaultDivider, vertical: true });

        const divider = screen.getByRole('separator');
        expect(divider).toHaveStyle('height: 100%');
      });
    });

    describe('Inset property', () => {
      it('should be defaulted as false', async () => {
        const { fixture } = await renderDivider();

        const divider: MatDivider = fixture.debugElement.query(By.directive(MatDivider)).componentInstance;
        expect(divider.inset).toBe(false);
      });

      it('should be set as true when prop is true', async () => {
        const { fixture } = await renderDivider({ ...defaultDivider, inset: true });

        const divider: MatDivider = fixture.debugElement.query(By.directive(MatDivider)).componentInstance;
        expect(divider.inset).toBe(true);
      });

      it('should be set as false when prop is false', async () => {
        const { fixture } = await renderDivider({ ...defaultDivider, inset: false });

        const divider: MatDivider = fixture.debugElement.query(By.directive(MatDivider)).componentInstance;
        expect(divider.inset).toBe(false);
      });
    });
  });
});
