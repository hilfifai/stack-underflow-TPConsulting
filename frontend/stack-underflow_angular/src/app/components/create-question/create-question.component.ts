import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { QuestionsService } from '../../services/questions.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  questionsService = inject(QuestionsService);
  i18nService = inject(I18nService);

  title = '';
  description = '';
  submitting = signal(false);
  error = signal('');

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  async handleSubmit(): Promise<void> {
    if (!this.authService.isAuthenticated) {
      this.error.set(this.t('createQuestion.error.notLoggedIn'));
      return;
    }

    this.submitting.set(true);
    this.error.set('');

    try {
      const user = this.authService.user;
      if (user) {
        const question = await this.questionsService.createQuestion(
          this.title,
          this.description,
          user.id,
          user.username
        );
        if (question) {
          this.router.navigate(['/questions', question.id]);
        }
      }
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to create question');
    } finally {
      this.submitting.set(false);
    }
  }
}
