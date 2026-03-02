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
        title: "How to implement JWT authentication in Node.js?",
        description: "I need to add JWT authentication to my Express app. What's the best approach?",
        status: "answered",
        userId: "user14",
        username: "backend_dev",
        createdAt: twoDaysAgo,
        comments: [
          {
            id: "c8",
            questionId: "11",
            userId: "user15",
            username: "security_expert",
            content: "Use jsonwebtoken library, store tokens securely, and implement refresh token rotation.",
            createdAt: twoDaysAgo,
          },
        ],
      },
      {
        id: "12",
        title: "CSS Grid vs Flexbox: When to use which?",
        description: "I'm confused about when to use CSS Grid vs Flexbox. Can someone explain the use cases?",
        status: "open",
        userId: "user16",
        username: "css_learner",
        createdAt: threeDaysAgo,
        comments: [],
      },
      {
        id: "13",
        title: "Understanding React Context API",
        description: "How does React Context work? When should I use it instead of props drilling?",
        status: "answered",
        userId: "user17",
        username: "react_expert",
        createdAt: fourDaysAgo,
        comments: [
          {
            id: "c9",
            questionId: "13",
            userId: "user18",
            username: "frontend_dev",
            content: "Use Context for global state like themes, auth, or language. Avoid for frequently changing data.",
            createdAt: fourDaysAgo,
          },
        ],
      },
      {
        id: "14",
        title: "How to debug memory leaks in JavaScript?",
        description: "My Node.js application is consuming more and more memory. How can I find and fix memory leaks?",
        status: "open",
        userId: "user19",
        username: "node_dev",
        createdAt: fiveDaysAgo,
        comments: [],
      },
      {
        id: "15",
        title: "Python decorators explained with examples",
        description: "I don't understand Python decorators. Can someone explain them with practical examples?",
        status: "answered",
        userId: "user20",
        username: "python_master",
        createdAt: sixDaysAgo,
        comments: [
          {
            id: "c10",
            questionId: "15",
            userId: "user21",
            username: "code_mentor",
            content: "Decorators are functions that modify other functions. @decorator syntax is syntactic sugar for func = decorator(func).",
            createdAt: sixDaysAgo,
          },
        ],
      },
      {
        id: "16",
        title: "Kubernetes vs Docker Swarm comparison",
        description: "I'm choosing between Kubernetes and Docker Swarm for container orchestration. Which should I pick?",
        status: "open",
        userId: "user22",
        username: "devops_newbie",
        createdAt: weekAgo,
        comments: [],
      },
      {
        id: "17",
        title: "How to implement lazy loading in React?",
        description: "What's the best way to implement lazy loading for components and routes in React?",
        status: "answered",
        userId: "user23",
        username: "react_optimizer",
        createdAt: now,
        comments: [
          {
            id: "c11",
            questionId: "17",
            userId: "user24",
            username: "perf_guru",
            content: "Use React.lazy() for components and Suspense for loading states. For routes, use lazy loading with React Router.",
            createdAt: now,
          },
        ],
      },
      {
        id: "18",
        title: "Understanding SQL joins with examples",
        description: "I'm confused about different types of SQL joins. Can someone explain INNER, LEFT, RIGHT, and FULL joins?",
        status: "open",
        userId: "user25",
        username: "sql_learner",
        createdAt: yesterday,
        comments: [],
      },
      {
        id: "19",
        title: "How to secure REST APIs?",
        description: "What are the best practices for securing REST APIs? I need to implement authentication and authorization.",
        status: "answered",
        userId: "user26",
        username: "security_dev",
        createdAt: twoDaysAgo,
        comments: [
          {
            id: "c12",
            questionId: "19",
            userId: "user27",
            username: "api_security",
            content: "Use HTTPS, implement rate limiting, validate input, use OAuth2/JWT, and follow OWASP guidelines.",
            createdAt: twoDaysAgo,
          },
        ],
      },
      {
        id: "20",
        title: "JavaScript closures explained simply",
        description: "I keep hearing about closures in JavaScript but don't understand them. Can someone explain in simple terms?",
        status: "open",
        userId: "user28",
        username: "js_beginner",
        createdAt: threeDaysAgo,
        comments: [],
      },
      {
        id: "21",
        title: "How to write unit tests in Python?",
        description: "What's the best framework for unit testing in Python? How should I structure my tests?",
        status: "answered",
        userId: "user29",
        username: "python_tester",
        createdAt: fourDaysAgo,
        comments: [
          {
            id: "c13",
            questionId: "21",
            userId: "user30",
            username: "qa_engineer",
            content: "Use pytest framework. Follow AAA pattern: Arrange, Act, Assert. Mock external dependencies.",
            createdAt: fourDaysAgo,
          },
        ],
      },
      {
        id: "22",
        title: "Understanding microservices architecture",
        description: "What are microservices and when should I use them instead of a monolithic architecture?",
        status: "open",
        userId: "user31",
        username: "architect_novice",
        createdAt: fiveDaysAgo,
        comments: [],
      },
      {
        id: "23",
        title: "How to implement WebSockets in Node.js?",
        description: "I need real-time communication in my app. How do I implement WebSockets with Node.js?",
        status: "answered",
        userId: "user32",
        username: "realtime_dev",
        createdAt: sixDaysAgo,
        comments: [
          {
            id: "c14",
            questionId: "23",
            userId: "user33",
            username: "socket_expert",
            content: "Use Socket.IO library. It handles fallbacks and provides room-based messaging out of the box.",
            createdAt: sixDaysAgo,
          },
        ],
      },
      {
        id: "24",
        title: "CSS animation performance tips",
        description: "My CSS animations are causing performance issues. How can I optimize them?",
        status: "open",
        userId: "user34",
        username: "css_animator",
        createdAt: weekAgo,
        comments: [],
      },
      {
        id: "25",
        title: "Understanding Redux state management",
        description: "How does Redux work? When should I use it instead of React Context for state management?",
        status: "answered",
        userId: "user35",
        username: "redux_dev",
        createdAt: now,
        comments: [
          {
            id: "c15",
            questionId: "25",
            userId: "user36",
            username: "state_expert",
            content: "Use Redux for complex state with many interactions. Use Context for simpler global state. Redux has better dev tools.",
            createdAt: now,
          },
        ],
      },
      {
        id: "26",
        title: "How to handle file uploads in Node.js?",
        description: "What's the best way to handle file uploads in Express? How do I handle large files?",
        status: "open",
        userId: "user37",
        username: "backend_newbie",
        createdAt: yesterday,
        comments: [],
      },
      {
        id: "27",
        title: "Understanding Git branching strategies",
        description: "What are the common Git branching strategies? Which one should I use for my team?",
        status: "answered",
        userId: "user38",
        username: "git_master",
        createdAt: twoDaysAgo,
        comments: [
          {
            id: "c16",
            questionId: "27",
            userId: "user39",
            username: "team_lead",
            content: "Git Flow is good for release-based projects. GitHub Flow is simpler for continuous deployment. Trunk-based for experienced teams.",
            createdAt: twoDaysAgo,
          },
        ],
      },
      {
        id: "28",
        title: "How to implement caching in Node.js?",
        description: "My API responses are slow. How can I implement caching to improve performance?",
        status: "open",
        userId: "user40",
        username: "node_optimizer",
        createdAt: threeDaysAgo,
        comments: [],
      },
      {
        id: "29",
        title: "Understanding TypeScript generics",
        description: "I don't understand TypeScript generics. Can someone explain with practical examples?",
        status: "answered",
        userId: "user41",
        username: "ts_master",
        createdAt: fourDaysAgo,
        comments: [
          {
            id: "c17",
            questionId: "29",
            userId: "user42",
            username: "typescript_guru",
            content: "Generics allow you to write reusable code that works with different types. Use <T> syntax and constraints.",
            createdAt: fourDaysAgo,
          },
        ],
      },
      {
        id: "30",
        title: "How to implement pagination in SQL?",
        description: "What's the most efficient way to implement pagination in SQL queries?",
        status: "open",
        userId: "user43",
        username: "sql_dev",
        createdAt: fiveDaysAgo,
        comments: [],
      },
      {
        id: "31",
        title: "Understanding React hooks rules",
        description: "What are the rules of React hooks? Why can't I use hooks inside conditions or loops?",
        status: "answered",
        userId: "user44",
        username: "hooks_expert",
        createdAt: sixDaysAgo,
        comments: [
          {
            id: "c18",
            questionId: "31",
            userId: "user45",
            username: "react_core",
            content: "Hooks rely on call order. Using them conditionally breaks this. Always call hooks at the top level of components.",
            createdAt: sixDaysAgo,
          },
        ],
      },
      {
        id: "32",
        title: "How to deploy a React app to production?",
        description: "What's the best way to deploy a React application? Should I use Vercel, Netlify, or something else?",
        status: "open",
        userId: "user46",
        username: "frontend_deployer",
        createdAt: weekAgo,
        comments: [],
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

  getQuestionsPaginated(page: number, limit: number): {
    questions: Question[];
    total: number;
    totalPages: number;
  } {
    const sorted = [...this.questions].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    const total = sorted.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const questions = sorted.slice(startIndex, endIndex);

    return { questions, total, totalPages };
  }

  searchQuestions(query: string): Question[] {
    if (!query.trim()) {
      return this.getQuestions();
    }

    const lowerQuery = query.toLowerCase();
    return this.questions
      .filter(
        (q) =>
          q.title.toLowerCase().includes(lowerQuery) ||
          q.description.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  searchQuestionsPaginated(
    query: string,
    page: number,
    limit: number
  ): {
    questions: Question[];
    total: number;
    totalPages: number;
  } {
    const filtered = this.searchQuestions(query);
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const questions = filtered.slice(startIndex, endIndex);

    return { questions, total, totalPages };
  }

  getRelatedQuestions(questionId: string, limit: number = 5): Question[] {
    const currentQuestion = this.getQuestionById(questionId);
    if (!currentQuestion) return [];

    const words = currentQuestion.title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3);

    const scored = this.questions
      .filter((q) => q.id !== questionId)
      .map((q) => {
        const titleLower = q.title.toLowerCase();
        const descLower = q.description.toLowerCase();
        let score = 0;

        words.forEach((word) => {
          if (titleLower.includes(word)) score += 2;
          if (descLower.includes(word)) score += 1;
        });

        return { question: q, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scored.map((item) => item.question);
  }

  getHotNetworkQuestions(limit: number = 5): Question[] {
    return [...this.questions]
      .sort((a, b) => {
        // Sort by number of comments (engagement)
        const aEngagement = a.comments.length;
        const bEngagement = b.comments.length;
        if (bEngagement !== aEngagement) {
          return bEngagement - aEngagement;
        }
        // Then by recency
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice(0, limit);
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
