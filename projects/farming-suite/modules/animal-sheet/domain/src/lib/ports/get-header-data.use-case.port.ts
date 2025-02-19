import { InjectionToken } from '@angular/core';
import { UseCaseResource } from '@cooperl/utils';
import { AnimalSheetHeader } from '../models';

export type GetHeaderDataUseCase = UseCaseResource<AnimalSheetHeader>;

export const GetHeaderDataUseCase = new InjectionToken<GetHeaderDataUseCase>('GetHeaderDataUseCase implementation');
