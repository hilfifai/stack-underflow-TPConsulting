// ========================= FAKE QUESTIONS API =========================
// Simulates API responses with artificial delays and occasional errors

import type { Question, Comment } from "@/types";
import { validateTitle, validateDescription, ValidationError } from "../types";

// In-memory storage for demo
let questions: Question[] = [
  {
    id: "q1",
    title: "How to use Vue 3 Composition API?",
    description: "I'm trying to understand how to use the Composition API in Vue 3. Can someone provide examples?",
    status: "answered",
    userId: "user_1",
    username: "admin",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    comments: [
      {
        id: "c1",
        questionId: "q1",
        userId: "user_2",
        username: "john_doe",
        content: "You can use ref() and computed() from vue",
        createdAt: new Date(Date.now() - 43200000).toISOString(),
      },
    ],
  },
  {
    id: "q2",
    title: "React vs Vue - which one to choose?",
    description: "I'm starting a new project and can't decide between React and Vue. What are the pros and cons?",
    status: "open",
    userId: "user_2",
    username: "john_doe",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    comments: [],
  },
];

const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all questions
 */
export const getAll = async (): Promise<Question[]> => {
  await delay(200 + Math.random() * 300);
  
  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to fetch questions");
  }
  
  console.log("[Fake API] Get all questions:", questions.length);
  return [...questions];
};

/**
 * Get question by ID
 */
export const getById = async (id: string): Promise<Question> => {
  await delay(100 + Math.random() * 200);
  
  const question = questions.find((q) => q.id === id);
  if (!question) {
    throw ValidationError.QUESTION_NOT_FOUND.message;
  }
  
  console.log("[Fake API] Get question by id:", id);
  return question;
};

/**
 * Create question
 */
export const create = async (data: { title: string; description: string }): Promise<Question> => {
  await delay(300 + Math.random() * 400);
  
  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to create question");
  }
  
  validateTitle(data.title);
  validateDescription(data.description);
  
  const question: Question = {
    id: `q_${Date.now()}`,
    title: data.title.trim(),
    description: data.description.trim(),
    status: "open",
    userId: "user_1", // Would come from auth context in real app
    username: "admin",
    createdAt: new Date().toISOString(),
    comments: [],
  };
  
  questions.unshift(question);
  console.log("[Fake API] Create question:", question);
  return question;
};

/**
 * Update question
 */
export const update = async (
  id: string,
  data: { title?: string; description?: string; status?: "open" | "answered" | "closed" }
): Promise<Question> => {
  await delay(200 + Math.random() * 300);
  
  const index = questions.findIndex((q) => q.id === id);
  if (index === -1) {
    throw ValidationError.QUESTION_NOT_FOUND.message;
  }
  
  const question = questions[index];
  
  if (data.title !== undefined) {
    validateTitle(data.title);
    question.title = data.title.trim();
  }
  if (data.description !== undefined) {
    validateDescription(data.description);
    question.description = data.description.trim();
  }
  if (data.status !== undefined) {
    question.status = data.status;
  }
  
  console.log("[Fake API] Update question:", id);
  return question;
};

/**
 * Delete question
 */
export const deleteQuestion = async (id: string): Promise<void> => {
  await delay(200 + Math.random() * 200);
  
  const index = questions.findIndex((q) => q.id === id);
  if (index === -1) {
    throw ValidationError.QUESTION_NOT_FOUND.message;
  }
  
  questions.splice(index, 1);
  console.log("[Fake API] Delete question:", id);
};

// Export questions array for testing
export const mockQuestions = questions;
