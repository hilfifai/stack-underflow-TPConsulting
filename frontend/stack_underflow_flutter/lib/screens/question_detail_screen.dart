import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:stackunderflow/extensions/go_router_extension.dart';
import 'package:stackunderflow/l10n/app_localizations.dart';
import 'package:stackunderflow/models/question.dart';
import 'package:stackunderflow/store/auth_provider.dart';
import 'package:stackunderflow/utils/format_date.dart';

class QuestionDetailScreen extends StatefulWidget {
  final String questionId;

  const QuestionDetailScreen({super.key, required this.questionId});

  @override
  State<QuestionDetailScreen> createState() => _QuestionDetailScreenState();
}

class _QuestionDetailScreenState extends State<QuestionDetailScreen> {
  Question? _question;
  final _commentController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _loadQuestion();
  }

  void _loadQuestion() {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final question = authProvider.getQuestionById(widget.questionId);

    if (question != null) {
      setState(() {
        _question = question;
      });
    }
  }

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  Future<void> _handleAddComment() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final l10n = AppLocalizations.of(context);

    if (!authProvider.isAuthenticated) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(l10n.createQuestionErrorNotLoggedIn)),
      );
      return;
    }

    final content = _commentController.text;

    try {
      await authProvider.addComment(widget.questionId, content);
      if (!mounted) return;
      setState(() {
        _question = authProvider.getQuestionById(widget.questionId);
      });
      _commentController.clear();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    }
  }

  Future<void> _handleVoteQuestion(String type) async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    try {
      await authProvider.voteQuestion(widget.questionId, type);
      if (!mounted) return;
      setState(() {
        _question = authProvider.getQuestionById(widget.questionId);
      });
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    }
  }

  Future<void> _handleVoteComment(String commentId, String type) async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    try {
      await authProvider.voteComment(widget.questionId, commentId, type);
      if (!mounted) return;
      setState(() {
        _question = authProvider.getQuestionById(widget.questionId);
      });
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    }
  }

  String? _getCurrentUserId() {
    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      return authProvider.user?.id;
    } catch (_) {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    if (_question == null) {
      return Scaffold(
        appBar: AppBar(title: Text(l10n.questionDetailTitle)),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final question = _question!;
    final currentUserId = _getCurrentUserId();
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.questionDetailTitle),
        centerTitle: true,
        actions: currentUserId != null && question.authorId == currentUserId
            ? [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => context.go('/question/${question.id}/edit'),
                ),
              ]
            : null,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Question Title
            Text(
              question.title,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            // Meta Info
            Row(
              children: [
                const Icon(Icons.person, size: 16),
                const SizedBox(width: 4),
                Text(question.authorUsername),
                const SizedBox(width: 16),
                const Icon(Icons.access_time, size: 16),
                const SizedBox(width: 4),
                Text(formatDate(context, question.createdAt)),
              ],
            ),
            const SizedBox(height: 8),
            // Tags
            Wrap(
              spacing: 8,
              children: question.tags.map((tag) {
                return Chip(
                  label: Text(tag),
                  backgroundColor: Theme.of(context).colorScheme.secondaryContainer,
                );
              }).toList(),
            ),
            const SizedBox(height: 16),
            // Question Body
            Text(
              question.description,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 16),
            // Vote Actions
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.thumb_up),
                  onPressed: () => _handleVoteQuestion('up'),
                ),
                Text('${question.score}'),
                IconButton(
                  icon: const Icon(Icons.thumb_down),
                  onPressed: () => _handleVoteQuestion('down'),
                ),
              ],
            ),
            const Divider(height: 32),
            // Comments Section
            Text(
              l10n.questionDetailCommentsTitle,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            // Comment List
            if (question.comments.isEmpty)
              Text(l10n.questionDetailNoComments, style: const TextStyle(color: Colors.grey))
            else
              ...question.comments.map((comment) {
                return Card(
                  margin: const EdgeInsets.only(bottom: 8),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.person, size: 14),
                            const SizedBox(width: 4),
                            Text(
                              comment.authorUsername,
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              formatDate(context, comment.createdAt),
                              style: const TextStyle(color: Colors.grey, fontSize: 12),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(comment.content),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.thumb_up, size: 16),
                              onPressed: () => _handleVoteComment(comment.id, 'up'),
                            ),
                            Text('${comment.score}'),
                            IconButton(
                              icon: const Icon(Icons.thumb_down, size: 16),
                              onPressed: () => _handleVoteComment(comment.id, 'down'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              }),
            const SizedBox(height: 16),
            // Add Comment Form
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _commentController,
                    decoration: InputDecoration(
                      labelText: l10n.questionDetailAddCommentLabel,
                      border: const OutlineInputBorder(),
                    ),
                    maxLines: 2,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return l10n.questionDetailAddCommentError;
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    width: double.infinity,
                    height: 40,
                    child: ElevatedButton(
                      onPressed: authProvider.isLoading ? null : _handleAddComment,
                      child: authProvider.isLoading
                          ? const CircularProgressIndicator()
                          : Text(l10n.questionDetailAddCommentButton),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
