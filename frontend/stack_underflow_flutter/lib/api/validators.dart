import 'api_error.dart';

void validateTitle(String title) {
  if (title.trim().isEmpty) {
    throw QuestionErrors.titleRequired;
  }
  if (title.trim().length < 5) {
    throw QuestionErrors.titleTooShort;
  }
  if (title.trim().length > 200) {
    throw QuestionErrors.titleTooLong;
  }
}

void validateDescription(String description) {
  if (description.trim().isEmpty) {
    throw QuestionErrors.descriptionRequired;
  }
  if (description.trim().length < 10) {
    throw QuestionErrors.descriptionTooShort;
  }
  if (description.trim().length > 5000) {
    throw QuestionErrors.descriptionTooLong;
  }
}

void validateComment(String content) {
  if (content.trim().isEmpty) {
    throw CommentErrors.commentRequired;
  }
  if (content.trim().length < 3) {
    throw CommentErrors.commentTooShort;
  }
  if (content.trim().length > 1000) {
    throw CommentErrors.commentTooLong;
  }
}

void validateUsername(String username) {
  if (username.trim().isEmpty) {
    throw AuthErrors.usernameRequired;
  }
}

void validatePassword(String password) {
  if (password.trim().isEmpty) {
    throw AuthErrors.passwordRequired;
  }
}
