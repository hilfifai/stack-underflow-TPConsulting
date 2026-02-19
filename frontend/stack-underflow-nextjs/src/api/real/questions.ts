// ========================= REAL QUESTIONS API =========================
// Connects to a real backend server

import type { Question } from "@/types";
import { API_URL } from "../config";

/**
 * Get token from localStorage
 */
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

/**
 * Get all questions
 */
export const getAll = async (): Promise<Question[]> => {
  const response = await fetch(`${API_URL}/questions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const result = await response.json();
  console.log("[Real API] Get all questions:", result.data?.length || 0);
  return result.data || [];
};

/**
 * Get question by ID
 */
export const getById = async (id: string): Promise<Question> => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Question not found");
  }

  const result = await response.json();
  console.log("[Real API] Get question by id:", id);
  return result.data;
};

/**
 * Create question
 */
export const create = async (data: { title: string; description: string }): Promise<Question> => {
  const token = getToken();

  const response = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create question");
  }

  const result = await response.json();
  console.log("[Real API] Create question:", result.data);
  return result.data;
};

/**
 * Update question
 */
export const update = async (
  id: string,
  data: { title?: string; description?: string; status?: "open" | "answered" | "closed" }
): Promise<Question> => {
  const token = getToken();

  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update question");
  }

  const result = await response.json();
  console.log("[Real API] Update question:", id);
  return result.data;
};

/**
 * Delete question
 */
export const deleteQuestion = async (id: string): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete question");
  }

  console.log("[Real API] Delete question:", id);
};
