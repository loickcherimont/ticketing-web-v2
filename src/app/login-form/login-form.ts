import { Component, inject, signal } from '@angular/core';
import { LoginModel } from '../auth/login-model';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { getErrorMessage } from '../common/api-error';

@Component({
  selector: 'app-login-form',
  imports: [FormField, FormRoot],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {

  private authService = inject(AuthService);
  private router = inject(Router);

  loginModel = signal<LoginModel>({
    email: '',
    password: ''
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'L\'email est requis' });
    required(schemaPath.password, { message: 'Le mot de passe est requis' });
  }, {
    submission: {
      action: async (field) => {
        try {
          await firstValueFrom(this.authService.login(field().value()));
          this.router.navigate([this.authService.homePath()]);
          return undefined;
        } catch (e: unknown) {
          const message = getErrorMessage(e, 'Email et/ou mot de passe incorrect');
          return { kind: 'login-failed', message }
        }
      }
    }
  });
}
