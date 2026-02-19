// ========================= REAL COMMENTS API =========================

import type { Comment } from "@/types";
import { API_URL } from "../config";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getByQuestionId = async (questionId: string): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/questions/${questionId}/comments`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const result = await response.json();
  return result.data || [];
};

export const create = async (data: { questionId: string; content: string }): Promise<Comment> => {
  const token = getToken();

  const response = await fetch(`${API_URL}/questions/${data.questionId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ content: data.content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create comment");
  }

  const result = await response.json();
  return result.data;
};

export const deleteComment = async (id: string): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete comment");
  }
};
