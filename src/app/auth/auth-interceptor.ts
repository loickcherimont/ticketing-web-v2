import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Attaches the JWT token to `/api/*` requests when a user is logged in, and
 * redirects to `/login` when the API answers `401 Unauthorized`.
 *
 * The signin request is excluded from the redirect: a `401` on
 * `/api/auth/signin` simply means invalid credentials and is handled by the
 * login form itself.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.token();

  if (token !== null && req.url.includes('/api')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/signin')) {
        // Clears the local session and redirects to `/login`.
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
