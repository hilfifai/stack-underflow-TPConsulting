import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { I18nService } from '../../services/i18n.service';
import { Question, QuestionStatus } from '../../types';
import { formatDate } from '../../utils/format-date';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {
  questionsService = inject(QuestionsService);
  i18nService = inject(I18nService);

  searchQuery = signal('');
  statusFilter = signal<QuestionStatus | ''>('');
  statuses: QuestionStatus[] = ['open', 'answered', 'closed'];

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  filteredQuestions = computed(() => {
    let questions = this.questionsService.questionsSignal();
    const query = this.searchQuery().toLowerCase();
    const status = this.statusFilter();

    if (query) {
      questions = questions.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.description.toLowerCase().includes(query)
      );
    }

    if (status) {
      questions = questions.filter((q) => q.status === status);
    }

    return questions;
  });

  onSearch(): void {
    // Trigger reactivity - the signal is already updated via ngModel
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  setFilter(status: QuestionStatus | ''): void {
    this.statusFilter.set(status);
  }

  formatDate(date: Date): string {
    return formatDate(date, this.i18nService);
  }
}
