import type { Comment, Question, QuestionStatus, User } from "../types";

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
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

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
      {
        id: "5",
        title: "Python list comprehension vs map function",
        description: "Which is more Pythonic - list comprehension or map function? What are the performance differences?",
        status: "answered",
        userId: "user5",
        username: "pythonista",
        createdAt: threeDaysAgo,
        comments: [
          {
            id: "c5",
            questionId: "5",
            userId: "user6",
            username: "code_guru",
            content: "List comprehensions are generally more readable and Pythonic. Map can be faster for simple operations.",
            createdAt: threeDaysAgo,
          },
        ],
      },
      {
        id: "6",
        title: "Understanding Git rebase vs merge",
        description: "When should I use git rebase instead of git merge? What are the pros and cons of each?",
        status: "open",
        userId: "user7",
        username: "git_novice",
        createdAt: fourDaysAgo,
        comments: [],
      },
      {
        id: "7",
        title: "How to optimize database queries in PostgreSQL?",
        description: "My queries are running slow. What are some best practices for optimizing PostgreSQL queries?",
        status: "answered",
        userId: "user8",
        username: "db_admin",
        createdAt: fiveDaysAgo,
        comments: [
          {
            id: "c6",
            questionId: "7",
            userId: "user9",
            username: "sql_expert",
            content: "Use EXPLAIN ANALYZE to analyze query plans, create appropriate indexes, and avoid SELECT *.",
            createdAt: fiveDaysAgo,
          },
        ],
      },
      {
        id: "8",
        title: "TypeScript interface vs type alias",
        description: "What's the difference between interface and type in TypeScript? When should I use each?",
        status: "open",
        userId: "user10",
        username: "ts_dev",
        createdAt: sixDaysAgo,
        comments: [],
      },
      {
        id: "9",
        title: "Docker container networking explained",
        description: "How do Docker containers communicate with each other? What are the different networking modes?",
        status: "answered",
        userId: "user11",
        username: "docker_fan",
        createdAt: weekAgo,
        comments: [
          {
            id: "c7",
            questionId: "9",
            userId: "user12",
            username: "devops_pro",
            content: "Docker has bridge, host, overlay, and macvlan networks. Bridge is the default for single-host communication.",
            createdAt: weekAgo,
          },
        ],
      },
      {
        id: "10",
        title: "REST API vs GraphQL: Which to choose?",
        description: "I'm building a new API. Should I use REST or GraphQL? What are the trade-offs?",
        status: "open",
        userId: "user13",
        username: "api_designer",
        createdAt: yesterday,
        comments: [],
      },
    ];
  }

  // Auth methods
  login(username: string, password: string): void {
    this.currentUser = {
      id: `user_${Date.now()}`,
      username,
    };
  }

  signup(username: string, password: string): void {
    this.currentUser = {
      id: `user_${Date.now()}`,
      username,
    };
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Question methods
  getQuestions(): Question[] {
    return [...this.questions];
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  createQuestion(
    title: string,
    description: string,
    userId: string,
    username: string
  ): Question {
    const question: Question = {
      id: `question_${Date.now()}`,
      title,
      description,
      status: "open",
      userId,
      username,
      createdAt: new Date(),
      comments: [],
    };
    this.questions.unshift(question);
    return question;
  }

  updateQuestion(
    id: string,
    title: string,
    description: string,
    status: QuestionStatus
  ): Question | undefined {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) return undefined;

    this.questions[index] = {
      ...this.questions[index],
      title,
      description,
      status,
    };
    return this.questions[index];
  }

  deleteQuestion(id: string): boolean {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) return false;
    this.questions.splice(index, 1);
    return true;
  }

  canEditQuestion(questionId: string, userId: string): boolean {
    const question = this.getQuestionById(questionId);
    return question?.userId === userId;
  }

  // Comment methods
  addComment(
    questionId: string,
    content: string,
    userId: string,
    username: string
  ): Comment | undefined {
    const question = this.getQuestionById(questionId);
    if (!question) return undefined;

    const comment: Comment = {
      id: `comment_${Date.now()}`,
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
    content: string
  ): Comment | undefined {
    const question = this.getQuestionById(questionId);
    if (!question) return undefined;

    const commentIndex = question.comments.findIndex((c) => c.id === commentId);
    if (commentIndex === -1) return undefined;

    question.comments[commentIndex] = {
      ...question.comments[commentIndex],
      content,
    };
    return question.comments[commentIndex];
  }

  deleteComment(questionId: string, commentId: string): boolean {
    const question = this.getQuestionById(questionId);
    if (!question) return false;

    const index = question.comments.findIndex((c) => c.id === commentId);
    if (index === -1) return false;
    question.comments.splice(index, 1);
    return true;
  }

  canEditComment(commentId: string, userId: string): boolean {
    for (const question of this.questions) {
      const comment = question.comments.find((c) => c.id === commentId);
      if (comment && comment.userId === userId) {
        return true;
      }
    }
    return false;
  }
}

export const dataStore = new DataStore();
