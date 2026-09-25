import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {

  private router = inject(Router);
  private authService = inject(AuthService);

  /**
   * Navigates back home: to the workspace when logged in, to `/login` otherwise.
   */
  goHome() {
    this.router.navigate([this.authService.isAuthenticated() ? this.authService.homePath() : '/login']);
  }
}