import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="app">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  constructor(private i18nService: I18nService) {
    this.i18nService.init();
  }
}
