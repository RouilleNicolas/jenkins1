import { Provider, Type } from '@angular/core';
import { ComponentInput, render } from '@testing-library/angular';
import { getTestingModules } from './get-testing-modules';
import { provideTestingProviders } from './provide-testing-providers';

interface Params<TComponent> {
  inputs?: ComponentInput<TComponent>;
  providers?: Provider[];
}

export async function renderElement<TComponent>(component: Type<TComponent>, params?: Params<TComponent>) {
  const inputs = params?.inputs ?? {};
  const providers = params?.providers ?? [];

  return await render(component, {
    providers: [provideTestingProviders(), ...providers],
    imports: [getTestingModules()],
    inputs,
  });
}
