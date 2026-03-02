class ApiError implements Exception {
  final String message;
  final String code;
  final Map<String, dynamic>? details;

  const ApiError(
    this.message,
    this.code, {
    this.details,
  });

  @override
  String toString() => message;
}

// Question errors
class QuestionErrors {
  static const ApiError titleRequired = ApiError(
    'Title is required',
    'TITLE_REQUIRED',
  );
  static const ApiError titleTooShort = ApiError(
    'Title must be at least 5 characters',
    'TITLE_TOO_SHORT',
  );
  static const ApiError titleTooLong = ApiError(
    'Title must be less than 200 characters',
    'TITLE_TOO_LONG',
  );
  static const ApiError descriptionRequired = ApiError(
    'Description is required',
    'DESCRIPTION_REQUIRED',
  );
  static const ApiError descriptionTooShort = ApiError(
    'Description must be at least 10 characters',
    'DESCRIPTION_TOO_SHORT',
  );
  static const ApiError descriptionTooLong = ApiError(
    'Description must be less than 5000 characters',
    'DESCRIPTION_TOO_LONG',
  );
}

// Comment errors
class CommentErrors {
  static const ApiError commentRequired = ApiError(
    'Comment content is required',
    'COMMENT_REQUIRED',
  );
  static const ApiError commentTooShort = ApiError(
    'Comment must be at least 3 characters',
    'COMMENT_TOO_SHORT',
  );
  static const ApiError commentTooLong = ApiError(
    'Comment must be less than 1000 characters',
    'COMMENT_TOO_LONG',
  );
}

// Auth errors
class AuthErrors {
  static const ApiError usernameRequired = ApiError(
    'Username is required',
    'USERNAME_REQUIRED',
  );
  static const ApiError passwordRequired = ApiError(
    'Password is required',
    'PASSWORD_REQUIRED',
  );
}

// General errors
class GeneralErrors {
  static const ApiError questionNotFound = ApiError(
    'Question not found',
    'QUESTION_NOT_FOUND',
  );
  static const ApiError commentNotFound = ApiError(
    'Comment not found',
    'COMMENT_NOT_FOUND',
  );
  static const ApiError unauthorized = ApiError(
    'You are not authorized to perform this action',
    'UNAUTHORIZED',
  );
}
