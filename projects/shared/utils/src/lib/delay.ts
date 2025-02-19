export const delay =
  <T = unknown>(ms: number) =>
  (x: T): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(x), ms));
