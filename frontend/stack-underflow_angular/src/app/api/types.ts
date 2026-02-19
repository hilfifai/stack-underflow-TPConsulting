// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Validation errors
export const ValidationError = {
  TITLE_REQUIRED: new ApiError('Title is required', 'TITLE_REQUIRED'),
  TITLE_TOO_SHORT: new ApiError('Title must be at least 5 characters', 'TITLE_TOO_SHORT'),
  TITLE_TOO_LONG: new ApiError('Title must be less than 200 characters', 'TITLE_TOO_LONG'),
  DESCRIPTION_REQUIRED: new ApiError('Description is required', 'DESCRIPTION_REQUIRED'),
  DESCRIPTION_TOO_SHORT: new ApiError('Description must be at least 10 characters', 'DESCRIPTION_TOO_SHORT'),
  DESCRIPTION_TOO_LONG: new ApiError('Description must be less than 5000 characters', 'DESCRIPTION_TOO_LONG'),
  COMMENT_REQUIRED: new ApiError('Comment content is required', 'COMMENT_REQUIRED'),
  COMMENT_TOO_SHORT: new ApiError('Comment must be at least 3 characters', 'COMMENT_TOO_SHORT'),
  COMMENT_TOO_LONG: new ApiError('Comment must be less than 1000 characters', 'COMMENT_TOO_LONG'),
  USERNAME_REQUIRED: new ApiError('Username is required', 'USERNAME_REQUIRED'),
  PASSWORD_REQUIRED: new ApiError('Password is required', 'PASSWORD_REQUIRED'),
  QUESTION_NOT_FOUND: new ApiError('Question not found', 'QUESTION_NOT_FOUND'),
  COMMENT_NOT_FOUND: new ApiError('Comment not found', 'COMMENT_NOT_FOUND'),
  UNAUTHORIZED: new ApiError('You are not authorized to perform this action', 'UNAUTHORIZED'),
};

export function validateTitle(title: string): void {
  if (!title || title.trim() === '') {
    throw ValidationError.TITLE_REQUIRED;
  }
  if (title.trim().length < 5) {
    throw ValidationError.TITLE_TOO_SHORT;
  }
  if (title.trim().length > 200) {
    throw ValidationError.TITLE_TOO_LONG;
  }
}

export function validateDescription(description: string): void {
  if (!description || description.trim() === '') {
    throw ValidationError.DESCRIPTION_REQUIRED;
  }
  if (description.trim().length < 10) {
    throw ValidationError.DESCRIPTION_TOO_SHORT;
  }
  if (description.trim().length > 5000) {
    throw ValidationError.DESCRIPTION_TOO_LONG;
  }
}

export function validateComment(content: string): void {
  if (!content || content.trim() === '') {
    throw ValidationError.COMMENT_REQUIRED;
  }
  if (content.trim().length < 3) {
    throw ValidationError.COMMENT_TOO_SHORT;
  }
  if (content.trim().length > 1000) {
    throw ValidationError.COMMENT_TOO_LONG;
  }
}

export function validateUsername(username: string): void {
  if (!username || username.trim() === '') {
    throw ValidationError.USERNAME_REQUIRED;
  }
}

export function validatePassword(password: string): void {
  if (!password || password.trim() === '') {
    throw ValidationError.PASSWORD_REQUIRED;
  }
}
