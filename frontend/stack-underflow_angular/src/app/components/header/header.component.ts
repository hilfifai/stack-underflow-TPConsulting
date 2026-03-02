import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  i18nService = inject(I18nService);

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  changeLanguage(lng: string): void {
    this.i18nService.setLocale(lng);
  }

  logout(): void {
    this.authService.logout();
  }
}
