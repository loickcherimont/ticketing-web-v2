import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { LoginModel } from './login-model';
import { Observable, tap } from 'rxjs';
import { LoginResponseDto } from './login-response-dto';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Service()
export class LoginService {

  private readonly STORAGE_KEY = 'credentials';
  private http = inject(HttpClient);
  private loginResponse = signal<LoginResponseDto | null>(this.restoreCredentials());
  private router = inject(Router);
  loginState = this.loginResponse.asReadonly();
  isAuthenticated = computed(() => this.loginResponse() !== null);
  token = computed(() => this.loginResponse()?.token ?? null);
  role = computed(() => this.loginResponse()?.role ?? null);

  storeCredentials(credentials: LoginResponseDto) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(credentials));
    this.loginResponse.set(credentials);
  }

  login(loginModel: LoginModel): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${environment.apiUrl}/auth/signin`, loginModel).pipe(tap(loginResponseDto => { this.storeCredentials(loginResponseDto) }));
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loginResponse.set(null);
    this.router.navigate(['/login']);
  }

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
