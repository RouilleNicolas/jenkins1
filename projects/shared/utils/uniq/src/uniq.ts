/**
 * Returns an array that contains uniq values from the given array
 *
 * @param array The array to filter
 */
export function uniq<TIn extends string | number, TOut extends string | number>(array: TIn[]): TOut[];
/**
 * Returns an array that contains uniq values from the given array
 *
 * @param array The array to filter
 * @param keyExtractorFn A function that extracts a key from the array values
 */
export function uniq<TIn, TOut extends string | number>(array: TIn[], keyExtractorFn: (value: TIn) => TOut): TOut[];
export function uniq<TIn, TOut extends string | number>(array: TIn[], keyExtractorFn?: (value: TIn) => TOut): TOut[] {
  if (keyExtractorFn) {
    const seen = new Set<TOut>();

    for (const value of array) {
      const computed = keyExtractorFn(value);

      if (!seen.has(computed)) {
        seen.add(computed);
      }
    }

    return [...seen];
  }

  return Array.from(new Set(array as unknown as TOut[]));
}
