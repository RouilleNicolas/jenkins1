jest.mock('node:child_process');
import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { execSync } from 'node:child_process';
import { ConfigurationConstants } from '../../configuration.constants';
import { projectSharedGenerator } from './generator';
import { ProjectSharedGeneratorSchema } from './schema';

describe('project-shared generator', () => {
  let tree: Tree;
  const options: ProjectSharedGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    // Avoid generating warnings
    tree.write('.gitignore', '');

    // Ensure options.storybook is default
    options.storybook = false;
  });

  it('should run successfully', async () => {
    await projectSharedGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });

  it('should generate a library in the shared projects directory', async () => {
    await projectSharedGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config.root).toEqual(
      `${ConfigurationConstants.basePath}/shared/test`,
    );
  });

  it('should set the prefix to the name of the project', async () => {
    await projectSharedGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config.tags).toStrictEqual([
      ConfigurationConstants.tags.generateScope('shared'),
    ]);
  });

  it('should force fix lint issues on generated project', async () => {
    const onSuccessFn = await projectSharedGenerator(tree, options);
    onSuccessFn();
    expect(execSync).toHaveBeenCalledWith(`npx nx run test:lint --fix`, {
      stdio: 'inherit',
    });
  });
});
