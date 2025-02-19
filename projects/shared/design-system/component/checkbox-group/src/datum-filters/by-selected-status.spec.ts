import { CheckboxGroupDatum } from '../checkbox-group-datum.interface';
import { bySelectedStatus } from './by-selected-status';

describe('CheckboxGroup', () => {
  describe('DatumFilters', () => {
    describe('bySelectedStatus', () => {
      it('should filter datums by selected status true', () => {
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'item1', selected: true, label: 'Item 1' },
          { id: '2', value: 'item2', selected: false, label: 'Item 2' },
          { id: '3', value: 'item3', selected: true, label: 'Item 3' },
        ];

        const result = data.filter(bySelectedStatus(true));
        expect(result).toEqual([
          { id: '1', value: 'item1', selected: true, label: 'Item 1' },
          { id: '3', value: 'item3', selected: true, label: 'Item 3' },
        ]);
      });

      it('should filter datums by selected status false', () => {
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'item1', selected: true, label: 'Item 1' },
          { id: '2', value: 'item2', selected: false, label: 'Item 2' },
          { id: '3', value: 'item3', selected: true, label: 'Item 3' },
        ];

        const result = data.filter(bySelectedStatus(false));
        expect(result).toEqual([
          { id: '2', value: 'item2', selected: false, label: 'Item 2' },
        ]);
      });

      it('should return an empty array if no datums match the selected status', () => {
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'item1', selected: true, label: 'Item 1' },
          { id: '2', value: 'item2', selected: true, label: 'Item 2' },
        ];

        const result = data.filter(bySelectedStatus(false));
        expect(result).toEqual([]);
      });

      it('should return the same array if all datums match the selected status', () => {
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'item1', selected: true, label: 'Item 1' },
          { id: '2', value: 'item2', selected: true, label: 'Item 2' },
        ];

        const result = data.filter(bySelectedStatus(true));
        expect(result).toEqual(data);
      });
    });
  });
});
