import { Tree, readProjectConfiguration } from '@nx/devkit';
import { TsConfig } from './ts-config.interface';

export const readProjectTsConfig = (tree: Tree, project: string): TsConfig => {
  const { root } = readProjectConfiguration(tree, project);

  return JSON.parse(tree.read(`${root}/tsconfig.json`)?.toString() ?? "{}");
};
