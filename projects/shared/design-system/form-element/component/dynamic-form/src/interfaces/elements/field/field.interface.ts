export interface Field {
  hidden?: boolean;
  disabled?: boolean;
  required?: boolean;
  hideRequiredMarker?: boolean;
  errorRequiredMessage?: string;
  subscriptSizing?: 'dynamic' | 'static';
}
