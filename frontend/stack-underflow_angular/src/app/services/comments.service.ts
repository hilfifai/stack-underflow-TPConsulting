import { Injectable, signal } from '@angular/core';
import type { Comment } from '../types';
import { environment } from '../../environments/environment';

export interface CommentsAPI {
  addComment(data: { questionId: string; content: string; userId: string; username: string }): Promise<Comment>;
  updateComment(data: { questionId: string; commentId: string; content: string; userId: string }): Promise<Comment>;
  deleteComment(questionId: string, commentId: string, userId: string): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiLayer = environment.apiLayer;
  private apiPromise: Promise<CommentsAPI> | null = null;

  loadingSignal = signal<boolean>(false);
  errorSignal = signal<string | null>(null);

  private async getAPI(): Promise<CommentsAPI> {
    if (!this.apiPromise) {
      switch (this.apiLayer) {
        case 'fake':
          this.apiPromise = import('../api/fake/comments').then(m => m as unknown as CommentsAPI);
          break;
        case 'real':
          this.apiPromise = import('../api/real/comments').then(m => m as unknown as CommentsAPI);
          break;
        case 'mock':
        default:
          this.apiPromise = import('../api/mock/comments').then(m => m as unknown as CommentsAPI);
          break;
      }
    }
    return this.apiPromise;
  }

  async addComment(questionId: string, content: string, userId: string, username: string): Promise<Comment | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      const comment = await api.addComment({ questionId, content, userId, username });
      return comment;
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to add comment');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async updateComment(questionId: string, commentId: string, content: string, userId: string): Promise<Comment | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      const comment = await api.updateComment({ questionId, commentId, content, userId });
      return comment;
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to update comment');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async deleteComment(questionId: string, commentId: string, userId: string): Promise<boolean> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      await api.deleteComment(questionId, commentId, userId);
      return true;
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to delete comment');
      return false;
    } finally {
      this.loadingSignal.set(false);
    }
  }
}
