import { strings } from '@angular-devkit/core';
import { libraryGenerator } from '@nx/angular/generators';
import { readProjectConfiguration, Tree } from '@nx/devkit';
import { execSync } from 'node:child_process';
import { ConfigurationConstants } from '../../configuration.constants';
import { ProjectSharedGeneratorSchema } from './schema';

export async function projectSharedGenerator(
  tree: Tree,
  options: ProjectSharedGeneratorSchema,
) {
  const name = strings.dasherize(options.name);

  await libraryGenerator(tree, {
    name: name,
    directory: `${ConfigurationConstants.basePath}/shared/${name}`,
    tags: ConfigurationConstants.tags.generateScope('shared'),
    buildable: true,
    flat: true,
    skipModule: true,
    skipTests: true,
    style: 'scss',
    prefix: options.prefix || name,
  });

  // Add mandatory targets to the project
  const projectConfig = readProjectConfiguration(tree, name);
  ConfigurationConstants.addCoverageTargetToProjectConfig(tree, projectConfig);
  ConfigurationConstants.addSonarTargetToProjectConfig(
    tree,
    projectConfig,
    options.storybook,
  );

  if (options.storybook) {
    await ConfigurationConstants.addStorybook(tree, name, projectConfig);
  }

  return () => {
    execSync(`npx nx run ${name}:lint --fix`, { stdio: 'inherit' });
  };
}

export default projectSharedGenerator;
