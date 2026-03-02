// ========================= QUESTIONS API FACTORY =========================
// Selects implementation based on API_LAYER environment variable

import type { Question } from "@/types";
import { API_LAYER } from "./config";

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

export const getAll = async (): Promise<Question[]> => {
  const api = await getQuestionsAPI();
  return api.getAll();
};

export const getById = async (id: string): Promise<Question> => {
  const api = await getQuestionsAPI();
  return api.getById(id);
};

export const create = async (data: { title: string; description: string }): Promise<Question> => {
  const api = await getQuestionsAPI();
  return api.create(data);
};

export const update = async (
  id: string,
  data: { title?: string; description?: string; status?: "open" | "answered" | "closed" }
): Promise<Question> => {
  const api = await getQuestionsAPI();
  return api.update(id, data);
};

export const deleteQuestion = async (id: string): Promise<void> => {
  const api = await getQuestionsAPI();
  return api.deleteQuestion(id);
};

export type { Question } from "@/types";
