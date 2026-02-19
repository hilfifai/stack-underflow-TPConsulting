enum QuestionStatus {
  open,
  answered,
  closed,
}

extension QuestionStatusExtension on QuestionStatus {
  String get value {
    switch (this) {
      case QuestionStatus.open:
        return 'open';
      case QuestionStatus.answered:
        return 'answered';
      case QuestionStatus.closed:
        return 'closed';
    }
  }

  static QuestionStatus fromString(String value) {
    switch (value) {
      case 'open':
        return QuestionStatus.open;
      case 'answered':
        return QuestionStatus.answered;
      case 'closed':
        return QuestionStatus.closed;
      default:
        return QuestionStatus.open;
    }
  }
}
