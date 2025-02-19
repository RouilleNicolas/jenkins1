export interface TsConfig {
  compilerOptions: {
    paths: Record<string, string[]>;
    strict: boolean;
  };
  angularCompilerOptions: {
    strictInjectionParameters: boolean;
    strictInputAccessModifiers: boolean;
    strictTemplates: boolean;
  };
}
