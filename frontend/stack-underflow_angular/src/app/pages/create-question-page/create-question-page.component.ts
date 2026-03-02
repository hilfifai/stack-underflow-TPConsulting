import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { QuestionsService } from '../../services/questions.service';
import { I18nService } from '../../services/i18n.service';
import { CreateQuestionComponent } from '../../components/create-question/create-question.component';

@Component({
  selector: 'app-create-question-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CreateQuestionComponent],
  template: `
    <div class="create-question">
      <div class="create-question-card">
        <h1>{{ t('createQuestion.title') }}</h1>
        <app-create-question></app-create-question>
      </div>
    </div>
  `,
})
export class CreateQuestionPageComponent {
  authService = inject(AuthService);
  questionsService = inject(QuestionsService);
  i18nService = inject(I18nService);

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }
}
