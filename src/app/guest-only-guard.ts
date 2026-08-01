import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login-form/login-service';

// If user is authenticated
// Redirect to its authorized workspace
// Else go on /login
export const guestOnlyGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.isAuthenticated()) return true;

  return router.createUrlTree([loginService.homePath()]);
};
