import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

// This is exported only to facilitate testing. It should not be used directly.
export const internalEnsureAuthenticated = async (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot, authData: AuthGuardData) => {
  if (!authData.authenticated) {
    await authData.keycloak.login({
      redirectUri: window.location.origin + state.url,
    });
  }

  return authData.authenticated;
}

export const ensureAuthenticated: CanActivateFn = createAuthGuard(internalEnsureAuthenticated);
