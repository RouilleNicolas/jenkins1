import { uniq } from './uniq';

describe('uniq', () => {
  it('should return unique values from an array of numbers', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const output = uniq(input);
    expect(output).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return unique values from an array of strings', () => {
    const input = ['a', 'b', 'b', 'c', 'a'];
    const output = uniq(input);
    expect(output).toEqual(['a', 'b', 'c']);
  });

  it('should return unique values based on keyExtractorFn', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Charlie' },
    ];
    const output = uniq(input, item => item.id);
    expect(output).toEqual([1, 2, 3]);
  });

  it('should return an empty array when given an empty array', () => {
    const input: number[] = [];
    const output = uniq(input);
    expect(output).toEqual([]);
  });

  it('should handle arrays with a single element', () => {
    const input = [42];
    const output = uniq(input);
    expect(output).toEqual([42]);
  });

  it('should handle arrays with all unique elements', () => {
    const input = [1, 2, 3, 4, 5];
    const output = uniq(input);
    expect(output).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle arrays with all duplicate elements', () => {
    const input = [1, 1, 1, 1, 1];
    const output = uniq(input);
    expect(output).toEqual([1]);
  });
});
