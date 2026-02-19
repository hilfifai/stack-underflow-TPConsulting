import type { Comment } from '../../types';
import { DataStore } from '../../store/data.store';

const dataStore = new DataStore();

export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const question = dataStore.getQuestionById(data.questionId);
  if (!question) {
    throw new Error('Question not found');
  }
  const newComment: Comment = {
    id: `c_${Date.now()}`,
    questionId: data.questionId,
    userId: data.userId,
    username: data.username,
    content: data.content.trim(),
    createdAt: new Date(),
  };
  question.comments.push(newComment);
  return newComment;
};

export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const question = dataStore.getQuestionById(data.questionId);
  if (!question) {
    throw new Error('Question not found');
  }
  const comment = question.comments.find((c) => c.id === data.commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.userId !== data.userId) {
    throw new Error('You are not authorized to edit this comment');
  }
  comment.content = data.content.trim();
  return comment;
};

export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const question = dataStore.getQuestionById(questionId);
  if (!question) {
    throw new Error('Question not found');
  }
  const comment = question.comments.find((c) => c.id === commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.userId !== userId) {
    throw new Error('You are not authorized to delete this comment');
  }
  question.comments = question.comments.filter((c) => c.id !== commentId);
};
