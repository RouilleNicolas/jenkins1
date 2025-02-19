import '@testing-library/jest-dom';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

// Avoid getting overflown by 'Error: Could not parse CSS stylesheet' logs in the console
const originalConsoleError = console.error;
console.error = function (...data) {
  if (typeof data[0]?.toString === 'function' && data[0].toString().includes('Error: Could not parse CSS stylesheet')) return;
  originalConsoleError(...data);
};
