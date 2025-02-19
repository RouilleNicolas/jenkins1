import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { ReproductionComponent } from './reproduction.component';

const defaultInputs: ComponentInput<ReproductionComponent> = {
  abortionNumber: 3,
  averageGestationLength: 50,
  averageLactationLength: 40,
  farrowingInterval: 150,
  intervalWeaningFertilizingService: 154,
  returnNumber: 2,
};

const renderReproductionComponent = (element = defaultInputs) => renderElement(ReproductionComponent, { inputs: element });

describe('ReproductionComponent', () => {
  it('should instantiate', async () => {
    expect((await renderReproductionComponent()).fixture.componentInstance).toBeTruthy();
  });

  describe('AbortionNumber', () => {
    it('should throw an error if AbortionNumber is not provided', async () => {
      await expect(
        renderReproductionComponent({
          averageGestationLength: 50,
          averageLactationLength: 40,
          farrowingInterval: 150,
          intervalWeaningFertilizingService: 154,
          returnNumber: 2,
        }),
      ).rejects.toThrow('NG0950');
    });

    it('should render the AbortionNumber', async () => {
      expect((await renderReproductionComponent()).getByText('3')).toBeVisible();
    });
  });

  describe('AverageGestationLength', () => {
    it('should throw an error if AverageGestationLength is not provided', async () => {
      await expect(
        renderReproductionComponent({
          abortionNumber: 3,
          averageLactationLength: 40,
          farrowingInterval: 150,
          intervalWeaningFertilizingService: 154,
          returnNumber: 2,
        }),
      ).rejects.toThrow('NG0950');
    });

    it('should render the AverageGestationLength', async () => {
      expect((await renderReproductionComponent()).getByText('50 d.')).toBeVisible();
    });
  });

  describe('AverageLactationLength', () => {
    it('should throw an error if AverageLactationLength is not provided', async () => {
      await expect(
        renderReproductionComponent({
          abortionNumber: 3,
          averageGestationLength: 50,
          farrowingInterval: 150,
          intervalWeaningFertilizingService: 154,
          returnNumber: 2,
        }),
      ).rejects.toThrow('NG0950');
    });

    it('should render the AverageLactationLength', async () => {
      expect((await renderReproductionComponent()).getByText('40 d.')).toBeVisible();
    });
  });

  describe('FarrowingInterval', () => {
    it('should render the FarrowingInterval', async () => {
      expect((await renderReproductionComponent()).getByText('150 d.')).toBeVisible();
    });
  });

  describe('IntervalWeaningFertilizingService', () => {
    it('should throw an error if IntervalWeaningFertilizingService is not provided', async () => {
      await expect(
        renderReproductionComponent({
          abortionNumber: 3,
          averageGestationLength: 50,
          averageLactationLength: 40,
          farrowingInterval: 150,
          returnNumber: 2,
        }),
      ).rejects.toThrow('NG0950');
    });

    it('should render the IntervalWeaningFertilizingService', async () => {
      expect((await renderReproductionComponent()).getByText('154 d.')).toBeVisible();
    });
  });

  describe('ReturnNumber', () => {
    it('should throw an error if ReturnNumber is not provided', async () => {
      await expect(
        renderReproductionComponent({
          abortionNumber: 3,
          averageGestationLength: 50,
          averageLactationLength: 40,
          farrowingInterval: 150,
          intervalWeaningFertilizingService: 154,
        }),
      ).rejects.toThrow('NG0950');
    });

    it('should render the ReturnNumber', async () => {
      expect((await renderReproductionComponent()).getByText('2')).toBeVisible();
    });
  });
});
