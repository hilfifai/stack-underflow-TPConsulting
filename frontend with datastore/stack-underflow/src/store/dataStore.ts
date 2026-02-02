import type { Comment, Question, QuestionStatus, User } from "#src/types";

// In-memory data store
class DataStore {
  private questions: Question[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Pre-populate with sample questions
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    this.questions = [
      {
        id: "1",
        title: "How do I center a div in CSS?",
        description: "I've tried using margin: auto but it's not working. What's the best way to center a div both horizontally and vertically?",
        status: "answered",
        userId: "user1",
        username: "dev_master",
        createdAt: twoDaysAgo,
        comments: [
          {
            id: "c1",
            questionId: "1",
            userId: "user2",
            username: "css_ninja",
            content: "You can use flexbox: display: flex; justify-content: center; align-items: center;",
            createdAt: twoDaysAgo,
          },
          {
            id: "c2",
            questionId: "1",
            userId: "user3",
            username: "web_wizard",
            content: "Or use grid: display: grid; place-items: center;",
            createdAt: yesterday,
          },
        ],
      },
      {
        id: "2",
        title: "What's the difference between let and const in JavaScript?",
        description: "I'm new to JavaScript and I'm confused about when to use let vs const. Can someone explain the difference?",
        status: "open",
        userId: "user2",
        username: "js_learner",
        createdAt: yesterday,
        comments: [],
      },
      {
        id: "3",
        title: "React useEffect dependency array explained",
        description: "Can someone explain how the dependency array in useEffect works? When should I include variables in it?",
        status: "open",
        userId: "user3",
        username: "react_fan",
        createdAt: now,
        comments: [
          {
            id: "c3",
            questionId: "3",
            userId: "user1",
            username: "dev_master",
            content: "The dependency array tells React when to re-run the effect. Include any variables that the effect uses.",
            createdAt: now,
          },
        ],
      },
      {
        id: "4",
        title: "How to handle async/await errors properly?",
        description: "I'm using async/await but not sure about the best way to handle errors. Should I use try/catch everywhere?",
        status: "closed",
        userId: "user4",
        username: "async_expert",
        createdAt: twoDaysAgo,
        comments: [
          {
            id: "c4",
            questionId: "4",
            userId: "user1",
            username: "dev_master",
            content: "Yes, try/catch is the standard way. You can also use .catch() with promises.",
            createdAt: twoDaysAgo,
          },
        ],
      },
    ];
  }

  // User methods
  login(username: string, password: string): User {
    // Mock login - accept any username/password
    const user: User = {
      id: `user_${Date.now()}`,
      username,
    };
    this.currentUser = user;
    return user;
  }

  signup(username: string, password: string): User | null {
    // Mock signup - check if username already exists
    // For this mock implementation, we'll just create a new user
    const user: User = {
      id: `user_${Date.now()}`,
      username,
    };
    this.currentUser = user;
    return user;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Question methods
  getQuestions(): Question[] {
    return [...this.questions].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  createQuestion(
    title: string,
    description: string,
    userId: string,
    username: string,
  ): Question {
    const question: Question = {
      id: `q_${Date.now()}`,
      title,
      description,
      status: "open",
      userId,
      username,
      createdAt: new Date(),
      comments: [],
    };
    this.questions.push(question);
    return question;
  }

  updateQuestion(
    id: string,
    title: string,
    description: string,
    status: QuestionStatus,
  ): Question | null {
    const question = this.questions.find((q) => q.id === id);
    if (!question) return null;

    question.title = title;
    question.description = description;
    question.status = status;
    return question;
  }

  canEditQuestion(questionId: string, userId: string): boolean {
    const question = this.questions.find((q) => q.id === questionId);
    return question?.userId === userId;
  }

  // Comment methods
  addComment(
    questionId: string,
    content: string,
    userId: string,
    username: string,
  ): Comment | null {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) return null;

    const comment: Comment = {
      id: `c_${Date.now()}`,
      questionId,
      userId,
      username,
      content,
      createdAt: new Date(),
    };
    question.comments.push(comment);
    return comment;
  }

  updateComment(
    questionId: string,
    commentId: string,
    content: string,
  ): Comment | null {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) return null;

    const comment = question.comments.find((c) => c.id === commentId);
    if (!comment) return null;

    comment.content = content;
    return comment;
  }

  canEditComment(commentId: string, userId: string): boolean {
    for (const question of this.questions) {
      const comment = question.comments.find((c) => c.id === commentId);
      if (comment) {
        return comment.userId === userId;
      }
    }
    return false;
  }
}

// Export singleton instance
export const dataStore = new DataStore();
