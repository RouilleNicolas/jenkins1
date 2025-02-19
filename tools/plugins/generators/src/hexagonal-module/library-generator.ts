import { strings } from '@angular-devkit/core';
import { libraryGenerator } from '@nx/angular/generators';
import { Tree, generateFiles, readProjectConfiguration } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import * as path from 'node:path';
import { ConfigurationConstants } from '../configuration.constants';
import { HexagonalLibraryConfig } from './hexagon.interface';

export interface InternalLibraryGeneratorParams {
  project: string;
  module: string;
  hexagon: HexagonalLibraryConfig;
  hexagonLayer?: string;
}

export async function internalLibraryGenerator(
  tree: Tree,
  { project, module, hexagon, hexagonLayer }: InternalLibraryGeneratorParams,
): Promise<string[]> {
  if (hexagon.subTypes) {
    const generatedProjectsNames: string[] = [];
    for (const subHexagon of hexagon.subTypes) {
      const projectsNames = await internalLibraryGenerator(tree, {
        project,
        module,
        hexagon: { name: subHexagon },
        hexagonLayer: hexagon.name,
      });

      generatedProjectsNames.push(...projectsNames);
    }

    return generatedProjectsNames;
  }

  const nxProjectName = `${project}-${module}-${hexagon.name}`;
  let directory = `${ConfigurationConstants.basePath}/${project}/modules/${module}`;
  if (hexagonLayer) {
    directory += `/${hexagonLayer}`;
  }
  directory += `/${hexagon.name}`;

  const scope = ConfigurationConstants.tags.generateScope(
    `${project}:${module}`,
  );
  await libraryGenerator(tree, {
    name: nxProjectName,
    directory,
    tags: `${ConfigurationConstants.tags.type.root}:${hexagon.name},${scope}`,
    linter: Linter.EsLint,
    style: 'scss',
    strict: true,
    prefix: `${project}-${module}`,
    importPath: `@cooperl/${project}/${module}/${hexagon.name}`,
    buildable: true,
    flat: true,
    skipModule: true,
    skipTests: true,
  });

  const hexagonLibRoot = path.join(directory, 'src/lib');

  // Remove the auto generated component
  tree.delete(`${hexagonLibRoot}/${nxProjectName}.component.ts`);
  tree.delete(`${hexagonLibRoot}/${nxProjectName}.component.scss`);
  tree.delete(`${hexagonLibRoot}/${nxProjectName}.component.html`);

  const projectConfig = readProjectConfiguration(tree, nxProjectName);
  generateFiles(
    tree,
    path.join(__dirname, 'files', hexagon.name),
    hexagon.name === 'views' ? projectConfig.root : hexagonLibRoot,
    {
      project,
      module,
      dasherizedModuleName: strings.dasherize(module),
      classifiedModuleName: strings.classify(module),
      ...strings,
    },
  );

  // Update library main barrel file
  tree.write(`${directory}/src/index.ts`, `export * from './lib';`);

  // Add mandatory targets to the project
  const withStorybook = hexagon.name === 'views';
  ConfigurationConstants.addCoverageTargetToProjectConfig(tree, projectConfig);
  ConfigurationConstants.addSonarTargetToProjectConfig(
    tree,
    projectConfig,
    withStorybook,
  );

  // Add Storybook on views hexagon
  if (withStorybook) {
    await ConfigurationConstants.addStorybook(
      tree,
      nxProjectName,
      projectConfig,
    );
  }

  return [nxProjectName];
}
