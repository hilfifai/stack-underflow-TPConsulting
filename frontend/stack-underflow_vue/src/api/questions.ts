// Questions API - Selects implementation based on VITE_API_LAYER environment variable
// Default: mock (in-memory data store)
// Options: mock, fake (simulated responses), real (backend API)

import type { Question, QuestionStatus } from "@/types";

// Get API layer from environment variable, default to mock
const API_LAYER = (import.meta.env.VITE_API_LAYER as string) || "mock";

// Dynamic import based on API layer
async function getQuestionsAPI() {
  switch (API_LAYER) {
    case "fake":
      return await import("./fake/questions");
    case "real":
      return await import("./real/questions");
    case "mock":
    default:
      return await import("./mock/questions");
  }
}

// Export functions that delegate to the selected API implementation
export const fetchQuestions = async (): Promise<Question[]> => {
  const api = await getQuestionsAPI();
  return api.fetchQuestions();
};

export const fetchQuestionById = async (id: string): Promise<Question> => {
  const api = await getQuestionsAPI();
  return api.fetchQuestionById(id);
};

export const createQuestion = async (data: {
  title: string;
  description: string;
  userId: string;
  username: string;
}): Promise<Question> => {
  const api = await getQuestionsAPI();
  return api.createQuestion(data);
};

export const updateQuestion = async (data: {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
}): Promise<Question> => {
  const api = await getQuestionsAPI();
  return api.updateQuestion(data);
};

export const searchQuestions = async (query: string): Promise<Question[]> => {
  const api = await getQuestionsAPI();
  return api.searchQuestions(query);
};

export const getRelatedQuestions = async (
  questionId: string,
  limit: number
): Promise<Question[]> => {
  const api = await getQuestionsAPI();
  return api.getRelatedQuestions(questionId, limit);
};

export const getHotNetworkQuestions = async (limit: number): Promise<Question[]> => {
  const api = await getQuestionsAPI();
  return api.getHotNetworkQuestions(limit);
};
