import { delay } from './delay';

describe('[Shared - Utils] delay', () => {
  jest.useFakeTimers();

  it('should delay the resolution of the promise by the specified time', async () => {
    const ms = 1000;
    const value = 'test';
    const delayedPromise = delay(ms)(value);

    jest.advanceTimersByTime(ms);

    await expect(delayedPromise).resolves.toBe(value);
  });
});
