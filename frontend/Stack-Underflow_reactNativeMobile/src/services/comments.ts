import { dataStore } from "../store/dataStore";
import type { Comment } from "../types";
import { ValidationError, validateComment } from "../api/types";

// ========================= COMMENT API FUNCTIONS =========================

/**
 * Add comment
 */
export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Validate input
  validateComment(data.content);

  const comment = dataStore.addComment(
    data.questionId,
    data.content.trim(),
    data.userId,
    data.username
  );

  if (!comment) {
    throw ValidationError.QUESTION_NOT_FOUND;
  }

  return comment;
};

/**
 * Update comment
 */
export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Validate input
  validateComment(data.content);

  // Check authorization
  if (!dataStore.canEditComment(data.commentId, data.userId)) {
    throw ValidationError.UNAUTHORIZED;
  }

  const comment = dataStore.updateComment(
    data.questionId,
    data.commentId,
    data.content.trim()
  );

  if (!comment) {
    throw ValidationError.COMMENT_NOT_FOUND;
  }

  return comment;
};

/**
 * Delete comment
 */
export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Check authorization
  if (!dataStore.canEditComment(commentId, userId)) {
    throw ValidationError.UNAUTHORIZED;
  }

  return dataStore.deleteComment(questionId, commentId);
};
