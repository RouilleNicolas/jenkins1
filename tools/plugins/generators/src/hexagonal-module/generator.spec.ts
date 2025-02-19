jest.mock('node:child_process');
import { E2eTestRunner, applicationGenerator as angularApplicationGenerator } from '@nx/angular/generators';
import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { applicationGenerator } from '../application/generator';
import { ConfigurationConstants } from '../configuration.constants';
import { fakeEslintConfig } from '../fake-eslint-config';
import { hexagonalModuleGenerator } from './generator';
import { hexagons } from './hexagons';
import { HexagonalModuleGeneratorSchema } from './schema';
// Used to spy on internalLibraryGenerator
import { execSync } from 'node:child_process';
import * as libraryGenerator from './library-generator';

describe('hexagonal-module generator', () => {
  let tree: Tree;

  beforeEach(() => {
    // Mock console.warn to prevent warning messages from being displayed
    console.warn = jest.fn();

    tree = createTreeWithEmptyWorkspace();
    tree.write('eslint.config.cjs', fakeEslintConfig);
    // Avoid generating warnings
    tree.write('.gitignore', '');
  });

  describe('Error handling', () => {
    it('should throw error if selected project is not tagged as front', async () => {
      const name = 'my-wrongly-generated-project';
      await angularApplicationGenerator(tree, {
        name,
        directory: name,
        e2eTestRunner: E2eTestRunner.None,
      });

      const options: HexagonalModuleGeneratorSchema = {
        module: 'test',
        project: name,
      };
      await expect(hexagonalModuleGenerator(tree, options)).rejects.toThrow(`The project ${options.project} is not a web or mobile project`);
    });
  });

  describe('Valid cases', () => {
    let options: HexagonalModuleGeneratorSchema;

    beforeEach(async () => {
      const name = 'my-project';
      const nxProjectName = ConfigurationConstants.generateNxProjectName(name, 'web');
      options = { module: 'test', project: nxProjectName };
      await applicationGenerator(tree, { name, platform: 'web' });
    });

    it('should call internalLibraryGenerator for each hexagon', async () => {
      jest.spyOn(libraryGenerator, 'internalLibraryGenerator');
      await hexagonalModuleGenerator(tree, options);

      expect(libraryGenerator.internalLibraryGenerator).toHaveBeenCalledTimes(hexagons.length);
    });

    it('should call internalLibraryGenerator with a dasherized name', async () => {
      options.module = 'TestModule';
      const expectedModule = 'test-module';

      jest.spyOn(libraryGenerator, 'internalLibraryGenerator');
      await hexagonalModuleGenerator(tree, options);

      expect(libraryGenerator.internalLibraryGenerator).toHaveBeenCalledWith(tree, {
        ...options,
        module: expectedModule,
        hexagon: hexagons[0],
      });
    });
  });

  describe('Project name normalization', () => {
    it('should remove -web suffix from project name', async () => {
      const name = 'my-project';
      const nxProjectName = ConfigurationConstants.generateNxProjectName(name, 'web');
      const options: HexagonalModuleGeneratorSchema = {
        module: 'test',
        project: nxProjectName,
      };

      await applicationGenerator(tree, { name, platform: 'web' });
      await hexagonalModuleGenerator(tree, options);

      expect(options.project).toBe(name);
    });

    it('should remove -mobile suffix from project name', async () => {
      const name = 'my-project';
      const nxProjectName = ConfigurationConstants.generateNxProjectName(name, 'mobile');
      const options: HexagonalModuleGeneratorSchema = {
        module: 'test',
        project: nxProjectName,
      };

      await applicationGenerator(tree, { name, platform: 'mobile' });
      await hexagonalModuleGenerator(tree, options);

      expect(options.project).toBe(name);
    });
  });

  it('should force fix lint issues on generated project', async () => {
    const name = 'my-project';
    const nxProjectName = ConfigurationConstants.generateNxProjectName(name, 'web');
    const options: HexagonalModuleGeneratorSchema = {
      module: 'test',
      project: nxProjectName,
    };

    await applicationGenerator(tree, { name, platform: 'web' });
    const onSuccessFn = await hexagonalModuleGenerator(tree, options);
    onSuccessFn();
    const expectedProjectsNames = hexagons.flatMap((h) => {
      if (!h.subTypes) {
        return `${name}-${options.module}-${h.name}`;
      }

      return h.subTypes.map((subType) => `${name}-${options.module}-${subType}`);
    });
    expect(execSync).toHaveBeenCalledWith(`npx nx run-many -t lint -p ${expectedProjectsNames.join(',')} --fix`, { stdio: 'inherit' });
  });
});
