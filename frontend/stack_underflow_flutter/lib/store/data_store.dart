import 'package:stackunderflow/models/comment.dart';
import 'package:stackunderflow/models/question.dart';
import 'package:stackunderflow/models/question_status.dart';
import 'package:stackunderflow/models/user.dart';

class DataStore {
  static final DataStore _instance = DataStore._internal();
  factory DataStore() => _instance;
  DataStore._internal();

  final List<Question> _questions = [];
  final Map<String, int> _questionVotes = {};
  final Map<String, int> _commentVotes = {};
  User? _currentUser;
  final Map<String, String> _users = {};

  void initializeData() {
    final now = DateTime.now();
    final yesterday = now.subtract(const Duration(days: 1));
    final twoDaysAgo = now.subtract(const Duration(days: 2));
    final threeDaysAgo = now.subtract(const Duration(days: 3));
    final fourDaysAgo = now.subtract(const Duration(days: 4));
    final fiveDaysAgo = now.subtract(const Duration(days: 5));
    final sixDaysAgo = now.subtract(const Duration(days: 6));
    final weekAgo = now.subtract(const Duration(days: 7));

    _questions.addAll([
      Question(
        id: '1',
        title: 'How do I center a div in CSS?',
        description:
            "I've tried using margin: auto but it's not working. What's the best way to center a div both horizontally and vertically?",
        status: QuestionStatus.answered,
        userId: 'user1',
        username: 'dev_master',
        createdAt: twoDaysAgo,
        upvotes: 10,
        downvotes: 1,
        comments: [
          Comment(
            id: 'c1',
            questionId: '1',
            userId: 'user2',
            username: 'css_ninja',
            content:
                'You can use flexbox: display: flex; justify-content: center; align-items: center;',
            createdAt: twoDaysAgo,
            upvotes: 5,
            downvotes: 0,
          ),
          Comment(
            id: 'c2',
            questionId: '1',
            userId: 'user3',
            username: 'web_wizard',
            content: 'Or use grid: display: grid; place-items: center;',
            createdAt: yesterday,
            upvotes: 3,
            downvotes: 0,
          ),
        ],
      ),
      Question(
        id: '2',
        title: "What's the difference between let and const in JavaScript?",
        description:
            "I'm new to JavaScript and I'm confused about when to use let vs const. Can someone explain the difference?",
        status: QuestionStatus.open,
        userId: 'user2',
        username: 'js_learner',
        createdAt: yesterday,
        upvotes: 8,
        downvotes: 0,
        comments: [],
      ),
      Question(
        id: '3',
        title: 'React useEffect dependency array explained',
        description:
            'Can someone explain how the dependency array in useEffect works? When should I include variables in it?',
        status: QuestionStatus.open,
        userId: 'user3',
        username: 'react_fan',
        createdAt: now,
        upvotes: 12,
        downvotes: 1,
        comments: [
          Comment(
            id: 'c3',
            questionId: '3',
            userId: 'user1',
            username: 'dev_master',
            content:
                'The dependency array tells React when to re-run the effect. Include any variables that the effect uses.',
            createdAt: now,
            upvotes: 7,
            downvotes: 0,
          ),
        ],
      ),
      Question(
        id: '4',
        title: 'How to handle async/await errors properly?',
        description:
            "I'm using async/await but not sure about the best way to handle errors. Should I use try/catch everywhere?",
        status: QuestionStatus.closed,
        userId: 'user4',
        username: 'async_expert',
        createdAt: twoDaysAgo,
        upvotes: 15,
        downvotes: 2,
        comments: [
          Comment(
            id: 'c4',
            questionId: '4',
            userId: 'user1',
            username: 'dev_master',
            content: 'Yes, try/catch is the standard way. You can also use .catch() with promises.',
            createdAt: twoDaysAgo,
            upvotes: 6,
            downvotes: 0,
          ),
        ],
      ),
      Question(
        id: '5',
        title: 'Python list comprehension vs map function',
        description:
            'Which is more Pythonic - list comprehension or map function? What are the performance differences?',
        status: QuestionStatus.answered,
        userId: 'user5',
        username: 'pythonista',
        createdAt: threeDaysAgo,
        upvotes: 9,
        downvotes: 1,
        comments: [
          Comment(
            id: 'c5',
            questionId: '5',
            userId: 'user6',
            username: 'code_guru',
            content:
                'List comprehensions are generally more readable and Pythonic. Map can be faster for simple operations.',
            createdAt: threeDaysAgo,
            upvotes: 4,
            downvotes: 0,
          ),
        ],
      ),
      Question(
        id: '6',
        title: 'Understanding Git rebase vs merge',
        description:
            'When should I use git rebase instead of git merge? What are the pros and cons of each?',
        status: QuestionStatus.open,
        userId: 'user7',
        username: 'git_novice',
        createdAt: fourDaysAgo,
        upvotes: 20,
        downvotes: 3,
        comments: [],
      ),
      Question(
        id: '7',
        title: 'How to optimize database queries in PostgreSQL?',
        description:
            'My queries are running slow. What are some best practices for optimizing PostgreSQL queries?',
        status: QuestionStatus.answered,
        userId: 'user8',
        username: 'db_admin',
        createdAt: fiveDaysAgo,
        upvotes: 14,
        downvotes: 1,
        comments: [
          Comment(
            id: 'c6',
            questionId: '7',
            userId: 'user9',
            username: 'sql_expert',
            content:
                "Use EXPLAIN ANALYZE to analyze query plans, create appropriate indexes, and avoid SELECT *.",
            createdAt: fiveDaysAgo,
            upvotes: 8,
            downvotes: 0,
          ),
        ],
      ),
      Question(
        id: '8',
        title: 'TypeScript interface vs type alias',
        description:
            "What's the difference between interface and type in TypeScript? When should I use each?",
        status: QuestionStatus.open,
        userId: 'user10',
        username: 'ts_dev',
        createdAt: sixDaysAgo,
        upvotes: 11,
        downvotes: 2,
        comments: [],
      ),
      Question(
        id: '9',
        title: 'Docker container networking explained',
        description:
            'How do Docker containers communicate with each other? What are the different networking modes?',
        status: QuestionStatus.answered,
        userId: 'user11',
        username: 'docker_fan',
        createdAt: weekAgo,
        upvotes: 7,
        downvotes: 0,
        comments: [
          Comment(
            id: 'c7',
            questionId: '9',
            userId: 'user12',
            username: 'devops_pro',
            content:
                'Docker has bridge, host, overlay, and macvlan networks. Bridge is the default for single-host communication.',
            createdAt: weekAgo,
            upvotes: 5,
            downvotes: 0,
          ),
        ],
      ),
      Question(
        id: '10',
        title: 'REST API vs GraphQL: Which to choose?',
        description:
            "I'm building a new API. Should I use REST or GraphQL? What are the trade-offs?",
        status: QuestionStatus.open,
        userId: 'user13',
        username: 'api_designer',
        createdAt: yesterday,
        upvotes: 6,
        downvotes: 1,
        comments: [],
      ),
    ]);
  }

