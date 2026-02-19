import { Injectable, signal } from '@angular/core';
import type { Question, QuestionStatus } from '../types';
import { environment } from '../../environments/environment';

export interface QuestionsAPI {
  fetchQuestions(): Promise<Question[]>;
  fetchQuestionById(id: string): Promise<Question>;
  createQuestion(data: { title: string; description: string; userId: string; username: string }): Promise<Question>;
  updateQuestion(data: { id: string; title: string; description: string; status: QuestionStatus; userId: string }): Promise<Question>;
  searchQuestions(query: string): Promise<Question[]>;
  getRelatedQuestions(questionId: string, limit: number): Promise<Question[]>;
  getHotNetworkQuestions(limit: number): Promise<Question[]>;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private apiLayer = environment.apiLayer;
  private apiPromise: Promise<QuestionsAPI> | null = null;

  questionsSignal = signal<Question[]>([]);
  loadingSignal = signal<boolean>(false);
  errorSignal = signal<string | null>(null);

  private async getAPI(): Promise<QuestionsAPI> {
    if (!this.apiPromise) {
      switch (this.apiLayer) {
        case 'fake':
          this.apiPromise = import('../api/fake/questions').then(m => m as unknown as QuestionsAPI);
          break;
        case 'real':
          this.apiPromise = import('../api/real/questions').then(m => m as unknown as QuestionsAPI);
          break;
        case 'mock':
        default:
          this.apiPromise = import('../api/mock/questions').then(m => m as unknown as QuestionsAPI);
          break;
      }
    }
    return this.apiPromise;
  }

  async fetchQuestions(): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      const questions = await api.fetchQuestions();
      this.questionsSignal.set(questions);
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to fetch questions');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async fetchQuestionById(id: string): Promise<Question | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      const question = await api.fetchQuestionById(id);
      return question;
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to fetch question');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async createQuestion(title: string, description: string, userId: string, username: string): Promise<Question | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      const question = await api.createQuestion({ title, description, userId, username });
      this.questionsSignal.update((questions) => [question, ...questions]);
      return question;
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to create question');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async updateQuestion(id: string, title: string, description: string, status: QuestionStatus, userId: string): Promise<Question | null> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const api = await this.getAPI();
      const question = await api.updateQuestion({ id, title, description, status, userId });
      this.questionsSignal.update((questions) =>
        questions.map((q) => (q.id === id ? question : q))
      );
      return question;
    } catch (error) {
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to update question');
      return null;
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async searchQuestions(query: string): Promise<Question[]> {
    try {
      const api = await this.getAPI();
      return await api.searchQuestions(query);
    } catch (error) {
      return [];
    }
  }

  async getRelatedQuestions(questionId: string, limit: number = 5): Promise<Question[]> {
    try {
      const api = await this.getAPI();
      return await api.getRelatedQuestions(questionId, limit);
    } catch (error) {
      return [];
    }
  }

  async getHotNetworkQuestions(limit: number = 5): Promise<Question[]> {
    try {
      const api = await this.getAPI();
      return await api.getHotNetworkQuestions(limit);
    } catch (error) {
      return [];
    }
  }
}
