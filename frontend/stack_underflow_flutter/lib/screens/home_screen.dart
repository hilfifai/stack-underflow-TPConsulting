import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:stackunderflow/api/questions_service.dart';
import 'package:stackunderflow/models/question.dart';
import 'package:stackunderflow/models/question_status.dart';
import 'package:stackunderflow/extensions/go_router_extension.dart';
import 'package:stackunderflow/l10n/app_localizations.dart';
import 'package:stackunderflow/store/auth_provider.dart';
import 'package:stackunderflow/utils/format_date.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Question> _questions = [];
  List<Question> _filteredQuestions = [];
  bool _isLoading = true;
  String _searchQuery = '';
  QuestionStatus? _filterStatus;

  @override
  void initState() {
    super.initState();
    _loadQuestions();
  }

  Future<void> _loadQuestions() async {
    setState(() => _isLoading = true);
    try {
      final questions = await questionsService.fetchQuestions();
      if (!mounted) return;
      setState(() {
        _questions = questions;
        _filteredQuestions = questions;
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString())),
      );
    }
  }

  void _filterQuestions() {
    setState(() {
      _filteredQuestions = _questions.where((question) {
        final matchesSearch = _searchQuery.isEmpty ||
            question.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
            question.description.toLowerCase().contains(_searchQuery.toLowerCase());

        final matchesStatus = _filterStatus == null ||
            question.status == _filterStatus;

        return matchesSearch && matchesStatus;
      }).toList();
    });
  }

  void _onSearchChanged(String value) {
    setState(() => _searchQuery = value);
    _filterQuestions();
  }

  void _onFilterChanged(QuestionStatus? status) {
    setState(() => _filterStatus = status);
    _filterQuestions();
  }

  Widget _getStatusBadge(QuestionStatus status, BuildContext context) {
    final l10n = AppLocalizations.of(context);
    Color color;
    String text;

    switch (status) {
      case QuestionStatus.open:
        color = Colors.green;
        text = l10n.questionDetailStatusOpen;
        break;
      case QuestionStatus.answered:
        color = Colors.orange;
        text = l10n.questionDetailStatusAnswered;
        break;
      case QuestionStatus.closed:
        color = Colors.red;
        text = l10n.questionDetailStatusClosed;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color),
      ),
      child: Text(
        text,
        style: TextStyle(color: color, fontSize: 12),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.questionListTitle),
        actions: [
          if (authProvider.isAuthenticated)
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: () => context.go('/create-question'),
              tooltip: l10n.headerAskQuestion,
            ),
          if (!authProvider.isAuthenticated)
            TextButton(
              onPressed: () => context.go('/login'),
              child: Text(l10n.headerLogin),
            ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: l10n.questionListSearchPlaceholder,
                      prefixIcon: const Icon(Icons.search),
                      border: const OutlineInputBorder(),
                    ),
                    onChanged: _onSearchChanged,
                  ),
                ),
                const SizedBox(width: 16),
                DropdownButton<QuestionStatus>(
                  value: _filterStatus,
                  hint: Text(l10n.questionListFilterAll),
                  onChanged: _onFilterChanged,
                  items: [
                    DropdownMenuItem(
                      value: null,
                      child: Text(l10n.questionListFilterAll),
                    ),
                    DropdownMenuItem(
                      value: QuestionStatus.open,
                      child: Text(l10n.questionDetailStatusOpen),
                    ),
                    DropdownMenuItem(
                      value: QuestionStatus.answered,
                      child: Text(l10n.questionDetailStatusAnswered),
                    ),
                    DropdownMenuItem(
                      value: QuestionStatus.closed,
                      child: Text(l10n.questionDetailStatusClosed),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _filteredQuestions.isEmpty
                    ? Center(
                        child: Text(l10n.questionListNoQuestions),
                      )
                    : ListView.builder(
                        itemCount: _filteredQuestions.length,
                        itemBuilder: (context, index) {
                          final question = _filteredQuestions[index];
                          return Card(
                            margin: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 8,
                            ),
                            child: ListTile(
                              title: Text(
                                question.title,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(height: 8),
                                  Text(
                                    question.description,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      _getStatusBadge(question.status, context),
                                      const SizedBox(width: 8),
                                      Text(
                                        '${l10n.questionListBy} ${question.username}',
                                        style: TextStyle(
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                      const Spacer(),
                                      Text(
                                        formatDate(context, question.createdAt),
                                      ),
                                      const SizedBox(width: 8),
                                      Icon(
                                        Icons.comment,
                                        size: 16,
                                        color: Colors.grey[600],
                                      ),
                                      Text(
                                        ' ${question.comments.length}',
                                        style: TextStyle(
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              onTap: () =>
                                  context.go('/question/${question.id}'),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
      floatingActionButton: authProvider.isAuthenticated
          ? FloatingActionButton(
              onPressed: () => context.go('/create-question'),
              tooltip: l10n.headerAskQuestion,
              child: const Icon(Icons.add),
            )
          : null,
    );
  }
}
