import type { Question, QuestionStatus } from '../../types';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ========================= REAL QUESTIONS API =========================
// Connects to a real backend server

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(`${API_URL}/questions`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch questions');
  }
  const result = await response.json();
  console.log('[Real API] Fetched questions:', result.data?.length || 0);
  return result.data || [];
};

export const fetchQuestionById = async (id: string): Promise<Question> => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Question not found');
  }
  const result = await response.json();
  console.log('[Real API] Fetched question:', id);
  return result.data;
};

export const createQuestion = async (data: {
  title: string;
  description: string;
  userId: string;
  username: string;
}): Promise<Question> => {
  const response = await fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create question');
  }
  const result = await response.json();
  console.log('[Real API] Created question:', result.data?.id);
  return result.data;
};

export const updateQuestion = async (data: {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
}): Promise<Question> => {
  const response = await fetch(`${API_URL}/questions/${data.id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      status: data.status,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update question');
  }
  const result = await response.json();
  console.log('[Real API] Updated question:', data.id);
  return result.data;
};

export const searchQuestions = async (query: string): Promise<Question[]> => {
  const response = await fetch(`${API_URL}/questions/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Search failed');
  }
  const result = await response.json();
  console.log('[Real API] Search results:', result.data?.length || 0);
  return result.data || [];
};

export const getRelatedQuestions = async (questionId: string, limit: number): Promise<Question[]> => {
  const response = await fetch(`${API_URL}/questions/${questionId}/related?limit=${limit}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch related questions');
  }
  const result = await response.json();
  console.log('[Real API] Related questions:', result.data?.length || 0);
  return result.data || [];
};

export const getHotNetworkQuestions = async (limit: number): Promise<Question[]> => {
  const response = await fetch(`${API_URL}/questions/hot?limit=${limit}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch hot questions');
  }
  const result = await response.json();
  console.log('[Real API] Hot questions:', result.data?.length || 0);
  return result.data || [];
};
