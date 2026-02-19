import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">{{ t('signup.title') }}</h1>
        <p class="login-subtitle">{{ t('signup.subtitle') }}</p>
        @if (error) {
          <div class="error-message">{{ error }}</div>
        }
        <form (ngSubmit)="handleSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">{{ t('signup.usernameLabel') }}</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              [placeholder]="t('signup.usernamePlaceholder')"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">{{ t('signup.passwordLabel') }}</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              [placeholder]="t('signup.passwordPlaceholder')"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">{{ t('signup.confirmPasswordLabel') }}</label>
            <input
              type="password"
              id="confirmPassword"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              [placeholder]="t('signup.confirmPasswordPlaceholder')"
              required
            />
          </div>
          <button type="submit" class="login-button">
            {{ t('signup.signupButton') }}
          </button>
        </form>
        <p class="login-note">
          {{ t('signup.alreadyHaveAccount') }}
          <a routerLink="/login" class="link">{{ t('signup.loginHere') }}</a>
        </p>
      </div>
    </div>
  `,
})
export class SignupPageComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  i18nService = inject(I18nService);

  username = '';
  password = '';
  confirmPassword = '';
  error = '';

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  handleSubmit(): void {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = this.t('signup.errors.passwordsNotMatch');
      return;
    }
    if (this.authService.signup(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = this.t('signup.errors.usernameExists');
    }
  }
}
