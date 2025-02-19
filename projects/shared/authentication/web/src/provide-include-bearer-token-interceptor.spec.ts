import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AUTH_CONFIGS } from '@cooperl/authentication';
import { CustomBearerTokenCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG } from 'keycloak-angular';
import { provideIncludeBearerTokenInterceptor } from './provide-include-bearer-token-interceptor';

describe('[Shared - Authentication - Web] provideIncludeBearerTokenInterceptor', () => {
  let authConfigsMock: any;

  beforeEach(async () => {
    authConfigsMock = {
      apiBaseUrl: 'http://example.com/api',
      keycloak: {
        authenticated: true,
        bearerPrefix: 'Bearer ',
      },
    };

    TestBed.configureTestingModule({
      providers: [provideIncludeBearerTokenInterceptor(), { provide: AUTH_CONFIGS, useValue: authConfigsMock }],
    });
  });

  it('should add token if request URL starts with apiBaseUrl and keycloak is authenticated', async () => {
    const interceptorConfig = TestBed.inject(INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG);
    const urlCondition = interceptorConfig[0] as unknown as CustomBearerTokenCondition;

    const reqMock = { url: 'http://example.com/api/resource' } as HttpRequest<unknown>;
    const shouldAddToken = await urlCondition.shouldAddToken(reqMock, jest.fn(), authConfigsMock.keycloak);
    expect(shouldAddToken).toBe(true);
  });

  it('should not add token if request URL does not start with apiBaseUrl', async () => {
    const interceptorConfig = TestBed.inject(INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG);
    const urlCondition = interceptorConfig[0] as unknown as CustomBearerTokenCondition;

    const reqMock = { url: 'http://example.com/other/resource' } as HttpRequest<unknown>;
    const shouldAddToken = await urlCondition.shouldAddToken(reqMock, jest.fn(), authConfigsMock.keycloak);
    expect(shouldAddToken).toBe(false);
  });

  it('should not add token if keycloak is not authenticated', async () => {
    authConfigsMock.keycloak.authenticated = false;
    const interceptorConfig = TestBed.inject(INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG);
    const urlCondition = interceptorConfig[0] as unknown as CustomBearerTokenCondition;

    const reqMock = { url: 'http://example.com/api/resource' } as HttpRequest<unknown>;
    const shouldAddToken = await urlCondition.shouldAddToken(reqMock, jest.fn(), authConfigsMock.keycloak);
    expect(shouldAddToken).toBe(false);
  });
});
