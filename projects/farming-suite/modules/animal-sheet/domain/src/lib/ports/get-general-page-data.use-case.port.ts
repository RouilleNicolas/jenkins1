import { InjectionToken } from '@angular/core';
import { UseCaseResource } from '@cooperl/utils';
import { GeneralPageData } from '../models';

export type GetGeneralPageDataUseCase = UseCaseResource<GeneralPageData>;

export const GetGeneralPageDataUseCase = new InjectionToken<GetGeneralPageDataUseCase>('GetGeneralPageDataUseCase implementation');
