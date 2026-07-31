import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login-form/login-service';

export const authGuard: CanActivateFn = () => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

export const roleGuard = (requiredRole: 'USER' | 'AGENT'): CanActivateFn => {
  return () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.role() === requiredRole) {
      return true;
    }

    return router.createUrlTree(['/forbidden']);
  }
}
