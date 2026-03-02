// ========================= CORE TYPES =========================
// Shared types used across the entire application

export type QuestionStatus = "open" | "answered" | "closed";

export interface User {
  id: string;
  username: string;
}

export interface Comment {
  id: string;
  questionId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string; // ISO date string
}

export interface Question {
  id: string;
  title: string;
  description: string;
  status: QuestionStatus;
  userId: string;
  username: string;
  createdAt: string; // ISO date string
  comments?: Comment[];
}

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
