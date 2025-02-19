import { CheckboxGroupDatum } from './checkbox-group-datum.interface';
import { coerceToDatum } from './coerce-to-datum';

describe('CheckboxGroup', () => {
  describe('coerceToDatum', () => {
    it('should convert an array of strings to CheckboxGroupDatum objects', () => {
      const data = ['item1', 'item2', 'item3'];
      const result = coerceToDatum(data);
      expect(result).toEqual([
        { id: '0', value: 'item1', label: 'item1' },
        { id: '1', value: 'item2', label: 'item2' },
        { id: '2', value: 'item3', label: 'item3' }
      ]);
    });

    it('should return an array of CheckboxGroupDatum objects unchanged', () => {
      const data: CheckboxGroupDatum<string>[] = [
        { id: '0', value: 'item1', label: 'Item 1' },
        { id: '1', value: 'item2', label: 'Item 2' }
      ];
      const result = coerceToDatum(data);
      expect(result).toEqual(data);
    });

    it('should handle an empty array', () => {
      const data: string[] = [];
      const result = coerceToDatum(data);
      expect(result).toEqual([]);
    });

    it('should handle mixed types in the array', () => {
      const data: (string | CheckboxGroupDatum<string>)[] = [
        'item1',
        { id: '1', value: 'item2', label: 'Item 2' }
      ];
      const result = coerceToDatum(data as string[] | CheckboxGroupDatum<string>[]);
      expect(result).toEqual([
        { id: '0', value: 'item1', label: 'item1' },
        { id: '1', value: 'item2', label: 'Item 2' }
      ]);
    });
  });
});
