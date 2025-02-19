import { ClassProvider, FactoryProvider, InjectionToken, Provider, Type } from "@angular/core";
import { Async } from "@cooperl/utils";
import { FetchActions } from "./elements/fetch-actions.type";
import { SelectableItem } from "./elements/selectable-item.interface";
import { FetchActionResponse } from "./fetch-action-response.interface";

export interface FetchActionsProvider<T extends SelectableItem = SelectableItem> {
  fetchActionMap: Map<FetchActions, () => Async<FetchActionResponse<T>>>;
}

export const FetchActionsProvider = new InjectionToken<FetchActionsProvider>('FetchActionsProvider');

export function provideFetchActionsProvider(provider: Type<FetchActionsProvider>): Provider;
export function provideFetchActionsProvider(provider: () => FetchActionsProvider): Provider;
export function provideFetchActionsProvider(provider: Type<FetchActionsProvider> | (() => FetchActionsProvider)): Provider {
  const dynamicFormRadioFetchActionProvider: Provider = {
    provide: FetchActionsProvider,
  } as Provider;

  if (provider.prototype) {
    (dynamicFormRadioFetchActionProvider as ClassProvider).useClass = provider as Type<FetchActionsProvider>;
  } else if (typeof provider === 'function') {
    (dynamicFormRadioFetchActionProvider as FactoryProvider).useFactory = provider;
  }

  return dynamicFormRadioFetchActionProvider;
}
