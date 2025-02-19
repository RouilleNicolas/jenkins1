import { Routes } from '@angular/router';

export const AnimalSheetRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      {
        path: 'general',
        loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.GeneralPageComponent),
        title: 'farming-suite.animal-sheet.pages.general.route-title',
      },
      {
        path: 'career',
        loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.CareerPageComponent),
        title: 'farming-suite.animal-sheet.pages.career.route-title',
      },
      {
        path: 'measures',
        loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.MeasuresPageComponent),
        title: 'farming-suite.animal-sheet.pages.measures.route-title',
      },
      {
        path: 'internal-movement',
        loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.InternalMovementPageComponent),
        title: 'farming-suite.animal-sheet.pages.internal-movement.route-title',
      },
      {
        path: 'comments',
        loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.CommentsPageComponent),
        title: 'farming-suite.animal-sheet.pages.comments.route-title',
      },
      {
        path: 'treatments',
        loadComponent: () => import('@cooperl/farming-suite/animal-sheet/views').then((m) => m.TreatmentsPageComponent),
        title: 'farming-suite.animal-sheet.pages.treatments.route-title',
      },
      {
        path: '**',
        redirectTo: 'general',
      },
    ],
  },
  {
    path: '**',
    // TODO : This is a temporary redirect to a fake id
    redirectTo: '1',
  },
];
