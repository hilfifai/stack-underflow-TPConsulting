import type { Comment } from "@/types";

// ========================= FAKE COMMENTS API =========================
// Simulates API responses with artificial delays
// Useful for testing UI states like loading, error, success

// In-memory storage for comments (shared with fake questions)
const fakeComments: Comment[] = [];

/**
 * Add comment - fake API with random delays
 */
export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  // Simulate network delay (200-500ms)
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to add comment. Please try again.");
  }

  // Validate input
  if (!data.content.trim() || data.content.trim().length < 3) {
    throw new Error("Comment must be at least 3 characters");
  }

  const newComment: Comment = {
    id: `comment_${Date.now()}`,
    questionId: data.questionId,
    userId: data.userId,
    username: data.username,
    content: data.content.trim(),
    createdAt: new Date(),
  };

  fakeComments.push(newComment);

  console.log("[Fake API] Added comment:", newComment.id);
  return newComment;
};

/**
 * Update comment - fake API with random delays
 */
export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  // Simulate network delay (200-500ms)
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to update comment. Please try again.");
  }

  const commentIndex = fakeComments.findIndex((c) => c.id === data.commentId);

  if (commentIndex === -1) {
    throw new Error("Comment not found");
  }

  // Validate authorization
  if (fakeComments[commentIndex].userId !== data.userId) {
    throw new Error("You are not authorized to edit this comment");
  }

  // Validate input
  if (!data.content.trim() || data.content.trim().length < 3) {
    throw new Error("Comment must be at least 3 characters");
  }

  // Update the comment
  fakeComments[commentIndex] = {
    ...fakeComments[commentIndex],
    content: data.content.trim(),
  };

  console.log("[Fake API] Updated comment:", data.commentId);
  return fakeComments[commentIndex];
};

/**
 * Delete comment - fake API with random delays
 */
export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<void> => {
  // Simulate network delay (200-400ms)
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 200));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to delete comment. Please try again.");
  }

  const commentIndex = fakeComments.findIndex((c) => c.id === commentId);

  if (commentIndex === -1) {
    throw new Error("Comment not found");
  }

  // Validate authorization
  if (fakeComments[commentIndex].userId !== userId) {
    throw new Error("You are not authorized to delete this comment");
  }

  // Delete the comment
  fakeComments.splice(commentIndex, 1);

  console.log("[Fake API] Deleted comment:", commentId);
};
