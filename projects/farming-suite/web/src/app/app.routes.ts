import { Route } from '@angular/router';
import { ensureAuthenticated } from '@cooperl/authentication/web';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [ensureAuthenticated],
    canActivateChild: [ensureAuthenticated],
    children: [
      // TODO : Temporary redirect to animal-sheet by default
      { path: '', redirectTo: 'animal-sheet', pathMatch: 'full' },
      {
        path: 'animal-sheet',
        loadChildren: () => import('@cooperl/farming-suite/animal-sheet/routing').then((m) => m.AnimalSheetRoutes),
      },
    ],
  },
];
