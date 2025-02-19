export interface DesignSystemElementGeneratorSchema {
  name: string;
  type: 'component' | 'directive' | 'pipe';
  formElement?: boolean;
}
