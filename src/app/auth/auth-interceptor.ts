import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../login-form/login-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const loginService = inject(LoginService);
  const token = loginService.token();

  if (token !== null) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}`}
    });
  }
  return next(req);
};
