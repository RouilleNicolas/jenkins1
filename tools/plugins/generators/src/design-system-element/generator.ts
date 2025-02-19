import { strings } from '@angular-devkit/schematics';
import { componentStoryGenerator, librarySecondaryEntryPointGenerator } from '@nx/angular/generators';
import { logger, Tree } from '@nx/devkit';
import { ConfigurationConstants } from '../configuration.constants';
import { DesignSystemElementGeneratorSchema } from './schema';

const designSystemPath = `${ConfigurationConstants.basePath}/shared/design-system`;

export async function designSystemElementGenerator(tree: Tree, options: DesignSystemElementGeneratorSchema) {
  const name = strings.dasherize(options.name);
  const parentDirectory = options.formElement ? `form-element/${options.type}` : options.type;

  if (!tree.exists(designSystemPath)) {
    logger.info('Design System not found, creating it now');
    const { projectSharedGenerator } = await import('../project/shared/generator')
    await projectSharedGenerator(tree, { name: 'design-system', storybook: true });
  }

  await librarySecondaryEntryPointGenerator(tree, {
    name: `${parentDirectory}/${name}`,
    library: 'design-system',
    skipModule: true,
  });

  const directory = `${designSystemPath}/${parentDirectory}/${name}/src`;

  switch (options.type) {
    case 'component': {
      const { componentGenerator } = await import('@nx/angular/generators');
      await componentGenerator(tree, {
        path: `${directory}/${name}`,
        changeDetection: 'OnPush',
        style: 'scss',
        export: true,
        displayBlock: true,
      });
      break;
    }
    case 'directive': {
      const { directiveGenerator } = await import('@nx/angular/generators');
      await directiveGenerator(tree, {
        name,
        path: `${directory}/${name}`,
        export: true,
      });
      break;
    }
    case 'pipe': {
      const { pipeGenerator } = await import('@nx/angular/generators')
      await pipeGenerator(tree, {
        name,
        path: `${directory}/${name}`,
        export: true,
      });
      break;
    }
    default:
      throw new Error(`Invalid type: ${options.type}`);
  }

  // Ensure barrel file exports only the generated element
  tree.write(`${directory}/index.ts`, `export * from './${name}.${options.type}';`);

  // Generate Stories
  await componentStoryGenerator(tree, {
    componentFileName: `${name}.${options.type}`,
    componentName: `${strings.classify(name)}${strings.classify(options.type)}`,
    componentPath: `${parentDirectory}/${name}/src`,
    projectPath: designSystemPath,
    interactionTests: true,
  });
}

export default designSystemElementGenerator;
