import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LoginService } from '../login-form/login-service';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink],
  templateUrl: './forbidden.html',
})
export class Forbidden {
  private loginService = inject(LoginService);

  protected authorizedPath = signal(this.loginService.homePath()); 
}
