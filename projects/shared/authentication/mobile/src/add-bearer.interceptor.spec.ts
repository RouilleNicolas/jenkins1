import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AUTH_CONFIGS } from '@cooperl/authentication';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { addBearerInterceptor } from './add-bearer.interceptor';

describe('addBearerInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  let mockOAuthStorage: OAuthStorage;
  let mockAuthConfigs: any;

  beforeEach(() => {
    mockOAuthStorage = {
      getItem: jest.fn()
    } as unknown as OAuthStorage;

    mockAuthConfigs = {
      apiBaseUrl: 'https://api.example.com',
      keycloak: {
        bearerPrefix: 'Bearer'
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: OAuthStorage, useValue: mockOAuthStorage },
        { provide: AUTH_CONFIGS, useValue: mockAuthConfigs },
        provideHttpClient(withInterceptors([addBearerInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should add bearer token to request if URL matches and token is present', async () => {
    const token = 'test-token';
    mockOAuthStorage.getItem = jest.fn().mockReturnValue(token);

    httpClient.get('https://api.example.com/resource').subscribe();

    const req = httpTesting.expectOne('https://api.example.com/resource');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});
  });

  it('should not add bearer token to request if URL does not match', () => {
    const token = 'test-token';
    mockOAuthStorage.getItem = jest.fn().mockReturnValue(token);

    httpClient.get('https://otherapi.example.com/resource').subscribe();

    const req = httpTesting.expectOne('https://otherapi.example.com/resource');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should not add bearer token to request if token is not present', () => {
    mockOAuthStorage.getItem = jest.fn().mockReturnValue(null);

    httpClient.get('https://api.example.com/resource').subscribe();

    const req = httpTesting.expectOne('https://api.example.com/resource');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
