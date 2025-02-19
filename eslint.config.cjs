const nx = require('@nx/eslint-plugin');
const eslintPluginJsonc = require('eslint-plugin-jsonc');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  {
    ignores: ['**/dist', '**/open-api', '**/android', '**/ios'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'scope:dev-tools',
              onlyDependOnLibsWithTags: ['scope:dev-tools'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'type:domain',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'type:clients',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:domain'],
            },
            {
              sourceTag: 'type:state',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:domain'],
            },
            {
              sourceTag: 'type:views',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:domain'],
            },
            {
              sourceTag: 'type:application',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:domain', 'type:state', 'type:clients'],
            },
            {
              sourceTag: 'type:routing',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:views', 'type:application'],
            },
            {
              sourceTag: 'scope:test-creation',
              onlyDependOnLibsWithTags: ['scope:test-creation:*', 'scope:shared'],
            },
            {
              sourceTag: 'scope:farming-suite',
              onlyDependOnLibsWithTags: ['scope:farming-suite:*', 'scope:shared'],
            },
            // GENERATOR_NEW_APP_BOUNDARIES_ANCHOR: Don't remove this comment, it's being used by the generator to anchor the new rules
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {
      'no-restricted-syntax': [
        'error',
        "Property[kind='get']",
        "MethodDefinition[kind='get']",
        {
          selector: "CallExpression[callee.object.name='console']",
          message: "Forbidden console method called. Use Logger from 'tslog' instead.",
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@jsverse/transloco',
              importNames: ['TranslocoService'],
              message: 'Please use LanguageService from @cooperl/i18n instead.',
            },
            {
              name: 'tslog',
              message: 'Please use @cooperl/logger instead.',
            },
          ],
          patterns: [
            {
              group: ['@cooperl/*'],
              importNamePattern: 'Implementation$',
              message: 'Use the port instead',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
          ignoredDependencies: [
            '@capacitor/app',
            '@capacitor/browser',
            '@capacitor/core',
            '@capacitor/device',
            '@capacitor/haptics',
            '@capacitor/keyboard',
            '@capacitor/status-bar',
            '@capacitor/android',
            '@capacitor/cli',
            '@capacitor/ios',
          ],
        },
      ],
    },
    languageOptions: { parser: require('jsonc-eslint-parser') },
  },
  {
    files: ['i18n/*.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          natural: false,
          minKeys: 2,
          allowLineSeparatedGroups: false,
        },
      ],
    },
    languageOptions: { parser: require('jsonc-eslint-parser') },
  },
];
