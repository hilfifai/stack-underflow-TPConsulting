import 'package:flutter/foundation.dart';
import 'package:stackunderflow/api/auth_service.dart';
import 'package:stackunderflow/models/comment.dart';
import 'package:stackunderflow/models/question.dart';
import 'package:stackunderflow/models/question_status.dart';
import 'package:stackunderflow/models/user.dart';
import 'package:stackunderflow/store/data_store.dart';

class AuthProvider with ChangeNotifier {
  User? _currentUser;
  bool _isLoading = false;
  String? _error;

  User? get user => _currentUser;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _currentUser != null;

  AuthProvider() {
    _loadCurrentUser();
  }

  void _loadCurrentUser() async {
    try {
      final user = await authService.getCurrentUser();
      if (user != null) {
        _currentUser = user;
        notifyListeners();
      }
    } catch (e) {
      _error = e.toString();
    }
  }

  Future<bool> login(String username, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await authService.login(username: username, password: password);
      final user = await authService.getCurrentUser();
      _currentUser = user;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> signup(String username, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await authService.signup(username: username, password: password);
      final user = await authService.getCurrentUser();
      _currentUser = user;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    try {
      await authService.logout();
      _currentUser = null;
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Question methods (delegated to dataStore)
  List<Question> getQuestions() {
    return dataStore.getQuestions();
  }

  Question? getQuestionById(String id) {
    return dataStore.getQuestionById(id);
  }

  Future<Question> createQuestion(
    String title,
    String description,
    List<String> tags,
  ) async {
    if (_currentUser == null) {
      throw Exception('Not authenticated');
    }

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));

    final question = dataStore.createQuestion(
      title,
      description,
      _currentUser!.id,
      _currentUser!.username,
    );

    notifyListeners();
    return question;
  }

  Future<Question> updateQuestion(
    String id, {
    String? title,
    String? description,
    List<String>? tags,
    QuestionStatus? status,
  }) async {
    if (_currentUser == null) {
      throw Exception('Not authenticated');
    }

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));

    final updatedQuestion = dataStore.updateQuestion(
      id,
      title: title,
      description: description,
      tags: tags,
      status: status,
      userId: _currentUser!.id,
    );

    if (updatedQuestion == null) {
      throw Exception('Question not found');
    }

    notifyListeners();
    return updatedQuestion;
  }

  Future<void> voteQuestion(String questionId, String type) async {
    if (_currentUser == null) {
      throw Exception('Not authenticated');
    }

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 200));

    final question = dataStore.getQuestionById(questionId);
    if (question == null) {
      throw Exception('Question not found');
    }

    if (type == 'up') {
      dataStore.voteQuestion(questionId, _currentUser!.id, 'up');
    } else if (type == 'down') {
      dataStore.voteQuestion(questionId, _currentUser!.id, 'down');
    }

    notifyListeners();
  }

  // Comment methods
  Future<Comment> addComment(String questionId, String content) async {
    if (_currentUser == null) {
      throw Exception('Not authenticated');
    }

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 500));

    final comment = dataStore.addComment(
      questionId,
      content,
      _currentUser!.id,
      _currentUser!.username,
    );

    if (comment == null) {
      throw Exception('Question not found');
    }

    notifyListeners();
    return comment;
  }

  Future<void> voteComment(String questionId, String commentId, String type) async {
    if (_currentUser == null) {
      throw Exception('Not authenticated');
    }

    // Simulate API delay
    await Future.delayed(const Duration(milliseconds: 200));

    if (type == 'up') {
      dataStore.voteComment(questionId, commentId, _currentUser!.id, 'up');
    } else if (type == 'down') {
      dataStore.voteComment(questionId, commentId, _currentUser!.id, 'down');
    }

    notifyListeners();
  }
}
