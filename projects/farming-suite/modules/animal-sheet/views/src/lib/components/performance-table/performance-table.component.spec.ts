import { renderElement } from '@cooperl/design-system/testing';
import { ComponentInput } from '@testing-library/angular';
import { PerformanceTableComponent } from './performance-table.component';

const defaultInput: ComponentInput<PerformanceTableComponent> = {
  rankElements: [
    {
      id: 1,
      rank_type_id: 1,
      mating_number: 3,
      doses_number: 15,
      iss1: 8,
      issf: 10,
      gestation_duration: 115,
      nt: 12,
      nv: 10,
      mn: 8,
      mo: 2,
      eld_input: 5,
      eld_output: 3,
      adopted: 1,
      removed: 0,
      observation: 'Bonne performance',
    },
    {
      id: 2,
      rank_type_id: 2,
      mating_number: 2,
      doses_number: 10,
      iss1: 7,
      issf: 9,
      gestation_duration: 114,
      nt: 11,
      nv: 9,
      mn: 7,
      mo: 2,
      eld_input: 6,
      eld_output: 4,
      adopted: 0,
      removed: 1,
      observation: "Besoin d'amélioration",
    },
    {
      id: 3,
      rank_type_id: 3,
      mating_number: 4,
      doses_number: 20,
      iss1: 9,
      issf: 11,
      gestation_duration: 116,
      nt: 13,
      nv: 11,
      mn: 9,
      mo: 2,
      eld_input: 7,
      eld_output: 5,
      adopted: 2,
      removed: 0,
      observation: 'Performance optimale',
    },
    {
      id: 4,
      rank_type_id: 4,
      mating_number: 1,
      doses_number: 8,
      iss1: 6,
      issf: 8,
      gestation_duration: 113,
      nt: 10,
      nv: 8,
      mn: 6,
      mo: 2,
      eld_input: 4,
      eld_output: 2,
      adopted: 0,
      removed: 1,
      observation: 'Performance moyenne',
    },
    {
      id: 5,
      rank_type_id: 5,
      mating_number: 5,
      doses_number: 25,
      iss1: 10,
      issf: 12,
      gestation_duration: 117,
      nt: 14,
      nv: 12,
      mn: 10,
      mo: 2,
      eld_input: 8,
      eld_output: 6,
      adopted: 3,
      removed: 0,
      observation: 'Excellente performance',
    },
  ],
};

const renderPerformanceTableComponent = (element = defaultInput) => renderElement(PerformanceTableComponent, { inputs: element });

describe('[Farming Suite - Animal Sheet] PerformanceTableComponent', () => {
  it('Render Component', async () => {
    expect((await renderPerformanceTableComponent()).fixture).toBeTruthy();
  });

  describe('Inputs rankElements', () => {
    it('should throw an error if rankElements is not provided', async () => {
      await expect(renderPerformanceTableComponent({})).rejects.toThrow('NG0950');
    });
  });
});
