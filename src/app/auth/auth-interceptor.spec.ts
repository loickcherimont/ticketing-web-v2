import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  let authServiceMock: { token: ReturnType<typeof vi.fn>, logout: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authServiceMock = { token: vi.fn(), logout: vi.fn() };
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });
  });

  /** Appelle l'interceptor avec une fausse requête et un faux "next". */
  const runInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  it('should add the Authorization header to /api requests when a token exists', () => {
    authServiceMock.token.mockReturnValue('my-token');
    let sentReq: HttpRequest<unknown> | undefined;
    const next: HttpHandlerFn = (req) => {
      sentReq = req;
      return of({} as HttpEvent<unknown>);
    };

    runInterceptor(new HttpRequest('GET', '/api/tickets'), next).subscribe();

    expect(sentReq?.headers.get('Authorization')).toBe('Bearer my-token');
  });

  it('should not add the Authorization header when there is no token', () => {
    authServiceMock.token.mockReturnValue(null);
    let sentReq: HttpRequest<unknown> | undefined;
    const next: HttpHandlerFn = (req) => {
      sentReq = req;
      return of({} as HttpEvent<unknown>);
    };

    runInterceptor(new HttpRequest('GET', '/api/tickets'), next).subscribe();

    expect(sentReq?.headers.get('Authorization')).toBeNull();
  });

  it('should not add the Authorization header to non-API requests', () => {
    authServiceMock.token.mockReturnValue('my-token');
    let sentReq: HttpRequest<unknown> | undefined;
    const next: HttpHandlerFn = (req) => {
      sentReq = req;
      return of({} as HttpEvent<unknown>);
    };

    runInterceptor(new HttpRequest('GET', '/assets/logo.png'), next).subscribe();

    expect(sentReq?.headers.get('Authorization')).toBeNull();
  });

  it('should logout and rethrow the error on a 401 response', () => {
    authServiceMock.token.mockReturnValue('my-token');
    const next: HttpHandlerFn = () =>
      throwError(() => new HttpErrorResponse({ status: 401 }));
    let errorReceived = false;

    runInterceptor(new HttpRequest('GET', '/api/tickets'), next).subscribe({
      error: () => (errorReceived = true),
    });

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(errorReceived).toBe(true);
  });

  it('should not logout on a 401 from the signin request', () => {
    authServiceMock.token.mockReturnValue('my-token');
    const next: HttpHandlerFn = () =>
      throwError(() => new HttpErrorResponse({ status: 401 }));

    runInterceptor(new HttpRequest('POST', '/api/auth/signin', {}), next).subscribe({
      error: () => {},
    });

    expect(authServiceMock.logout).not.toHaveBeenCalled();
  });
});
