import { strings } from '@angular-devkit/core';
import { logger, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { ConfigurationConstants } from '../configuration.constants';
import sharedProjectGenerator from '../project/shared/generator';
import { designSystemElementGenerator } from './generator';
import { DesignSystemElementGeneratorSchema } from './schema';

// Mock the logger to prevent tests from being verbose
logger.info = jest.fn();

const designSystemBasePath = `${ConfigurationConstants.basePath}/shared/design-system`;

describe('design-system-element generator', () => {
  let tree: Tree;

  beforeEach(() => {
    // Mock console.warn to prevent warning messages from being displayed
    console.warn = jest.fn();
  })

  const testCases: (DesignSystemElementGeneratorSchema & { title: string })[] = [
    { title: 'component with simple name', name: 'test', type: 'component' },
    { title: 'directive with simple name', name: 'test', type: 'directive' },
    { title: 'pipe with simple name', name: 'test', type: 'pipe' },
    { title: 'component with composite name', name: 'testComponent', type: 'component' },
    { title: 'directive with composite name', name: 'test_directive', type: 'directive' },
    { title: 'pipe with composite name', name: 'test-directive', type: 'pipe' },
    { title: 'component as form element', name: 'testComponent', type: 'component', formElement: true },
    { title: 'directive as form element', name: 'test_directive', type: 'directive', formElement: true },
    { title: 'pipe as form element', name: 'test-directive', type: 'pipe', formElement: true },
  ];

  for (const withExistingDesignSystemLibrary of [true, false]) {
    const title = withExistingDesignSystemLibrary ? 'with existing design system' : 'without existing design system';

    describe(title, () => {
      for (const options of testCases) {
        describe(`${options.title}`, () => {
          const sanitizedName = strings.dasherize(options.name);
          const parentDirectory = options.formElement ? `form-element/${options.type}` : options.type;

          beforeEach(async () => {
            tree = createTreeWithEmptyWorkspace();
            // Avoid generating warnings
            tree.write('.gitignore', '');

            if (withExistingDesignSystemLibrary) {
              await sharedProjectGenerator(tree, { name: 'design-system' });
            }

            await designSystemElementGenerator(tree, options);
          });

          it('should generate a secondary entry point in the design system library', async () => {
            expect(tree.exists(`${designSystemBasePath}/${parentDirectory}/${sanitizedName}`)).toBeTruthy();
          });

          it(`should generate a ${options.type}`, async () => {
            expect(tree.exists(`${designSystemBasePath}/${parentDirectory}/${sanitizedName}/src/${sanitizedName}.${options.type}.ts`)).toBeTruthy();
            expect(tree.exists(`${designSystemBasePath}/${parentDirectory}/${sanitizedName}/src/${sanitizedName}.${options.type}.spec.ts`)).toBeTruthy();

            if (options.type === 'component') {
              expect(tree.exists(`${designSystemBasePath}/${parentDirectory}/${sanitizedName}/src/${sanitizedName}.${options.type}.scss`)).toBeTruthy();
              expect(tree.exists(`${designSystemBasePath}/${parentDirectory}/${sanitizedName}/src/${sanitizedName}.${options.type}.html`)).toBeTruthy();
            }
          });

          it('should generate a story', async () => {
            expect(tree.exists(`${designSystemBasePath}/${parentDirectory}/${sanitizedName}/src/${sanitizedName}.${options.type}.stories.ts`)).toBeTruthy();
          });
        });
      }
    });
  }

});
