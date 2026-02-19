import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:stackunderflow/extensions/go_router_extension.dart';
import 'package:stackunderflow/l10n/app_localizations.dart';
import 'package:stackunderflow/models/question.dart';
import 'package:stackunderflow/store/auth_provider.dart';

class EditQuestionScreen extends StatefulWidget {
  final String questionId;

  const EditQuestionScreen({super.key, required this.questionId});

  @override
  State<EditQuestionScreen> createState() => _EditQuestionScreenState();
}

class _EditQuestionScreenState extends State<EditQuestionScreen> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _tagsController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  Question? _originalQuestion;

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
        _originalQuestion = question;
        _titleController.text = question.title;
        _descriptionController.text = question.description;
        _tagsController.text = question.tags.join(', ');
      });
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _tagsController.dispose();
    super.dispose();
  }

  Future<void> _handleEditQuestion() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final l10n = AppLocalizations.of(context);

    if (!authProvider.isAuthenticated) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(l10n.errorUnauthorized)),
      );
      return;
    }

    final title = _titleController.text;
    final description = _descriptionController.text;
    final tags = _tagsController.text
        .split(',')
        .map((tag) => tag.trim())
        .where((tag) => tag.isNotEmpty)
        .toList();

    try {
      await authProvider.updateQuestion(
        widget.questionId,
        title: title,
        description: description,
        tags: tags,
      );
      if (mounted) {
        context.go('/question/${widget.questionId}');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.editQuestionTitle),
        centerTitle: true,
      ),
      body: _originalQuestion == null
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(
                      Icons.edit,
                      size: 60,
                      color: Theme.of(context).primaryColor,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      l10n.editQuestionSubtitle,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 24),
                    TextFormField(
                      controller: _titleController,
                      decoration: InputDecoration(
                        labelText: l10n.editQuestionTitleLabel,
                        hintText: l10n.editQuestionTitlePlaceholder,
                        border: const OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return l10n.editQuestionErrorTitleRequired;
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _descriptionController,
                      decoration: InputDecoration(
                        labelText: l10n.editQuestionDescriptionLabel,
                        hintText: l10n.editQuestionDescriptionPlaceholder,
                        border: const OutlineInputBorder(),
                      ),
                      maxLines: 5,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return l10n.editQuestionErrorDescriptionRequired;
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _tagsController,
                      decoration: InputDecoration(
                        labelText: l10n.editQuestionTagsLabel,
                        hintText: l10n.editQuestionTagsPlaceholder,
                        border: const OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 24),
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        onPressed:
                            authProvider.isLoading ? null : _handleEditQuestion,
                        child: authProvider.isLoading
                            ? const CircularProgressIndicator()
                            : Text(l10n.editQuestionButton),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
