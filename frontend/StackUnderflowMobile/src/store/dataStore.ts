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
      {
        id: "11",
        title: "How to implement dark mode in React Native?",
        description: "I want to add a dark mode toggle to my React Native app. What's the best approach?",
        status: "open",
        userId: "user14",
        username: "mobile_dev",
        createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "12",
        title: "Best practices for React state management",
        description: "Should I use Redux, Context API, or something else for state management in React?",
        status: "answered",
        userId: "user15",
        username: "react_guru",
        createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c8",
            questionId: "12",
            userId: "user1",
            username: "dev_master",
            content: "For simple apps, Context API is sufficient. For complex apps, consider Redux or Zustand.",
            createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "13",
        title: "How to deploy a Node.js app to AWS?",
        description: "I have a Node.js backend and want to deploy it to AWS. What are my options?",
        status: "open",
        userId: "user16",
        username: "aws_newbie",
        createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "14",
        title: "Understanding closures in JavaScript",
        description: "I keep hearing about closures in JavaScript but I don't fully understand them. Can someone explain?",
        status: "answered",
        userId: "user17",
        username: "js_student",
        createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c9",
            questionId: "14",
            userId: "user18",
            username: "js_expert",
            content: "A closure is a function that has access to variables from its outer scope, even after the outer function has returned.",
            createdAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "15",
        title: "How to write unit tests for React components?",
        description: "I want to start testing my React components. What testing library should I use?",
        status: "open",
        userId: "user19",
        username: "testing_fan",
        createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "16",
        title: "Best practices for REST API design",
        description: "What are the best practices for designing a REST API? Should I use plural or singular URLs?",
        status: "answered",
        userId: "user20",
        username: "api_architect",
        createdAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c10",
            questionId: "16",
            userId: "user21",
            username: "rest_expert",
            content: "Use plural URLs (e /api/users), use proper HTTP methods, and return appropriate status codes.",
            createdAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "17",
        title: "How to implement authentication in React Native?",
        description: "I need to add user authentication to my React Native app. What's the recommended approach?",
        status: "open",
        userId: "user22",
        username: "mobile_apps",
        createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "18",
        title: "Understanding CSS Flexbox",
        description: "I'm struggling with CSS Flexbox. Can someone explain the main properties?",
        status: "answered",
        userId: "user23",
        username: "css_learner",
        createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c11",
            questionId: "18",
            userId: "user24",
            username: "css_pro",
            content: "Key properties: display: flex, justify-content (horizontal), align-items (vertical), flex-direction.",
            createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "19",
        title: "How to optimize React app performance?",
        description: "My React app is running slow. What are some ways to improve performance?",
        status: "open",
        userId: "user25",
        username: "performance_guru",
        createdAt: new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "20",
        title: "Best practices for error handling in Node.js",
        description: "What's the best way to handle errors in a Node.js application? Should I use try/catch or error events?",
        status: "answered",
        userId: "user26",
        username: "node_dev",
        createdAt: new Date(now.getTime() - 17 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c12",
            questionId: "20",
            userId: "user27",
            username: "error_handling_expert",
            content: "Use try/catch for synchronous code and .catch() for promises. Create a centralized error handling middleware.",
            createdAt: new Date(now.getTime() - 17 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "21",
        title: "How to implement JWT authentication?",
        description: "I want to implement JWT tokens for authentication. What are the best practices?",
        status: "open",
        userId: "user28",
        username: "security_newbie",
        createdAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "22",
        title: "Understanding async/await in JavaScript",
        description: "Can someone explain how async/await works under the hood?",
        status: "answered",
        userId: "user29",
        username: "async_learner",
        createdAt: new Date(now.getTime() - 19 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c13",
            questionId: "22",
            userId: "user30",
            username: "async_expert_js",
            content: "async/await is syntactic sugar over Promises. await pauses the execution until the Promise resolves.",
            createdAt: new Date(now.getTime() - 19 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "23",
        title: "How to use React Hook Form?",
        description: "I heard React Hook Form is good for forms. How do I get started with it?",
        status: "open",
        userId: "user31",
        username: "form_builder",
        createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "24",
        title: "Best practices for Git commit messages",
        description: "What makes a good Git commit message? Are there any conventions I should follow?",
        status: "answered",
        userId: "user32",
        username: "git_user",
        createdAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c14",
            questionId: "24",
            userId: "user33",
            username: "git_master",
            content: "Use imperative mood, keep the first line under 50 characters, explain what and why not how.",
            createdAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "25",
        title: "How to implement infinite scroll in React?",
        description: "I want to implement infinite scroll for loading more content. What's the best approach?",
        status: "open",
        userId: "user34",
        username: "frontend_dev",
        createdAt: new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "26",
        title: "Understanding React.memo and useMemo",
        description: "What's the difference between React.memo and useMemo? When should I use each?",
        status: "answered",
        userId: "user35",
        username: "react_opt",
        createdAt: new Date(now.getTime() - 23 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c15",
            questionId: "26",
            userId: "user36",
            username: "react_core",
            content: "React.memo is for memoizing components, useMemo is for memoizing values. Both take a dependency array.",
            createdAt: new Date(now.getTime() - 23 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "27",
        title: "How to handle file uploads in Node.js?",
        description: "I need to implement file upload functionality in my Node.js backend. What libraries should I use?",
        status: "open",
        userId: "user37",
        username: "backend_dev",
        createdAt: new Date(now.getTime() - 24 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "28",
        title: "Best practices for responsive web design",
        description: "What are the best practices for making a website responsive? Should I use media queries or flexbox/grid?",
        status: "answered",
        userId: "user38",
        username: "responsive_design",
        createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c16",
            questionId: "28",
            userId: "user39",
            username: "css_responsive",
            content: "Use a mobile-first approach, combine flexbox/grid with media queries, and test on multiple devices.",
            createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      {
        id: "29",
        title: "How to implement search functionality in React?",
        description: "I want to add a search feature to my React app. Should I search on the client or server side?",
        status: "open",
        userId: "user40",
        username: "search_dev",
        createdAt: new Date(now.getTime() - 26 * 24 * 60 * 60 * 1000),
        comments: [],
      },
      {
        id: "30",
        title: "Understanding useCallback hook",
        description: "When should I use useCallback? Does it actually improve performance?",
        status: "answered",
        userId: "user41",
        username: "hooks_user",
        createdAt: new Date(now.getTime() - 27 * 24 * 60 * 60 * 1000),
        comments: [
          {
            id: "c17",
            questionId: "30",
            userId: "user42",
            username: "react_hooks",
            content: "useCallback memoizes functions. Use it when passing callbacks to optimized child components that rely on reference equality.",
            createdAt: new Date(now.getTime() - 27 * 24 * 60 * 60 * 1000),
          },
        ],
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
  getQuestions(options?: { search?: string; limit?: number; offset?: number }): Question[] {
    let result = [...this.questions];

    // Apply search filter
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(searchLower) ||
          q.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const offset = options?.offset || 0;
    const limit = options?.limit || result.length;
    result = result.slice(offset, offset + limit);

    return result;
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
