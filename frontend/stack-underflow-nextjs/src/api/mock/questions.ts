// ========================= MOCK QUESTIONS API =========================
// In-memory data store with predictable responses

import type { Question } from "@/types";
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

/**
 * Get all questions
 */
export const getAll = async (): Promise<Question[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  console.log("[Mock API] Get all questions:", questions.length);
  return [...questions];
};

/**
 * Get question by ID
 */
export const getById = async (id: string): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  
  const question = questions.find((q) => q.id === id);
  if (!question) {
    throw ValidationError.QUESTION_NOT_FOUND.message;
  }
  
  console.log("[Mock API] Get question by id:", id);
  return question;
};

/**
 * Create question
 */
export const create = async (data: { title: string; description: string }): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  validateTitle(data.title);
  validateDescription(data.description);
  
  const question: Question = {
    id: `q_${Date.now()}`,
    title: data.title.trim(),
    description: data.description.trim(),
    status: "open",
    userId: "user_1",
    username: "admin",
    createdAt: new Date().toISOString(),
    comments: [],
  };
  
  questions.unshift(question);
  console.log("[Mock API] Create question:", question);
  return question;
};

/**
 * Update question
 */
export const update = async (
  id: string,
  data: { title?: string; description?: string; status?: "open" | "answered" | "closed" }
): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  
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
  
  console.log("[Mock API] Update question:", id);
  return question;
};

/**
 * Delete question
 */
export const deleteQuestion = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  
  const index = questions.findIndex((q) => q.id === id);
  if (index === -1) {
    throw ValidationError.QUESTION_NOT_FOUND.message;
  }
  
  questions.splice(index, 1);
  console.log("[Mock API] Delete question:", id);
};

// Export for testing
export const mockQuestions = questions;
