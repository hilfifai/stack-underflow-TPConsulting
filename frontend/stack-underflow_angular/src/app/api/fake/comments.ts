import type { Comment } from '../../types';

// ========================= FAKE COMMENTS API =========================
// Simulates API responses with artificial delays

const comments: Map<string, Comment[]> = new Map();

export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
  if (Math.random() < 0.05) {
    throw new Error('Failed to add comment. Please try again.');
  }
  if (!data.content.trim() || data.content.trim().length < 3) {
    throw new Error('Comment must be at least 3 characters');
  }
  const newComment: Comment = {
    id: `c_${Date.now()}`,
    questionId: data.questionId,
    userId: data.userId,
    username: data.username,
    content: data.content.trim(),
    createdAt: new Date(),
  };
  const questionComments = comments.get(data.questionId) || [];
  questionComments.push(newComment);
  comments.set(data.questionId, questionComments);
  console.log('[Fake API] Added comment:', newComment.id);
  return newComment;
};

export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
  if (Math.random() < 0.05) {
    throw new Error('Failed to update comment. Please try again.');
  }
  const questionComments = comments.get(data.questionId);
  if (!questionComments) {
    throw new Error('Question not found');
  }
  const comment = questionComments.find((c) => c.id === data.commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.userId !== data.userId) {
    throw new Error('You are not authorized to edit this comment');
  }
  comment.content = data.content.trim();
  console.log('[Fake API] Updated comment:', data.commentId);
  return comment;
};

export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
  if (Math.random() < 0.05) {
    throw new Error('Failed to delete comment. Please try again.');
  }
  const questionComments = comments.get(questionId);
  if (!questionComments) {
    throw new Error('Question not found');
  }
  const comment = questionComments.find((c) => c.id === commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.userId !== userId) {
    throw new Error('You are not authorized to delete this comment');
  }
  comments.set(questionId, questionComments.filter((c) => c.id !== commentId));
  console.log('[Fake API] Deleted comment:', commentId);
};
