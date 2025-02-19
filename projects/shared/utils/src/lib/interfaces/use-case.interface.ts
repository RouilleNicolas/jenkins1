import { ResourceRef } from '@angular/core';
import { Async } from '../types';

export interface UseCase<T> {
  execute(...params: unknown[]): T;
}

export type UseCaseAsync<T> = UseCase<Async<T>>;

export type UseCaseResource<T> = UseCase<ResourceRef<T | undefined>>;
