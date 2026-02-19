class Comment {
  final String id;
  final String questionId;
  final String userId;
  final String username;
  final String content;
  final DateTime createdAt;
  int upvotes;
  int downvotes;

  Comment({
    required this.id,
    required this.questionId,
    required this.userId,
    required this.username,
    required this.content,
    required this.createdAt,
    this.upvotes = 0,
    this.downvotes = 0,
  });

  // Alias getters for compatibility
  String get authorId => userId;
  String get authorUsername => username;
  int get score => upvotes - downvotes;

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      id: json['id'] as String,
      questionId: json['questionId'] as String,
      userId: json['userId'] as String,
      username: json['username'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['createdAt'] as String),
      upvotes: json['upvotes'] as int? ?? 0,
      downvotes: json['downvotes'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'questionId': questionId,
      'userId': userId,
      'username': username,
      'content': content,
      'createdAt': createdAt.toIso8601String(),
      'upvotes': upvotes,
      'downvotes': downvotes,
    };
  }
}
