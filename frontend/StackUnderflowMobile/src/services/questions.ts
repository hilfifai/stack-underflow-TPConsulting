import { dataStore } from "../store/dataStore";
import type { Question, QuestionStatus } from "../types";
import { ValidationError, validateTitle, validateDescription } from "../api/types";

// ========================= QUESTION API FUNCTIONS =========================

/**
 * Get all questions with optional search and pagination
 */
export const fetchQuestions = async (options?: {
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<Question[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.getQuestions(options);
};

/**
 * Get question by ID
 */
export const fetchQuestionById = async (id: string): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const question = dataStore.getQuestionById(id);
  if (!question) {
    throw ValidationError.QUESTION_NOT_FOUND;
  }
  return question;
};

/**
 * Create question
 */
export const createQuestion = async (data: {
  title: string;
  description: string;
  userId: string;
  username: string;
}): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Validate input
  validateTitle(data.title);
  validateDescription(data.description);

  return dataStore.createQuestion(
    data.title.trim(),
    data.description.trim(),
    data.userId,
    data.username
  );
};

/**
 * Update question
 */
export const updateQuestion = async (data: {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
}): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Validate input
  validateTitle(data.title);
  validateDescription(data.description);

  // Check authorization
  if (!dataStore.canEditQuestion(data.id, data.userId)) {
    throw ValidationError.UNAUTHORIZED;
  }

  const question = dataStore.updateQuestion(
    data.id,
    data.title.trim(),
    data.description.trim(),
    data.status
  );

  if (!question) {
    throw ValidationError.QUESTION_NOT_FOUND;
  }

  return question;
};

/**
 * Delete question
 */
export const deleteQuestion = async (id: string, userId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Check authorization
  if (!dataStore.canEditQuestion(id, userId)) {
    throw ValidationError.UNAUTHORIZED;
  }

  return dataStore.deleteQuestion(id);
};
