import type { Question, QuestionStatus } from "@/types";
import { dataStore } from "@/store/dataStore";

// ========================= MOCK QUESTIONS API =========================

/**
 * Get all questions - uses in-memory data store
 */
export const fetchQuestions = async (): Promise<Question[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.getQuestions();
};

/**
 * Get question by ID - uses in-memory data store
 */
export const fetchQuestionById = async (id: string): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const question = dataStore.getQuestionById(id);
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
};

/**
 * Create question - uses in-memory data store
 */
export const createQuestion = async (data: {
  title: string;
  description: string;
  userId: string;
  username: string;
}): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return dataStore.createQuestion(
    data.title.trim(),
    data.description.trim(),
    data.userId,
    data.username
  );
};

/**
 * Update question - uses in-memory data store
 */
export const updateQuestion = async (data: {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
}): Promise<Question> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const question = dataStore.updateQuestion(
    data.id,
    data.title.trim(),
    data.description.trim(),
    data.status
  );
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
};

/**
 * Search questions - uses in-memory data store
 */
export const searchQuestions = async (query: string): Promise<Question[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.searchQuestions(query);
};

/**
 * Get related questions - uses in-memory data store
 */
export const getRelatedQuestions = async (
  questionId: string,
  limit: number
): Promise<Question[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.getRelatedQuestions(questionId, limit);
};

/**
 * Get hot network questions - uses in-memory data store
 */
export const getHotNetworkQuestions = async (limit: number): Promise<Question[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.getHotNetworkQuestions(limit);
};
