import type { Comment } from '../../types';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ========================= REAL COMMENTS API =========================
// Connects to a real backend server

export const addComment = async (data: {
  questionId: string;
  content: string;
  userId: string;
  username: string;
}): Promise<Comment> => {
  const response = await fetch(`${API_URL}/questions/${data.questionId}/comments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ content: data.content }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add comment');
  }
  const result = await response.json();
  console.log('[Real API] Added comment:', result.data?.id);
  return result.data;
};

export const updateComment = async (data: {
  questionId: string;
  commentId: string;
  content: string;
  userId: string;
}): Promise<Comment> => {
  const response = await fetch(`${API_URL}/questions/${data.questionId}/comments/${data.commentId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ content: data.content }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update comment');
  }
  const result = await response.json();
  console.log('[Real API] Updated comment:', data.commentId);
  return result.data;
};

export const deleteComment = async (
  questionId: string,
  commentId: string,
  userId: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/questions/${questionId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete comment');
  }
  console.log('[Real API] Deleted comment:', commentId);
};
