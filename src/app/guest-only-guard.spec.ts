import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { guestOnlyGuard } from './guest-only-guard';
import { AuthService } from './auth/auth.service';

describe('guestOnlyGuard', () => {
  const executeGuard: CanActivateFn = (route, state) =>
    TestBed.runInInjectionContext(() => guestOnlyGuard(route, state));

  const fakeRoute = {} as ActivatedRouteSnapshot;
  const fakeState = {} as RouterStateSnapshot;

  let authServiceMock: { isAuthenticated: ReturnType<typeof vi.fn>, homePath: ReturnType<typeof vi.fn> };
  let routerMock: { createUrlTree: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authServiceMock = { isAuthenticated: vi.fn(), homePath: vi.fn() };
    routerMock = { createUrlTree: vi.fn((commands) => ({ commands })) };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should allow access to the login page when the user is not authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    expect(executeGuard(fakeRoute, fakeState)).toBe(true);
    expect(routerMock.createUrlTree).not.toHaveBeenCalled();
  });

  it('should redirect to the home path when the user is authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);
    authServiceMock.homePath.mockReturnValue('/tickets');

    executeGuard(fakeRoute, fakeState);

    expect(authServiceMock.homePath).toHaveBeenCalled();
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/tickets']);
  });
});
