import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuestionDetailComponent } from '../../components/question-detail/question-detail.component';
import { QuestionsService } from '../../services/questions.service';
import { I18nService } from '../../services/i18n.service';
import { Question } from '../../types';

@Component({
  selector: 'app-question-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, QuestionDetailComponent],
  template: `
    @if (question()) {
      <app-question-detail [question]="question()!"></app-question-detail>
    } @else if (loading()) {
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>{{ t('questionDetail.submitting') }}</p>
      </div>
    } @else {
      <div class="not-found">
        <h2>{{ t('questionDetail.notFound') }}</h2>
        <a routerLink="/" class="btn-primary">{{ t('questionDetail.backToQuestions') }}</a>
      </div>
    }
  `,
})
export class QuestionDetailPageComponent implements OnInit {
  @Input() id = '';
  
  private questionsService = inject(QuestionsService);
  i18nService = inject(I18nService);

  question = signal<Question | null>(null);
  loading = signal(true);

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  ngOnInit(): void {
    this.loadQuestion();
  }

  private async loadQuestion(): Promise<void> {
    this.loading.set(true);
    const q = await this.questionsService.fetchQuestionById(this.id);
    this.question.set(q);
    this.loading.set(false);
  }
}
