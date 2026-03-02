import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Question } from '../../types';
import { AuthService } from '../../services/auth.service';
import { CommentsService } from '../../services/comments.service';
import { I18nService } from '../../services/i18n.service';
import { formatDate } from '../../utils/format-date';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  @Input() question!: Question;

  authService = inject(AuthService);
  commentsService = inject(CommentsService);
  i18nService = inject(I18nService);

  isEditing = signal(false);
  editTitle = '';
  editDescription = '';
  editStatus: 'open' | 'answered' | 'closed' = 'open';
  saving = signal(false);
  commentSubmitting = signal(false);
  newComment = '';
  relatedQuestions = signal<Question[]>([]);

  get t(): (key: string) => string {
    return (key: string) => this.i18nService.t(key);
  }

  canEdit(): boolean {
    return this.authService.isAuthenticated && this.authService.user?.id === this.question.userId;
  }

  startEdit(): void {
    this.editTitle = this.question.title;
    this.editDescription = this.question.description;
    this.editStatus = this.question.status;
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  async saveEdit(): Promise<void> {
    this.saving.set(true);
    try {
      const user = this.authService.user;
      if (user) {
        const updated = await this.commentsService.updateComment(
          this.question.id,
          '',
          '',
          user.id
        );
        if (updated) {
          this.question.title = this.editTitle;
          this.question.description = this.editDescription;
          this.question.status = this.editStatus;
          this.isEditing.set(false);
        }
      }
    } catch (err) {
      console.error('Failed to update question:', err);
    } finally {
      this.saving.set(false);
    }
  }

  async addComment(): Promise<void> {
    if (!this.newComment.trim()) return;
    this.commentSubmitting.set(true);
    try {
      const user = this.authService.user;
      if (user) {
        const comment = await this.commentsService.addComment(
          this.question.id,
          this.newComment,
          user.id,
          user.username
        );
        if (comment) {
          this.question.comments.push(comment);
          this.newComment = '';
        }
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      this.commentSubmitting.set(false);
    }
  }

  formatDate(date: Date): string {
    return formatDate(date, this.i18nService);
  }
}
