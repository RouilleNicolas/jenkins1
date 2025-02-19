import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Params, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ensureAuthenticated } from './ensure-authenticated.guard';

describe('ensureAuthenticated', () => {
  it('should allow access if redirected from OAuth server', async () => {
    const { route } = configureTestingModule({ code: 'some-code', state: 'some-state', session_state: 'some-session-state' });

    const result = await TestBed.runInInjectionContext(() => ensureAuthenticated(route, {} as RouterStateSnapshot));
    expect(result).toBe(true);
  });

  it('should allow access if OAuthService login is successful', async () => {
    const { route, oauthService } = configureTestingModule();
    oauthService.loadDiscoveryDocumentAndLogin.mockResolvedValue(true);

    const result = await TestBed.runInInjectionContext(() => ensureAuthenticated(route, {} as RouterStateSnapshot));
    expect(result).toBe(true);
  });

  it('should deny access if OAuthService login fails', async () => {
    const { route, oauthService } = configureTestingModule();
    oauthService.loadDiscoveryDocumentAndLogin.mockResolvedValue(false);

    const result = await TestBed.runInInjectionContext(() => ensureAuthenticated(route, {} as RouterStateSnapshot));
    expect(result).toBe(false);
  });
});

function configureTestingModule(params: Params = {}) {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: OAuthService,
        useValue: {
          loadDiscoveryDocumentAndLogin: jest.fn(),
        }
      },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            url: [{ path: 'some-path' }],
            queryParamMap: convertToParamMap(params)
          }
        }
      }
    ],
  });

  return {
    route: TestBed.inject(ActivatedRoute).snapshot,
    oauthService: TestBed.inject(OAuthService) as jest.Mocked<OAuthService>,
  }
}