  // User methods
  void login(String username, String password) {
    if (_users.containsKey(username)) {
      if (_users[username] != password) {
        throw Exception('Invalid password');
      }
    }
    _currentUser = User(
      id: 'user_${DateTime.now().millisecondsSinceEpoch}',
      username: username,
    );
  }

  void signup(String username, String password) {
    if (_users.containsKey(username)) {
      throw Exception('Username already exists');
    }
    _users[username] = password;
    _currentUser = User(
      id: 'user_${DateTime.now().millisecondsSinceEpoch}',
      username: username,
    );
  }

  void logout() {
    _currentUser = null;
  }

  User? getCurrentUser() {
    return _currentUser;
  }

  // Question methods
  List<Question> getQuestions() {
    return List.unmodifiable(_questions);
  }

  Question? getQuestionById(String id) {
    try {
      return _questions.firstWhere((q) => q.id == id);
    } catch (e) {
      return null;
    }
  }

  Question createQuestion(
    String title,
    String description,
    String userId,
    String username, {
    List<String> tags = const [],
  }) {
    final question = Question(
      id: '${_questions.length + 1}',
      title: title,
      description: description,
      status: QuestionStatus.open,
      userId: userId,
      username: username,
      createdAt: DateTime.now(),
      comments: [],
      upvotes: 0,
      downvotes: 0,
      tags: tags,
    );
    _questions.insert(0, question);
    return question;
  }

  Question? updateQuestion(
    String id, {
    String? title,
    String? description,
    List<String>? tags,
    QuestionStatus? status,
    String? userId,
  }) {
    final index = _questions.indexWhere((q) => q.id == id);
    if (index == -1) return null;

    final question = _questions[index];
    _questions[index] = Question(
      id: question.id,
      title: title ?? question.title,
      description: description ?? question.description,
      status: status ?? question.status,
      userId: question.userId,
      username: question.username,
      createdAt: question.createdAt,
      comments: question.comments,
      upvotes: question.upvotes,
      downvotes: question.downvotes,
      tags: tags ?? question.tags,
    );
    return _questions[index];
  }

  void voteQuestion(String questionId, String userId, String type) {
    final key = '$questionId:$userId';
    final currentVote = _questionVotes[key] ?? 0;

    if (type == 'up') {
      if (currentVote == 1) {
        // Already upvoted, remove vote
        _questionVotes.remove(key);
      } else {
        _questionVotes[key] = 1;
      }
    } else if (type == 'down') {
      if (currentVote == -1) {
        // Already downvoted, remove vote
        _questionVotes.remove(key);
      } else {
        _questionVotes[key] = -1;
      }
    }

    // Recalculate totals
    _recalculateQuestionVotes(questionId);
  }

