import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginModel } from './login-model';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { LoginService } from './login-service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormField, FormRoot],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {

  private loginService = inject(LoginService);
  private router = inject(Router);

  loginModel = signal<LoginModel>({
    email: '',
    password: ''
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email requis' });
    required(schemaPath.password, { message: 'Mot de passe requis' });
  }, {
    submission: {
      action: async (field) => {
        try {
          await firstValueFrom(this.loginService.login(field().value()));
          if (this.loginService.role() === 'AGENT') {
            this.router.navigate(['/agent']);

          } else if (this.loginService.role() === 'USER') {
            this.router.navigate(['/customer']);
          }
          return undefined;
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : 'Email et/ou mot de passe incorrect'
          return { kind: 'login-failed', message }
        }
      }
    }
  });
}
