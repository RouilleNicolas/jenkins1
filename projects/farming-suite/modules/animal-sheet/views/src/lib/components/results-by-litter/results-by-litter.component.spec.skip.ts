import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { ResultsByLitterComponent } from './results-by-litter.component';

const defaultInputs: ComponentInput<ResultsByLitterComponent> = {
  littersWeanedOnFarm: 10,
  mummifiedSum: 5,
  bornAliveSum: 80,
  stillbornSum: 15,
};

const renderResultsByLitterComponent = (element = defaultInputs) => renderElement(ResultsByLitterComponent, { inputs: element });

//TODO: Impossible d'importer echarts sur Jest , en attente d'une solution
describe.skip('[Farming Suite - Animal Sheet] ResultsByLitterComponent', () => {
  it('should create the component', async () => {
    expect((await renderResultsByLitterComponent()).fixture.componentInstance).toBeTruthy();
  });

  describe('LittersWeanedOnFarm', () => {
    it('should throw an error if littersWeanedOnFarm is not provided', async () => [
      expect(await renderResultsByLitterComponent({ mummifiedSum: 5, bornAliveSum: 80, stillbornSum: 15 })).rejects.toThrow('NG0950'),
    ]);

    it('should render the littersWeanedOnFarm', async () => {
      expect((await renderResultsByLitterComponent()).getByText('10')).toBeVisible();
    });
  });

  describe('MummifiedSum', () => {
    it('should throw an error if mummifiedSum is not provided', async () => [
      expect(await renderResultsByLitterComponent({ littersWeanedOnFarm: 10, bornAliveSum: 80, stillbornSum: 15 })).rejects.toThrow('NG0950'),
    ]);
  });

  describe('BornAliveSum', () => {
    it('should throw an error if bornAliveSum is not provided', async () => [
      expect(await renderResultsByLitterComponent({ littersWeanedOnFarm: 10, mummifiedSum: 5, stillbornSum: 15 })).rejects.toThrow('NG0950'),
    ]);
  });

  describe('StillbornSum', () => {
    it('should throw an error if stillbornSum is not provided', async () => [
      expect(await renderResultsByLitterComponent({ littersWeanedOnFarm: 10, mummifiedSum: 5, bornAliveSum: 80 })).rejects.toThrow('NG0950'),
    ]);
  });

  describe('Computed Properties', () => {
    it('should calculate the bornSum', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['bornSum']).toBe(100);
    });

    it('should calculate the bornAverage', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['bornAverage']).toBe(10);
    });

    it('should calculate the mummifiedAverage', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['mummifiedAverage']).toBe(0.5);
    });

    it('should calculate the bornAlivePercent', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['bornAlivePercent']).toBe(80);
    });

    it('should calculate the stillbornAverage', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['stillbornAverage']).toBe(1.5);
    });

    it('should calculate the bornLossPercent', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['bornLossPercent']).toBe(20);
    });

    it('should calculate the remainingBornLossPercent', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['remainingBornLossPercent']).toBe(80);
    });

    it('should calculate the mummifiedPercent', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['mummifiedPercent']).toBe(5);
    });

    it('should calculate the bornAlivePercent', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['bornAlivePercent']).toBe(80);
    });

    it('should calculate the stillbornPercent', async () => {
      expect((await renderResultsByLitterComponent()).fixture.componentInstance['stillbornPercent']).toBe(15);
    });
  });
});
