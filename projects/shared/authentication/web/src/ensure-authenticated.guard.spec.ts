import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuardData } from 'keycloak-angular';
import { internalEnsureAuthenticated } from './ensure-authenticated.guard';

const createAuthDataFake = (authenticated: boolean): AuthGuardData => ({
  authenticated,
  grantedRoles: {
    realmRoles: [],
    resourceRoles: {},
  },
  keycloak: {
    login: jest.fn(),
  } as unknown as AuthGuardData['keycloak'],
});

describe('AuthGuard', () => {
  let route = new ActivatedRouteSnapshot();
  let state: RouterStateSnapshot = { url: '/test' } as RouterStateSnapshot;

  beforeEach(() => {
    const routerSpy = { navigate: jest.fn() };
    route = new ActivatedRouteSnapshot();
    state = { url: '/test' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
  });

  it('should call keycloak login if not authenticated', async () => {
    const authDataFake = createAuthDataFake(false);
    await internalEnsureAuthenticated(route, state, authDataFake);

    expect(authDataFake.keycloak.login).toHaveBeenCalledWith({
      redirectUri: window.location.origin + state.url,
    });
  });

  it('should return true if authenticated', async () => {
    const authDataFake = createAuthDataFake(true);
    const result = await internalEnsureAuthenticated(route, state, authDataFake);

    expect(result).toBe(true);
  });
});
