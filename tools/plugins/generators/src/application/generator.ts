import { strings } from '@angular-devkit/core';
import { E2eTestRunner, UnitTestRunner, applicationGenerator as angularApplicationGenerator } from '@nx/angular/generators';
import { ProjectConfiguration, Tree, formatFiles, generateFiles, logger, readProjectConfiguration, updateProjectConfiguration } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { capacitorConfigurationGenerator } from '@nxext/capacitor';
import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { ConfigurationConstants } from '../configuration.constants';
import { ApplicationGeneratorSchema } from './schema';

export async function applicationGenerator(tree: Tree, options: ApplicationGeneratorSchema) {
  const name = strings.dasherize(options.name);
  const platform = options.platform;
  const nxProjectName = ConfigurationConstants.generateNxProjectName(name, platform);
  const tags = `${ConfigurationConstants.tags.generateScope(name)},${ConfigurationConstants.tags.type[platform]}`;

  // Generate Angular application
  await angularApplicationGenerator(tree, {
    name: nxProjectName,
    directory: `${ConfigurationConstants.basePath}/${name}/${platform}`,
    tags,
    bundler: 'esbuild',
    minimal: true,
    standalone: true,
    skipTests: false,
    strict: true,
    e2eTestRunner: E2eTestRunner.None,
    linter: Linter.EsLint,
    routing: true,
    standaloneConfig: true,
    style: 'scss',
    unitTestRunner: UnitTestRunner.Jest,
  });

  const projectConfig = readProjectConfiguration(tree, nxProjectName);
  const appRoot = projectConfig.root;

  // Add mandatory targets to the project
  ConfigurationConstants.addCoverageTargetToProjectConfig(tree, projectConfig);
  ConfigurationConstants.addSonarTargetToProjectConfig(tree, projectConfig);

  // Add proxy target
  if (projectConfig.targets?.['serve'].configurations) {
    projectConfig.targets['serve'].configurations['development'].proxyConfig = `${appRoot}/proxy.conf.json`;
  }

  // Add translations in build
  projectConfig.targets?.['build'].options.assets.push({
    glob: '**/*.json',
    input: `i18n`,
    output: '/assets/i18n',
  });

  // Add img assets in build
  projectConfig.targets?.['build'].options.assets.push({
    glob: '**/*',
    input: 'projects/shared/design-system/src/styles/icons',
    output: '/assets/icons',
  });

  // Add module boundary rule if not already present
  const eslintConfigFilename = 'eslint.config.cjs';
  const eslintConfig = tree.read(eslintConfigFilename, 'utf-8');

  if (!eslintConfig?.includes(`sourceTag: "scope:${name}"`)) {
    // Add content before the anchor
    const anchorIndex =
      eslintConfig?.indexOf('// GENERATOR_NEW_APP_BOUNDARIES_ANCHOR') || eslintConfig?.indexOf('//GENERATOR_NEW_APP_BOUNDARIES_ANCHOR');

    if (anchorIndex === -1) {
      throw new Error('Could not find the ESLint module boundary rule anchor in the ESLint config file.');
    }

    const updatedEslintConfig = `${eslintConfig?.slice(0, anchorIndex).replace(/,\s*$/, '')},
{
  sourceTag: '${ConfigurationConstants.tags.generateScope(name)}',
  onlyDependOnLibsWithTags: ['${ConfigurationConstants.tags.generateScope(`${name}:*`)}', '${ConfigurationConstants.tags.generateScope('shared')}']
},
${eslintConfig?.slice(anchorIndex)}`;

    tree.write(eslintConfigFilename, updatedEslintConfig);
    await formatFiles(tree);
  }

  // Add the UI library to the project
  (projectConfig.targets?.['build'].options['styles'] as string[]).unshift(
    'projects/shared/design-system/src/styles/themes/default_theme-colors.scss',
  );
  (projectConfig.targets?.['build'].options['styles'] as string[]).push('projects/shared/design-system/src/styles/main.scss');

  // Update the project configuration
  updateProjectConfiguration(tree, nxProjectName, projectConfig);

  if (platform === 'mobile') {
    // Update project configuration to:
    // Handle device live reload
    if (projectConfig.targets?.['serve'].configurations) {
      projectConfig.targets['serve'].configurations['development'].host = '0.0.0.0';
      projectConfig.targets['serve'].configurations['development'].liveReload = true;
    }

    const projectName = projectConfig.name ?? '';
    const sanitizedName = projectName.replace('-mobile', '');

    updateProjectConfiguration(tree, projectName, projectConfig);

    // Add capacitor to the project
    await capacitorConfigurationGenerator(tree, {
      appId: `com.cooperl.${sanitizedName}`,
      project: projectName,
      skipFormat: false,
      appName: sanitizedName,
    });
  }

  const workspaceRoot = ((projectConfig as ProjectConfiguration & { $schema: string })['$schema'].split('node_modules').at(0) as string).replace(
    /\/$/,
    '',
  );

  // Update or replace templated files
  const templateVars = {
    strings,
    workspaceRoot,
    platform,
    project: name,
    appName: name,
    routing: {
      guard: platform === 'web' ? 'AuthGuard' : 'ensureAuthenticated',
    },
    appConfig: {
      withInterceptorFn: '',
      provideHttpClientFn: '',
      authenticationEsmImport: 'provideAuthentication',
    },
  };

  switch (platform) {
    case 'web':
      templateVars.appConfig.withInterceptorFn = 'withInterceptorsFromDi';
      templateVars.appConfig.provideHttpClientFn = `provideHttpClient(${templateVars.appConfig.withInterceptorFn}())`;
      break;
    case 'mobile': {
      const addBearerInterceptorName = 'addBearerInterceptor';
      templateVars.appConfig.withInterceptorFn = 'withInterceptors';
      templateVars.appConfig.provideHttpClientFn = `provideHttpClient(${templateVars.appConfig.withInterceptorFn}([${addBearerInterceptorName}]))`;
      templateVars.appConfig.authenticationEsmImport = `${addBearerInterceptorName}, ${templateVars.appConfig.authenticationEsmImport}`;
      break;
    }
  }
  // First the common files
  generateFiles(tree, path.join(__dirname, 'files', 'common'), appRoot, templateVars);
  // Then the platform specific files
  if (platform === 'mobile') {
    generateFiles(tree, path.join(__dirname, 'files', 'mobile'), appRoot, templateVars);
  }

  // Execute commands after changes on the file system has been done
  return () => {
    if (platform === 'mobile') {
      execSync(`npx nx run ${nxProjectName}:build`, { stdio: 'inherit' });
      execSync(`npx nx run ${nxProjectName}:add:ios`, { stdio: 'inherit' });
      execSync(`npx nx run ${nxProjectName}:sync:ios`, { stdio: 'inherit' });
      execSync(`npx nx run ${nxProjectName}:add:android`, { stdio: 'inherit' });
      execSync(`npx nx run ${nxProjectName}:sync:android`, {
        stdio: 'inherit',
      });
      execSync(`npx nx run ${nxProjectName}:lint --fix`, { stdio: 'inherit' });

      logger.info(`Run 'nx run ${nxProjectName}:open:ios' to open the iOS project in Xcode`);
      logger.info(`Run 'nx run ${nxProjectName}:open:android' to open the Android project in Android Studio`);

      logger.info(`Run 'nx run ${nxProjectName}:serve' to serve the application`);
      logger.info(`Run 'nx run ${nxProjectName}:run:ios' to start the livereload server on iOS`);
      logger.info(`Run 'nx run ${nxProjectName}:run:android' to start the livereload server on Android`);

      logger.warn(
        'Add the following XML in the AndroidManifest.xml inside manifest.application.activity tag to enable the default applink redirection :',
      );

      logger.warn(`
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />

  <data android:scheme="myschema" />

  <data android:host="login" />
</intent-filter>
      `);
    }
  };
}

export default applicationGenerator;
