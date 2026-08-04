import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { LoginModel } from './login-model';
import { LoginResponseDto } from './login-response-dto';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    routerMock = { navigate: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should persist credentials in localStorage and memory', () => {
    const credentials: LoginResponseDto = {
      token: 'secret-token',
      email: 'test@gmail.com',
      role: 'USER',
    };

    service.storeCredentials(credentials);
    expect(service.loginState()).toStrictEqual(credentials);
    expect(localStorage.getItem(service.STORAGE_KEY)).toBe(
      JSON.stringify(credentials),
    );
  });

  it('should return credentials for connected user with POST', () => {
    const expectedCredentials: LoginResponseDto = {
      token: 'secret-token',
      email: 'test@gmail.com',
      role: 'USER',
    };
    const loginModel: LoginModel = {
      email: 'test@gmail.com',
      password: 'test123',
    };
    let received: LoginResponseDto | undefined;

    service.login(loginModel).subscribe((credentials) => {
      received = credentials;
    });

    const req = httpTesting.expectOne('http://localhost:8080/api/auth/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginModel);
    req.flush(expectedCredentials);

    expect(received).toStrictEqual(expectedCredentials);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should not be authenticated by default', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.token()).toBeNull();
    expect(service.role()).toBeNull();
  });

  it('should expose the default home path', () => {
    expect(service.homePath()).toBe('/tickets');
  });

  it('should restore credentials from localStorage', () => {
    localStorage.setItem(
      service.STORAGE_KEY,
      JSON.stringify({ token: 'jwt', email: 'a@b.c', role: 'AGENT' }),
    );
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ],
    });
    service = TestBed.inject(AuthService);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.token()).toBe('jwt');
    expect(service.role()).toBe('AGENT');
  });

  it('should not authenticate when localStorage contains invalid JSON', () => {
    localStorage.setItem(service.STORAGE_KEY, 'pas-du-json{');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ],
    });
    service = TestBed.inject(AuthService);

    expect(service.isAuthenticated()).toBe(false);
    expect(service.token()).toBeNull();
  });

  it('should logout: clear session and redirect to login', () => {
    service.storeCredentials({
      token: 'secret-token',
      email: 'test@gmail.com',
      role: 'USER',
    });
    expect(service.isAuthenticated()).toBe(true);

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.token()).toBeNull();
    expect(localStorage.getItem(service.STORAGE_KEY)).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
