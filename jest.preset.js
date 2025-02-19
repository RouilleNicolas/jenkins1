const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  // FIX : transloco has a dependency on flat, but it's not being resolved correctly
  moduleNameMapper: {
    '^flat': 'node_modules/flat/index.js',
  },
};
