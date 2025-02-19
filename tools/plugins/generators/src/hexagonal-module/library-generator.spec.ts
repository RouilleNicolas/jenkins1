import { strings } from '@angular-devkit/core';
import { ProjectConfiguration, Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { applicationGenerator } from '../application/generator';
import { ConfigurationConstants } from '../configuration.constants';
import { fakeEslintConfig } from '../fake-eslint-config';
import { readProjectTsConfig } from '../read-ts-config';
import { TsConfig } from '../ts-config.interface';
import { HexagonalLibraryConfig } from './hexagon.interface';
import { hexagons } from './hexagons';
import { InternalLibraryGeneratorParams, internalLibraryGenerator } from './library-generator';

const generateDummyBarrelFileContent = (name: string) => `// TODO : Delete that and add your own code
export const ${name} = '${name}';`;

const ignoreWhitespaceCharactersReturns = (content: string) => content.replace(/\s/g, '');

describe('hexagonal libraries generator', () => {
  let tree: Tree;
  const project = 'my-project';
  const module = 'my-module';

  beforeEach(async () => {
    // Mock console.warn to prevent warning messages from being displayed
    console.warn = jest.fn();

    tree = createTreeWithEmptyWorkspace();
    tree.write('eslint.config.cjs', fakeEslintConfig);
    // Avoid generating warnings
    tree.write('.gitignore', '');

    await applicationGenerator(tree, { name: project, platform: 'web' });
  });

  for (const hexagon of hexagons) {
    const options: InternalLibraryGeneratorParams = {
      project,
      module,
      hexagon,
    };

    generateTests(hexagon, options);
  }

  function generateTests(hexagon: HexagonalLibraryConfig, options: InternalLibraryGeneratorParams) {
    for (const subHexagon of hexagon.subTypes ?? []) {
      const subOptions: InternalLibraryGeneratorParams = {
        project,
        module,
        hexagon: { name: subHexagon },
        hexagonLayer: hexagon.name,
      };

      generateTests(subOptions.hexagon, subOptions);
      return;
    }

    const description = options.hexagonLayer ? `${options.hexagonLayer}/${options.hexagon.name}` : options.hexagon.name;

    describe(description, () => {
      let libraryPath = `${ConfigurationConstants.basePath}/${project}/modules/${module}`;
      if (options.hexagonLayer) {
        libraryPath += `/${options.hexagonLayer}`;
      }
      libraryPath += `/${hexagon.name}`;

      it(`should create a library in ${libraryPath}`, async () => {
        await internalLibraryGenerator(tree, options);

        expect(tree.exists(libraryPath)).toBe(true);
      });

      it('should name library correctly', async () => {
        const expectedName = `${project}-${module}-${hexagon.name}`;
        await internalLibraryGenerator(tree, options);

        const projectConfig = readProjectConfiguration(tree, expectedName);

        // If project configuration exists, the project was created with the correct name
        expect(projectConfig).toBeDefined();
      });

      it('should tag library correctly', async () => {
        const expectedTags = `type:${hexagon.name},scope:${project}:${module}`.split(',');
        await internalLibraryGenerator(tree, options);

        const projectConfig = readProjectConfiguration(tree, `${project}-${module}-${hexagon.name}`);

        expect(projectConfig.tags).toStrictEqual(expectedTags);
      });

      it('should set strict tsConfig', async () => {
        await internalLibraryGenerator(tree, options);

        const projectTsConfig = readProjectTsConfig(tree, `${project}-${module}-${hexagon.name}`);

        expect(projectTsConfig.compilerOptions.strict).toBe(true);
        expect(projectTsConfig.angularCompilerOptions.strictInjectionParameters).toBe(true);
        expect(projectTsConfig.angularCompilerOptions.strictInputAccessModifiers).toBe(true);
        expect(projectTsConfig.angularCompilerOptions.strictTemplates).toBe(true);
      });

      it('should set the correct prefix', async () => {
        const expectedPrefix = `${project}-${module}`;
        await internalLibraryGenerator(tree, options);

        const projectConfig = readProjectConfiguration(tree, `${project}-${module}-${hexagon.name}`) as ProjectConfiguration & { prefix: string };

        expect(projectConfig.prefix).toBe(expectedPrefix);
      });

      it('should set correct import path', async () => {
        const expectedImportPath = `@cooperl/${project}/${module}/${hexagon.name}`;
        await internalLibraryGenerator(tree, options);

        const projectConfig = tree.read('tsconfig.base.json')?.toString() ?? '';
        const tsConfig: TsConfig = JSON.parse(projectConfig.toString());

        expect(tsConfig.compilerOptions.paths[expectedImportPath]).toStrictEqual([`${libraryPath}/src/index.ts`]);
      });

      it('should not generate a module', async () => {
        await internalLibraryGenerator(tree, options);

        expect(tree.exists(`${libraryPath}/src/lib/${project}-${module}-${hexagon.name}.module.ts`)).toBe(false);
      });

      it('should not generate a component', async () => {
        await internalLibraryGenerator(tree, options);

        expect(tree.exists(`${libraryPath}/src/lib/${project}-${module}-${hexagon.name}.component.ts`)).toBe(false);
        expect(tree.exists(`${libraryPath}/src/lib/${project}-${module}-${hexagon.name}.component.scss`)).toBe(false);
        expect(tree.exists(`${libraryPath}/src/lib/${project}-${module}-${hexagon.name}.component.css`)).toBe(false);
        expect(tree.exists(`${libraryPath}/src/lib/${project}-${module}-${hexagon.name}.component.html`)).toBe(false);
        expect(tree.exists(`${libraryPath}/src/lib/${project}-${module}-${hexagon.name}.component.spec.ts`)).toBe(false);
      });

      it('should generate a default barrel file', async () => {
        await internalLibraryGenerator(tree, options);

        expect(tree.exists(`${libraryPath}/src/lib/index.ts`)).toBe(true);
      });

      test('default barrel file should export a temporary constant', async () => {
        await internalLibraryGenerator(tree, options);

        const barrelContent = tree.read(`${libraryPath}/src/lib/index.ts`)?.toString().trim();
        let expectedContent: string;

        switch (hexagon.name) {
          case 'domain':
            expectedContent = `export * from "./commands";
export * from "./use-cases";
export * from "./ports";
export * from "./models";`;
            break;
          case 'routing':
            expectedContent = `export * from './routes';`;
            break;
          default:
            expectedContent = generateDummyBarrelFileContent(hexagon.name);
            break;
        }

        // Ignore whitespace characters to avoid false negatives with carriage returns
        expect(ignoreWhitespaceCharactersReturns(barrelContent ?? '')).toBe(ignoreWhitespaceCharactersReturns(expectedContent));
      });

      if (hexagon.name === 'domain') {
        const subFolders = ['commands', 'use-cases', 'ports', 'models'];

        for (const folder of subFolders) {
          it(`should have generated a ${folder} barrel file`, async () => {
            await internalLibraryGenerator(tree, options);

            expect(tree.exists(`${libraryPath}/src/lib/${folder}/index.ts`)).toBe(true);
          });

          test(`${folder} barrel file should export a temporary constant`, async () => {
            await internalLibraryGenerator(tree, options);

            const barrelContent = tree.read(`${libraryPath}/src/lib/${folder}/index.ts`)?.toString().trim();
            const expectedContent = generateDummyBarrelFileContent(`domain${strings.classify(folder)}`);

            // Ignore whitespace characters to avoid false negatives with carriage returns
            expect(ignoreWhitespaceCharactersReturns(barrelContent ?? '')).toBe(ignoreWhitespaceCharactersReturns(expectedContent));
          });
        }
      }
    });
  }
});
