import { strings } from '@angular-devkit/core';
import { storybookConfigurationGenerator } from '@nx/angular/generators';
import { generateFiles, ProjectConfiguration, readProjectConfiguration, Tree, updateProjectConfiguration } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import * as path from 'node:path';

const typeTagRoot = 'type';

export const ConfigurationConstants = {
  basePath: 'projects',
  tags: {
    generateScope: (project: string) => `scope:${project}`,
    type: {
      root: typeTagRoot,
      web: `${typeTagRoot}:web`,
      mobile: `${typeTagRoot}:mobile`,
    },
  },
  generateNxProjectName: (name: string, type: 'web' | 'mobile') => `${strings.dasherize(name)}-${type}`,
  addCoverageTargetToProjectConfig: (tree: Tree, projectConfig: ProjectConfiguration): ProjectConfiguration => {
    if (!projectConfig.targets) {
      projectConfig.targets = {};
    }

    projectConfig.targets['coverage'] = {
      executor: '@nx/jest:jest',
      outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
      options: {
        jestConfig: '{projectRoot}/jest.config.ts',
        codeCoverage: true,
        coverageReporters: ['lcov', 'text'],
      },
    };

    // Update the project configuration
    updateProjectConfiguration(tree, projectConfig.name ?? '', projectConfig);

    return projectConfig;
  },
  addSonarTargetToProjectConfig: (tree: Tree, projectConfig: ProjectConfiguration, hasStorybook = false): ProjectConfiguration => {
    if (!projectConfig.targets) {
      projectConfig.targets = {};
    }

    const exclusions = ['{projectRoot}/src/test-setup.ts', '{projectRoot}/jest.config.ts', '{projectRoot}/eslint.config.cjs'];

    if (hasStorybook) {
      const storybookExclusions = [
        '{projectRoot}/**/testing/**/*',
        '{projectRoot}/**/*.stories.ts',
        '{projectRoot}/**/stories/**/*',
        '{projectRoot}/**/docs/**/*',
      ];

      exclusions.push(...storybookExclusions);
    }

    projectConfig.targets['sonar'] = {
      executor: '@koliveira15/nx-sonarqube:scan',
    };

    // Update the project configuration
    updateProjectConfiguration(tree, projectConfig.name ?? '', projectConfig);

    return projectConfig;
  },
  addStorybook: async (tree: Tree, name: string, projectConfig: ProjectConfiguration) => {
    await storybookConfigurationGenerator(tree, {
      generateStories: false,
      linter: Linter.EsLint,
      project: name,
      interactionTests: false,
      configureStaticServe: false,
    });

    generateFiles(tree, path.join(__dirname, 'common/files/storybook'), projectConfig.root, {});

    projectConfig = readProjectConfiguration(tree, name);

    if (!projectConfig.targets?.['storybook'].options.assets) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- already checked in the if condition
      projectConfig.targets!['storybook'].options.assets = [];
    }

    // Add translations in storybook
    projectConfig.targets?.['storybook'].options.assets.push({
      glob: '**/*.json',
      input: `i18n`,
      output: '/assets/i18n',
    });

    // Add img assets in storybook
    projectConfig.targets?.['storybook'].options.assets.push({
      glob: '**/*',
      input: 'projects/shared/design-system/src/styles/icons',
      output: '/assets/icons',
    });

    updateProjectConfiguration(tree, name, projectConfig);
  },
};
