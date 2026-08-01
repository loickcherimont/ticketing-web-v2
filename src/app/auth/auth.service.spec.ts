import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be authenticated by default', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.token()).toBeNull();
    expect(service.role()).toBeNull();
  });

  it('should restore credentials from localStorage', () => {
    localStorage.setItem(
      'credentials',
      JSON.stringify({ token: 'jwt', email: 'a@b.c', role: 'AGENT' }),
    );
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    expect(service.isAuthenticated()).toBe(true);
    expect(service.token()).toBe('jwt');
    expect(service.role()).toBe('AGENT');
  });

  it('should store credentials and update state', () => {
    service.storeCredentials({ token: 'jwt', email: 'a@b.c', role: 'USER' });
    expect(service.isAuthenticated()).toBe(true);
    expect(service.token()).toBe('jwt');
    expect(service.role()).toBe('USER');
  });
});
