jest.mock('node:child_process');
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { execSync } from 'node:child_process';
import { ConfigurationConstants } from '../configuration.constants';
import { fakeEslintConfig } from '../fake-eslint-config';
import { readProjectTsConfig } from '../read-ts-config';
import { applicationGenerator } from './generator';
import { ApplicationGeneratorSchema } from './schema';

describe('application generator', () => {
  let tree: Tree;

  beforeEach(() => {
    // Mock console.warn to prevent warning messages from being displayed
    console.warn = jest.fn();
    console.info = jest.fn();
  });

  const testCases: (ApplicationGeneratorSchema & { title: string })[] = [
    { title: 'web', name: 'test', platform: 'web' },
    { title: 'mobile', name: 'test', platform: 'mobile' },
  ];

  for (const options of testCases) {
    const applicationName = options.name;
    let nxProjectName = ConfigurationConstants.generateNxProjectName(options.name, options.platform);

    describe(`Type = ${options.platform.toUpperCase()}`, () => {
      beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        tree.write('eslint.config.cjs', fakeEslintConfig);
        // Avoid generating warnings
        tree.write('.gitignore', '');

        // Ensure options.name is default
        options.name = applicationName;
        nxProjectName = ConfigurationConstants.generateNxProjectName(applicationName, options.platform);
      });

      it('should run successfully', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config).toBeDefined();
      });

      it('should have the correct name', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.name).toEqual(nxProjectName);
      });

      it('should dasherize the name', async () => {
        options.name = 'TestProject';
        nxProjectName = ConfigurationConstants.generateNxProjectName(options.name, options.platform);
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.name).toEqual(nxProjectName);
      });

      it('should have be generated in the correct directory', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.root).toEqual(`${ConfigurationConstants.basePath}/test/${options.platform}`);
      });

      it('should have the correct tags', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.tags).toStrictEqual([ConfigurationConstants.tags.generateScope('test'), ConfigurationConstants.tags.type[options.platform]]);
      });

      it('should dasherize the tags', async () => {
        options.name = 'TestProject';
        nxProjectName = ConfigurationConstants.generateNxProjectName(options.name, options.platform);
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.tags).toContain(ConfigurationConstants.tags.generateScope('test-project'));
      });

      it('should have the correct bundler', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['build'].executor).toEqual('@angular-devkit/build-angular:application');
      });

      it('should have generated standalone component', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);

        const generatedComponentContent = tree.read(`${config.sourceRoot}/app/app.component.ts`)?.toString() ?? '';
        expect(/standalone: false/g.test(generatedComponentContent)).toBe(false);
      });

      it('should generate tests', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(tree.exists(`${config.sourceRoot}/app/app.component.spec.ts`)).toBe(true);
      });

      it('should set strict tsConfig', async () => {
        await applicationGenerator(tree, options);

        const projectTsConfig = readProjectTsConfig(tree, nxProjectName);

        expect(projectTsConfig.compilerOptions.strict).toBe(true);
        expect(projectTsConfig.angularCompilerOptions.strictInjectionParameters).toBe(true);
        expect(projectTsConfig.angularCompilerOptions.strictInputAccessModifiers).toBe(true);
        expect(projectTsConfig.angularCompilerOptions.strictTemplates).toBe(true);
      });

      it('should have the correct e2e runner', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['e2e']).toBeUndefined();
      });

      it('should have the correct linter', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['lint'].executor).toBe('@nx/eslint:lint');
      });

      it('should have routing enabled', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        tree.exists(`${config.sourceRoot}/app/app.routes.ts`);
        expect(tree.exists(`${config.sourceRoot}/app/app.routes.ts`)).toBe(true);
      });

      it('should have generated standalone config', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);

        expect(tree.exists(`${config.sourceRoot}/app/app.config.ts`)).toBe(true);
      });

      it('should have the correct style', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['build'].options.inlineStyleLanguage).toEqual('scss');
        expect(tree.exists(`${config.sourceRoot}/app/app.component.scss`)).toBe(true);
      });

      it('should have the correct unit test runner', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['test'].executor).toBe('@nx/jest:jest');
      });

      it('should have add the translations to the build', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['build'].options.assets).toContainEqual({
          glob: '**/*.json',
          input: 'i18n',
          output: '/assets/i18n',
        });
      });

      it('should have add the image assets to the build', async () => {
        await applicationGenerator(tree, options);
        const config = readProjectConfiguration(tree, nxProjectName);
        expect(config.targets?.['build'].options.assets).toContainEqual({
          glob: '**/*',
          input: 'projects/shared/design-system/src/styles/icons',
          output: '/assets/icons',
        });
      });

      it("should have updated the workspace eslint config to add it's own module boundary rule", async () => {
        await applicationGenerator(tree, options);
        const eslintConfig = tree.read('eslint.config.cjs', 'utf-8');

        expect(eslintConfig).toContain(`sourceTag: '${ConfigurationConstants.tags.generateScope(options.name)}'`);
        expect(eslintConfig).toContain(
          `onlyDependOnLibsWithTags: ['${ConfigurationConstants.tags.generateScope(`${options.name}:*`)}', '${ConfigurationConstants.tags.generateScope('shared')}']`,
        );
      });

      it('should throw an error if the eslint config does not contain the module boundary anchor', async () => {
        tree.write('eslint.config.cjs', 'module.exports = {};');
        await expect(applicationGenerator(tree, options)).rejects.toThrow(
          'Could not find the ESLint module boundary rule anchor in the ESLint config file.',
        );
      });

      if (options.platform === 'mobile') {
        it('should build the project after generating it', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(execSync).toHaveBeenCalledWith(`npx nx run ${nxProjectName}:build`, { stdio: 'inherit' });
        });

        it('should add iOS platform', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(execSync).toHaveBeenCalledWith(`npx nx run ${nxProjectName}:add:ios`, { stdio: 'inherit' });
          expect(execSync).toHaveBeenCalledWith(`npx nx run ${nxProjectName}:sync:ios`, { stdio: 'inherit' });
        });

        it('should add Android platform', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(execSync).toHaveBeenCalledWith(`npx nx run ${nxProjectName}:add:android`, { stdio: 'inherit' });
          expect(execSync).toHaveBeenCalledWith(`npx nx run ${nxProjectName}:sync:android`, { stdio: 'inherit' });
        });

        it('should force fix lint issues', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(execSync).toHaveBeenCalledWith(`npx nx run ${nxProjectName}:lint --fix`, { stdio: 'inherit' });
        });

        it('should inform the user on how to open the project in iOS IDE', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(console.info).toHaveBeenCalledWith(expect.stringContaining(`nx run ${nxProjectName}:open:ios`));
        });

        it('should inform the user on how to open the project in Android IDE', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(console.info).toHaveBeenCalledWith(expect.stringContaining(`nx run ${nxProjectName}:open:android`));
        });

        it('should inform the user on how to rune the android app on simulator or device', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(console.info).toHaveBeenCalledWith(expect.stringContaining(`nx run ${nxProjectName}:serve`));
          expect(console.info).toHaveBeenCalledWith(expect.stringContaining(`nx run ${nxProjectName}:run:android`));
        });

        it('should inform the user on how to rune the iOS app on simulator or device', async () => {
          const onSuccessFn = await applicationGenerator(tree, options);
          onSuccessFn();
          expect(console.info).toHaveBeenCalledWith(expect.stringContaining(`nx run ${nxProjectName}:serve`));
          expect(console.info).toHaveBeenCalledWith(expect.stringContaining(`nx run ${nxProjectName}:run:ios`));
        });
      }
    });
  }
});
