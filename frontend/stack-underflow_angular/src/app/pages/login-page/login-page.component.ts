import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">{{ t('login.title') }}</h1>
        <p class="login-subtitle">{{ t('login.subtitle') }}</p>
        <form (ngSubmit)="handleSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">{{ t('login.usernameLabel') }}</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              [placeholder]="t('login.usernamePlaceholder')"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">{{ t('login.passwordLabel') }}</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              [placeholder]="t('login.passwordPlaceholder')"
              required
            />
          </div>
          <button type="submit" class="login-button">
            {{ t('login.loginButton') }}
          </button>
        </form>
        <p class="login-note">{{ t('login.note') }}</p>
      </div>
    </div>
  `,
})
export class LoginPageComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  i18nService = inject(I18nService);

  username = '';
  password = '';

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  handleSubmit(): void {
    if (this.username.trim()) {
      this.authService.login(this.username, this.password);
      this.router.navigate(['/']);
    }
  }
}
