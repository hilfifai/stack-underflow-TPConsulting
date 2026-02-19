import 'package:stackunderflow/api/api_error.dart';
import 'package:stackunderflow/api/validators.dart';
import 'package:stackunderflow/models/question.dart';
import 'package:stackunderflow/models/question_status.dart';
import 'package:stackunderflow/store/data_store.dart';

class QuestionsService {
  static final QuestionsService _instance = QuestionsService._internal();
  factory QuestionsService() => _instance;
  QuestionsService._internal();

  final DataStore _dataStore = dataStore;

  Future<List<Question>> fetchQuestions() async {
    await Future.delayed(const Duration(milliseconds: 100));
    return _dataStore.getQuestions();
  }

  Future<Question> fetchQuestionById(String id) async {
    await Future.delayed(const Duration(milliseconds: 100));
    final question = _dataStore.getQuestionById(id);
    if (question == null) {
      throw GeneralErrors.questionNotFound;
    }
    return question;
  }

  Future<Question> createQuestion({
    required String title,
    required String description,
    required String userId,
    required String username,
    List<String> tags = const [],
  }) async {
    await Future.delayed(const Duration(milliseconds: 200));

    validateTitle(title);
    validateDescription(description);

    return _dataStore.createQuestion(
      title.trim(),
      description.trim(),
      userId,
      username,
      tags: tags,
    );
  }

  Future<Question> updateQuestion({
    required String id,
    String? title,
    String? description,
    QuestionStatus? status,
    List<String>? tags,
    String? userId,
  }) async {
    await Future.delayed(const Duration(milliseconds: 200));

    if (title != null) {
      validateTitle(title);
    }
    if (description != null) {
      validateDescription(description);
    }

    if (userId != null && !_dataStore.canEditQuestion(id, userId)) {
      throw GeneralErrors.unauthorized;
    }

    final question = _dataStore.updateQuestion(
      id,
      title: title?.trim(),
      description: description?.trim(),
      status: status,
      tags: tags,
    );

    if (question == null) {
      throw GeneralErrors.questionNotFound;
    }

    return question;
  }
}

final questionsService = QuestionsService();
