import type { Question, QuestionStatus } from "@/types";

// ========================= FAKE QUESTIONS API =========================
// Simulates API responses with artificial delays
// Useful for testing UI states like loading, error, success

// Pre-defined fake questions for consistent demo
const fakeQuestions: Question[] = [
  {
    id: "1",
    title: "How do I center a div in CSS?",
    description: "I've tried using margin: auto but it's not working. What's the best way to center a div both horizontally and vertically?",
    status: "answered",
    userId: "user1",
    username: "dev_master",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    comments: [
      {
        id: "c1",
        questionId: "1",
        userId: "user2",
        username: "css_ninja",
        content: "You can use flexbox: display: flex; justify-content: center; align-items: center;",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
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
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    comments: [],
  },
  {
    id: "3",
    title: "React useEffect dependency array explained",
    description: "Can someone explain how the dependency array in useEffect works? When should I include variables in it?",
    status: "open",
    userId: "user3",
    username: "react_fan",
    createdAt: new Date(),
    comments: [],
  },
];

/**
 * Get all questions - fake API with random delays
 */
export const fetchQuestions = async (): Promise<Question[]> => {
  // Simulate network delay (100-300ms)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to fetch questions. Please try again.");
  }

  console.log("[Fake API] Fetched questions:", fakeQuestions.length);
  return [...fakeQuestions];
};

/**
 * Get question by ID - fake API with random delays
 */
export const fetchQuestionById = async (id: string): Promise<Question> => {
  // Simulate network delay (100-300ms)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));

  const question = fakeQuestions.find((q) => q.id === id);

  if (!question) {
    throw new Error("Question not found");
  }

  console.log("[Fake API] Fetched question:", id);
  return question;
};

/**
 * Create question - fake API with random delays
 */
export const createQuestion = async (data: {
  title: string;
  description: string;
  userId: string;
  username: string;
}): Promise<Question> => {
  // Simulate network delay (300-600ms)
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 300));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to create question. Please try again.");
  }

  // Validate input
  if (!data.title.trim() || data.title.trim().length < 5) {
    throw new Error("Title must be at least 5 characters");
  }
  if (!data.description.trim() || data.description.trim().length < 10) {
    throw new Error("Description must be at least 10 characters");
  }

  const newQuestion: Question = {
    id: `q_${Date.now()}`,
    title: data.title.trim(),
    description: data.description.trim(),
    status: "open",
    userId: data.userId,
    username: data.username,
    createdAt: new Date(),
    comments: [],
  };

  // Add to fake questions (in memory only)
  fakeQuestions.unshift(newQuestion);

  console.log("[Fake API] Created question:", newQuestion.id);
  return newQuestion;
};

/**
 * Update question - fake API with random delays
 */
export const updateQuestion = async (data: {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
}): Promise<Question> => {
  // Simulate network delay (300-600ms)
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 300));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to update question. Please try again.");
  }

  const questionIndex = fakeQuestions.findIndex((q) => q.id === data.id);

  if (questionIndex === -1) {
    throw new Error("Question not found");
  }

  // Simulate authorization error
  if (fakeQuestions[questionIndex].userId !== data.userId) {
    throw new Error("You are not authorized to edit this question");
  }

  // Update the question
  fakeQuestions[questionIndex] = {
    ...fakeQuestions[questionIndex],
    title: data.title.trim(),
    description: data.description.trim(),
    status: data.status,
  };

  console.log("[Fake API] Updated question:", data.id);
  return fakeQuestions[questionIndex];
};

/**
 * Search questions - fake API with random delays
 */
export const searchQuestions = async (query: string): Promise<Question[]> => {
  // Simulate network delay (100-300ms)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));

  const lowerQuery = query.toLowerCase();
  const results = fakeQuestions.filter(
    (q) =>
      q.title.toLowerCase().includes(lowerQuery) ||
      q.description.toLowerCase().includes(lowerQuery)
  );

  console.log("[Fake API] Search results:", results.length);
  return results;
};

/**
 * Get related questions - fake API with random delays
 */
export const getRelatedQuestions = async (
  questionId: string,
  limit: number
): Promise<Question[]> => {
  // Simulate network delay (100-200ms)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 100));

  // Return random questions (excluding the current one)
  const related = fakeQuestions
    .filter((q) => q.id !== questionId)
    .slice(0, limit);

  console.log("[Fake API] Related questions:", related.length);
  return related;
};

/**
 * Get hot network questions - fake API with random delays
 */
export const getHotNetworkQuestions = async (limit: number): Promise<Question[]> => {
  // Simulate network delay (100-200ms)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 100));

  // Sort by comments count (most commented first)
  const hot = [...fakeQuestions]
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, limit);

  console.log("[Fake API] Hot network questions:", hot.length);
  return hot;
};
