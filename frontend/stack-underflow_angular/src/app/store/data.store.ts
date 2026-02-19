import { Injectable, signal, computed } from '@angular/core';
import type { Comment, Question, QuestionStatus, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataStore {
  private questionsSignal = signal<Question[]>([]);
  private currentUserSignal = signal<User | null>(null);
  private usersMap = new Map<string, { username: string; password: string }>();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const questions: Question[] = [
      {
        id: '1',
        title: 'How do I center a div in CSS?',
        description: "I've tried using margin: auto but it's not working. What's the best way to center a div both horizontally and vertically?",
        status: 'answered',
        userId: 'user1',
        username: 'dev_master',
        createdAt: twoDaysAgo,
        comments: [
          {
            id: 'c1',
            questionId: '1',
            userId: 'user2',
            username: 'css_ninja',
            content: 'You can use flexbox: display: flex; justify-content: center; align-items: center;',
            createdAt: twoDaysAgo,
          },
          {
            id: 'c2',
            questionId: '1',
            userId: 'user3',
            username: 'web_wizard',
            content: 'Or use grid: display: grid; place-items: center;',
            createdAt: yesterday,
          },
        ],
      },
      {
        id: '2',
        title: "What's the difference between let and const in JavaScript?",
        description: "I'm new to JavaScript and I'm confused about when to use let vs const. Can someone explain the difference?",
        status: 'open',
        userId: 'user2',
        username: 'js_learner',
        createdAt: yesterday,
        comments: [],
      },
      {
        id: '3',
        title: 'React useEffect dependency array explained',
        description: 'Can someone explain how the dependency array in useEffect works? When should I include variables in it?',
        status: 'open',
        userId: 'user3',
        username: 'react_fan',
        createdAt: now,
        comments: [
          {
            id: 'c3',
            questionId: '3',
            userId: 'user1',
            username: 'dev_master',
            content: 'The dependency array tells React when to re-run the effect. Include any variables that the effect uses.',
            createdAt: now,
          },
        ],
      },
      {
        id: '4',
        title: 'How to handle async/await errors properly?',
        description: "I'm using async/await but not sure about the best way to handle errors. Should I use try/catch everywhere?",
        status: 'closed',
        userId: 'user4',
        username: 'async_expert',
        createdAt: twoDaysAgo,
        comments: [
          {
            id: 'c4',
            questionId: '4',
            userId: 'user1',
            username: 'dev_master',
            content: 'Yes, try/catch is the standard way. You can also use .catch() with promises.',
            createdAt: twoDaysAgo,
          },
        ],
      },
      {
        id: '5',
        title: 'Python list comprehension vs map function',
        description: 'Which is more Pythonic - list comprehension or map function? What are the performance differences?',
        status: 'answered',
        userId: 'user5',
        username: 'pythonista',
        createdAt: threeDaysAgo,
        comments: [
          {
            id: 'c5',
            questionId: '5',
            userId: 'user6',
            username: 'code_guru',
            content: 'List comprehensions are generally more readable and Pythonic. Map can be faster for simple operations.',
            createdAt: threeDaysAgo,
          },
        ],
      },
    ];

    this.questionsSignal.set(questions);
  }

  get questions(): Question[] {
    return this.questionsSignal();
  }

  get currentUser(): User | null {
    return this.currentUserSignal();
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  createQuestion(title: string, description: string, userId: string, username: string): Question {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      title,
      description,
      status: 'open',
      userId,
      username,
      createdAt: new Date(),
      comments: [],
    };
    this.questionsSignal.update((questions) => [newQuestion, ...questions]);
    return newQuestion;
  }

  updateQuestion(id: string, title: string, description: string, status: QuestionStatus): Question | undefined {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) return undefined;

    const updated = { ...this.questions[index], title, description, status };
    this.questionsSignal.update((questions) => {
      const newQuestions = [...questions];
      newQuestions[index] = updated;
      return newQuestions;
    });
    return updated;
  }

  searchQuestions(query: string): Question[] {
    const lowerQuery = query.toLowerCase();
    return this.questions.filter(
      (q) =>
        q.title.toLowerCase().includes(lowerQuery) ||
        q.description.toLowerCase().includes(lowerQuery)
    );
  }

  getRelatedQuestions(questionId: string, limit: number): Question[] {
    return this.questions.filter((q) => q.id !== questionId).slice(0, limit);
  }

  getHotNetworkQuestions(limit: number): Question[] {
    return [...this.questions]
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, limit);
  }

  login(username: string, password: string): User | null {
    const existingUser = this.usersMap.get(username);
    if (existingUser && existingUser.password === password) {
      const user: User = { id: username, username };
      this.currentUserSignal.set(user);
      return user;
    }
    if (!existingUser) {
      this.usersMap.set(username, { username, password });
      const user: User = { id: username, username };
      this.currentUserSignal.set(user);
      return user;
    }
    return null;
  }

  signup(username: string, password: string): User | null {
    if (this.usersMap.has(username)) {
      return null;
    }
    this.usersMap.set(username, { username, password });
    const user: User = { id: username, username };
    this.currentUserSignal.set(user);
    return user;
  }

  logout(): void {
    this.currentUserSignal.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
