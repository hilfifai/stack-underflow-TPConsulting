import 'package:stackunderflow/api/api_error.dart';
import 'package:stackunderflow/api/validators.dart';
import 'package:stackunderflow/models/comment.dart';
import 'package:stackunderflow/store/data_store.dart';

class CommentsService {
  static final CommentsService _instance = CommentsService._internal();
  factory CommentsService() => _instance;
  CommentsService._internal();

  final DataStore _dataStore = dataStore;

  Future<Comment> addComment({
    required String questionId,
    required String content,
    required String userId,
    required String username,
  }) async {
    await Future.delayed(const Duration(milliseconds: 200));

    validateComment(content);

    final comment = _dataStore.addComment(
      questionId,
      content.trim(),
      userId,
      username,
    );

    if (comment == null) {
      throw GeneralErrors.questionNotFound;
    }

    return comment;
  }

  Future<Comment> updateComment({
    required String questionId,
    required String commentId,
    required String content,
    required String userId,
  }) async {
    await Future.delayed(const Duration(milliseconds: 200));

    validateComment(content);

    if (!_dataStore.canEditComment(commentId, userId)) {
      throw GeneralErrors.unauthorized;
    }

    final comment = _dataStore.updateComment(
      questionId,
      commentId,
      content.trim(),
    );

    if (comment == null) {
      throw GeneralErrors.commentNotFound;
    }

    return comment;
  }
}

final commentsService = CommentsService();
