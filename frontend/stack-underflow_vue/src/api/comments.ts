// Comments API - Selects implementation based on VITE_API_LAYER environment variable
// Default: mock (in-memory data store)
// Options: mock, fake (simulated responses), real (backend API)

import type { Comment } from "@/types";

// Get API layer from environment variable, default to mock
const API_LAYER = (import.meta.env.VITE_API_LAYER as string) || "mock";

// Dynamic import based on API layer
async function getCommentsAPI() {
  switch (API_LAYER) {
    case "fake":
      return await import("./fake/comments");
    case "real":
      return await import("./real/comments");
    case "mock":
    default:
      return await import("./mock/comments");
  }
}

// Export functions that delegate to the selected API implementation
export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  const api = await getCommentsAPI();
  return api.addComment(data);
};

export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  const api = await getCommentsAPI();
  return api.updateComment(data);
};

export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<void> => {
  const api = await getCommentsAPI();
  return api.deleteComment(questionId, commentId, userId);
};
