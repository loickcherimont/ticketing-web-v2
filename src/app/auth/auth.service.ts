import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginModel } from './login-model';
import { LoginResponseDto } from './login-response-dto';

/**
 * Handles authentication: calls the API, persists the JWT in localStorage and
 * exposes the authentication state (token, role, home path).
 *
 * Faithful to the API contract:
 * - POST /api/auth/signin with `{ email, password }`
 * - response `{ token, email, role }`
 */
@Service()
export class AuthService {

  /** localStorage key used to persist credentials (JWT + profile). */
  private readonly STORAGE_KEY = 'credentials';

  private http = inject(HttpClient);
  private router = inject(Router);

  /**
   * Signal holding the current session. Initialized from localStorage so the
   * session survives a page reload.
   */
  private loginResponse = signal<LoginResponseDto | null>(this.restoreCredentials());

  /** Read-only authentication state exposed to components. */
  loginState = this.loginResponse.asReadonly();

  /** `true` when a user is logged in (JWT present). */
  isAuthenticated = computed(() => this.loginResponse() !== null);

  /** JWT to attach to the `Authorization: Bearer <token>` header. */
  token = computed(() => this.loginResponse()?.token ?? null);

  /** Role of the logged-in user (`'USER'` or `'AGENT'`), `null` when logged out. */
  role = computed(() => this.loginResponse()?.role ?? null);

  /** Default redirect path after login. */
  homePath = computed(() => '/tickets');

  /**
   * Persists the credentials in memory and in localStorage.
   * @param credentials signin API response (token + email + role)
   */
  storeCredentials(credentials: LoginResponseDto) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(credentials));
    this.loginResponse.set(credentials);
  }

  /**
   * Authenticates the user via `POST /api/auth/signin`.
   * The JWT is stored automatically once the response arrives.
   */
  login(loginModel: LoginModel): Observable<LoginResponseDto> {
    return this.http
      .post<LoginResponseDto>(`${environment.apiUrl}/auth/signin`, loginModel)
      .pipe(tap((response) => this.storeCredentials(response)));
  }

  /** Logs the user out: clears the local session then redirects to `/login`. */
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loginResponse.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Reads the persisted credentials from localStorage.
   * Returns `null` when no valid data is present.
   */
  private restoreCredentials(): LoginResponseDto | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    try {
      return JSON.parse(raw) as LoginResponseDto;
    } catch {
      return null;
    }
  }
}
