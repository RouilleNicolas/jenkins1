import { strings } from '@angular-devkit/core';
import {
  ProjectConfiguration,
  Tree,
  readProjectConfiguration,
} from '@nx/devkit';
import { execSync } from 'node:child_process';
import { ConfigurationConstants } from '../configuration.constants';
import { hexagons } from './hexagons';
import { internalLibraryGenerator } from './library-generator';
import { HexagonalModuleGeneratorSchema } from './schema';

const isValidProject = (project: ProjectConfiguration) =>
  project.tags &&
  (project.tags.includes(ConfigurationConstants.tags.type.web) ||
    project.tags.includes(ConfigurationConstants.tags.type.mobile));

export async function hexagonalModuleGenerator(
  tree: Tree,
  options: HexagonalModuleGeneratorSchema,
) {
  const projectConfig = readProjectConfiguration(tree, options.project);

  if (!isValidProject(projectConfig)) {
    throw new Error(
      `The project ${options.project} is not a web or mobile project`,
    );
  }

  if (projectConfig.tags?.includes(ConfigurationConstants.tags.type.web)) {
    options.project = options.project.replace('-web', '');
  } else if (
    projectConfig.tags?.includes(ConfigurationConstants.tags.type.mobile)
  ) {
    options.project = options.project.replace('-mobile', '');
  }

  const generatedProjectsNames: string[] = [];
  for (const hexagon of hexagons) {
    options.module = strings.dasherize(options.module);
    const projectName = await internalLibraryGenerator(tree, {
      ...options,
      hexagon,
    });
    generatedProjectsNames.push(...projectName);
  }

  return () => {
    execSync(
      `npx nx run-many -t lint -p ${generatedProjectsNames.join(',')} --fix`,
      { stdio: 'inherit' },
    );
  };
}

export default hexagonalModuleGenerator;
