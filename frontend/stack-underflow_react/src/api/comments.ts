import { dataStore } from "#src/store/dataStore";
import type { Comment } from "#src/types";
import { ValidationError, validateComment } from "./types";

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