  void _recalculateQuestionVotes(String questionId) {
    final index = _questions.indexWhere((q) => q.id == questionId);
    if (index == -1) return;

    int upvotes = 0;
    int downvotes = 0;

    for (final entry in _questionVotes.entries) {
      if (entry.key.startsWith('$questionId:')) {
        if (entry.value == 1) {
          upvotes++;
        } else if (entry.value == -1) {
          downvotes++;
        }
      }
    }

    final question = _questions[index];
    _questions[index] = Question(
      id: question.id,
      title: question.title,
      description: question.description,
      status: question.status,
      userId: question.userId,
      username: question.username,
      createdAt: question.createdAt,
      comments: question.comments,
      upvotes: upvotes,
      downvotes: downvotes,
      tags: question.tags,
    );
  }

  bool canEditQuestion(String id, String userId) {
    final question = getQuestionById(id);
    return question != null && question.userId == userId;
  }

  // Comment methods
  Comment? addComment(
    String questionId,
    String content,
    String userId,
    String username,
  ) {
    final questionIndex = _questions.indexWhere((q) => q.id == questionId);
    if (questionIndex == -1) return null;

    final question = _questions[questionIndex];
    final comment = Comment(
      id: 'c${DateTime.now().millisecondsSinceEpoch}',
      questionId: questionId,
      userId: userId,
      username: username,
      content: content,
      createdAt: DateTime.now(),
      upvotes: 0,
      downvotes: 0,
    );

    _questions[questionIndex] = Question(
      id: question.id,
      title: question.title,
      description: question.description,
      status: question.status,
      userId: question.userId,
      username: question.username,
      createdAt: question.createdAt,
      comments: [...question.comments, comment],
      upvotes: question.upvotes,
      downvotes: question.downvotes,
      tags: question.tags,
    );

    return comment;
  }

  Comment? updateComment(
    String questionId,
    String commentId,
    String content,
  ) {
    final questionIndex = _questions.indexWhere((q) => q.id == questionId);
    if (questionIndex == -1) return null;

    final question = _questions[questionIndex];
    final commentIndex = question.comments.indexWhere((c) => c.id == commentId);
    if (commentIndex == -1) return null;

    final comment = question.comments[commentIndex];
    final updatedComment = Comment(
      id: comment.id,
      questionId: comment.questionId,
      userId: comment.userId,
      username: comment.username,
      content: content,
      createdAt: comment.createdAt,
      upvotes: comment.upvotes,
      downvotes: comment.downvotes,
    );

    final updatedComments = List<Comment>.from(question.comments);
    updatedComments[commentIndex] = updatedComment;

    _questions[questionIndex] = Question(
      id: question.id,
      title: question.title,
      description: question.description,
      status: question.status,
      userId: question.userId,
      username: question.username,
      createdAt: question.createdAt,
      comments: updatedComments,
      upvotes: question.upvotes,
      downvotes: question.downvotes,
      tags: question.tags,
    );

    return updatedComment;
  }

  void voteComment(String questionId, String commentId, String userId, String type) {
    final key = '$questionId:$commentId:$userId';
    final currentVote = _commentVotes[key] ?? 0;

    if (type == 'up') {
      if (currentVote == 1) {
        _commentVotes.remove(key);
      } else {
        _commentVotes[key] = 1;
      }
    } else if (type == 'down') {
      if (currentVote == -1) {
        _commentVotes.remove(key);
      } else {
        _commentVotes[key] = -1;
      }
    }

    _recalculateCommentVotes(questionId, commentId);
  }

  void _recalculateCommentVotes(String questionId, String commentId) {
    final questionIndex = _questions.indexWhere((q) => q.id == questionId);
    if (questionIndex == -1) return;

    final question = _questions[questionIndex];
    final commentIndex = question.comments.indexWhere((c) => c.id == commentId);
    if (commentIndex == -1) return;

    int upvotes = 0;
    int downvotes = 0;

    for (final entry in _commentVotes.entries) {
      if (entry.key.startsWith('$questionId:$commentId:')) {
        if (entry.value == 1) {
          upvotes++;
        } else if (entry.value == -1) {
          downvotes++;
        }
      }
    }

    final updatedComments = List<Comment>.from(question.comments);
    updatedComments[commentIndex] = Comment(
      id: question.comments[commentIndex].id,
      questionId: question.comments[commentIndex].questionId,
      userId: question.comments[commentIndex].userId,
      username: question.comments[commentIndex].username,
      content: question.comments[commentIndex].content,
      createdAt: question.comments[commentIndex].createdAt,
      upvotes: upvotes,
      downvotes: downvotes,
    );

    _questions[questionIndex] = Question(
      id: question.id,
      title: question.title,
      description: question.description,
      status: question.status,
      userId: question.userId,
      username: question.username,
      createdAt: question.createdAt,
      comments: updatedComments,
      upvotes: question.upvotes,
      downvotes: question.downvotes,
      tags: question.tags,
    );
  }

  bool canEditComment(String commentId, String userId) {
    for (final question in _questions) {
      for (final comment in question.comments) {
        if (comment.id == commentId && comment.userId == userId) {
          return true;
        }
      }
    }
    return false;
  }
}

final dataStore = DataStore()..initializeData();
