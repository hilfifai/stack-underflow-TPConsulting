import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';
import { QuestionListComponent } from '../../components/question-list/question-list.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, QuestionListComponent],
  template: `
    <div class="question-list">
      <div class="question-list-header">
        <h2>{{ t('questionList.title') }}</h2>
        @if (authService.isAuthenticated) {
          <a routerLink="/questions/new" class="btn-primary">
            {{ t('questionList.askQuestion') }}
          </a>
        }
      </div>
      <app-question-list></app-question-list>
    </div>
  `,
})
export class HomePageComponent implements OnInit {
  questionsService = inject(QuestionsService);
  authService = inject(AuthService);
  i18nService = inject(I18nService);

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  ngOnInit(): void {
    this.questionsService.fetchQuestions();
  }
}

import { AuthService } from '../../services/auth.service';
