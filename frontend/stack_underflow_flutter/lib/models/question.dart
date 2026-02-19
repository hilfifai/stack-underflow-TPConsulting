import 'package:stackunderflow/models/question_status.dart';
import 'comment.dart';

class Question {
  final String id;
  final String title;
  final String description;
  final QuestionStatus status;
  final String userId;
  final String username;
  final DateTime createdAt;
  final List<Comment> comments;
  int upvotes;
  int downvotes;
  final List<String> tags;

  Question({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.userId,
    required this.username,
    required this.createdAt,
    required this.comments,
    this.upvotes = 0,
    this.downvotes = 0,
    this.tags = const [],
  });

  // Alias getters for compatibility
  String get authorId => userId;
  String get authorUsername => username;
  int get score => upvotes - downvotes;

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      status: QuestionStatusExtension.fromString(json['status'] as String),
      userId: json['userId'] as String,
      username: json['username'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      comments: (json['comments'] as List<dynamic>)
          .map((e) => Comment.fromJson(e as Map<String, dynamic>))
          .toList(),
      upvotes: json['upvotes'] as int? ?? 0,
      downvotes: json['downvotes'] as int? ?? 0,
      tags: (json['tags'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'status': status.value,
      'userId': userId,
      'username': username,
      'createdAt': createdAt.toIso8601String(),
      'comments': comments.map((e) => e.toJson()).toList(),
      'upvotes': upvotes,
      'downvotes': downvotes,
      'tags': tags,
    };
  }
}
