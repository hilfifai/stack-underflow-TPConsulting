import type { Comment } from "@/types";
import { dataStore } from "@/store/dataStore";

// ========================= MOCK COMMENTS API =========================

/**
 * Add comment - uses in-memory data store
 */
export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const comment = dataStore.addComment(
    data.questionId,
    data.content.trim(),
    data.userId,
    data.username
  );
  if (!comment) {
    throw new Error("Question not found");
  }
  return comment;
};

/**
 * Update comment - uses in-memory data store
 */
export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const comment = dataStore.updateComment(
    data.questionId,
    data.commentId,
    data.content.trim()
  );
  if (!comment) {
    throw new Error("Comment not found");
  }
  return comment;
};

/**
 * Delete comment - uses in-memory data store
 */
export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  // For mock, we'll just verify the user can edit the comment
  if (!dataStore.canEditComment(commentId, userId)) {
    throw new Error("Unauthorized");
  }
};
