import { TestBed } from '@angular/core/testing';
import { provideAuthConfigs } from '@cooperl/authentication';
import { provideKeycloak } from 'keycloak-angular';
import { provideAuthentication } from './authentication.provider';
import { provideIncludeBearerTokenInterceptor } from './provide-include-bearer-token-interceptor';

jest.mock('@cooperl/authentication', () => ({
  ...jest.requireActual('@cooperl/authentication'),
  provideAuthConfigs: jest.fn(),
}));

jest.mock('keycloak-angular', () => ({
  ...jest.requireActual('keycloak-angular'),
  provideKeycloak: jest.fn(),
}));

jest.mock('./provide-include-bearer-token-interceptor', () => ({
  provideIncludeBearerTokenInterceptor: jest.fn(),
}));

describe('[Shared - Authentication - Web] provideAuthentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAuthentication()],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should provide authentication configurations', () => {
    expect(provideAuthConfigs).toHaveBeenCalledTimes(1);
  });

  it('should provide keycloak configuration', () => {
    expect(provideKeycloak).toHaveBeenCalledTimes(1);
  });

  it('should provide include bearer token interceptor', () => {
    expect(provideIncludeBearerTokenInterceptor).toHaveBeenCalledTimes(1);
  });
});
