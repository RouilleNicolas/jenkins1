import { CheckboxGroupDatum } from "../checkbox-group-datum.interface";
import { byId } from './by-id';

describe('CheckboxGroup', () => {
  describe('DatumFilters', () => {
    describe('byId', () => {
      it('should filter CheckboxGroupDatum by id', () => {
        const ids = ['1', '2', '3'];
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'value1', label: 'label1' },
          { id: '2', value: 'value2', label: 'label2' },
          { id: '3', value: 'value3', label: 'label3' },
          { id: '4', value: 'value4', label: 'label4' }
        ];

        const filterById = byId(ids);
        const filteredData = data.filter(filterById);

        expect(filteredData).toEqual([
          { id: '1', value: 'value1', label: 'label1' },
          { id: '2', value: 'value2', label: 'label2' },
          { id: '3', value: 'value3', label: 'label3' }
        ]);
      });

      it('should return an empty array if no ids match', () => {
        const ids = ['5', '6'];
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'value1', label: 'label1' },
          { id: '2', value: 'value2', label: 'label2' },
          { id: '3', value: 'value3', label: 'label3' },
          { id: '4', value: 'value4', label: 'label4' }
        ];

        const filterById = byId(ids);
        const filteredData = data.filter(filterById);

        expect(filteredData).toEqual([]);
      });

      it('should return the same array if all ids match', () => {
        const ids = ['1', '2', '3', '4'];
        const data: CheckboxGroupDatum<string>[] = [
          { id: '1', value: 'value1', label: 'label1' },
          { id: '2', value: 'value2', label: 'label2' },
          { id: '3', value: 'value3', label: 'label3' },
          { id: '4', value: 'value4', label: 'label4' }
        ];

        const filterById = byId(ids);
        const filteredData = data.filter(filterById);

        expect(filteredData).toEqual(data);
      });
    });
  });
});
