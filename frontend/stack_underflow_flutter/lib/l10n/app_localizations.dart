import 'package:flutter/material.dart';

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizationEn en = AppLocalizationEn();
  static AppLocalizationId id = AppLocalizationId();

  static AppLocalizations of(BuildContext context) {
    final locale = Localizations.localeOf(context);
    if (locale.languageCode == 'id') {
      return AppLocalizations(const Locale('id'));
    }
    return AppLocalizations(const Locale('en'));
  }

  // Login
  String get loginTitle => locale.languageCode == 'id' ? id.loginTitle : en.loginTitle;
  String get loginSubtitle => locale.languageCode == 'id' ? id.loginSubtitle : en.loginSubtitle;
  String get loginUsernameLabel => locale.languageCode == 'id' ? id.loginUsernameLabel : en.loginUsernameLabel;
  String get loginUsernamePlaceholder => locale.languageCode == 'id' ? id.loginUsernamePlaceholder : en.loginUsernamePlaceholder;
  String get loginPasswordLabel => locale.languageCode == 'id' ? id.loginPasswordLabel : en.loginPasswordLabel;
  String get loginPasswordPlaceholder => locale.languageCode == 'id' ? id.loginPasswordPlaceholder : en.loginPasswordPlaceholder;
  String get loginButton => locale.languageCode == 'id' ? id.loginButton : en.loginButton;
  String get loginNote => locale.languageCode == 'id' ? id.loginNote : en.loginNote;
  String get loginSignupHere => locale.languageCode == 'id' ? id.loginSignupHere : en.loginSignupHere;
  String get loginErrorUsernameRequired => locale.languageCode == 'id' ? id.loginErrorUsernameRequired : en.loginErrorUsernameRequired;
  String get loginErrorPasswordRequired => locale.languageCode == 'id' ? id.loginErrorPasswordRequired : en.loginErrorPasswordRequired;

  // Signup
  String get signupTitle => locale.languageCode == 'id' ? id.signupTitle : en.signupTitle;
  String get signupSubtitle => locale.languageCode == 'id' ? id.signupSubtitle : en.signupSubtitle;
  String get signupUsernameLabel => locale.languageCode == 'id' ? id.signupUsernameLabel : en.signupUsernameLabel;
  String get signupUsernamePlaceholder => locale.languageCode == 'id' ? id.signupUsernamePlaceholder : en.signupUsernamePlaceholder;
  String get signupPasswordLabel => locale.languageCode == 'id' ? id.signupPasswordLabel : en.signupPasswordLabel;
  String get signupPasswordPlaceholder => locale.languageCode == 'id' ? id.signupPasswordPlaceholder : en.signupPasswordPlaceholder;
  String get signupConfirmPasswordLabel => locale.languageCode == 'id' ? id.signupConfirmPasswordLabel : en.signupConfirmPasswordLabel;
  String get signupConfirmPasswordPlaceholder => locale.languageCode == 'id' ? id.signupConfirmPasswordPlaceholder : en.signupConfirmPasswordPlaceholder;
  String get signupButton => locale.languageCode == 'id' ? id.signupButton : en.signupButton;
  String get signupAlreadyHaveAccount => locale.languageCode == 'id' ? id.signupAlreadyHaveAccount : en.signupAlreadyHaveAccount;
  String get signupLoginHere => locale.languageCode == 'id' ? id.signupLoginHere : en.signupLoginHere;
  String get signupErrorUsernameRequired => locale.languageCode == 'id' ? id.signupErrorUsernameRequired : en.signupErrorUsernameRequired;
  String get signupErrorPasswordRequired => locale.languageCode == 'id' ? id.signupErrorPasswordRequired : en.signupErrorPasswordRequired;
  String get signupErrorPasswordsNotMatch => locale.languageCode == 'id' ? id.signupErrorPasswordsNotMatch : en.signupErrorPasswordsNotMatch;

  // Header
  String get headerLogin => locale.languageCode == 'id' ? id.headerLogin : en.headerLogin;
  String get headerSignup => locale.languageCode == 'id' ? id.headerSignup : en.headerSignup;
  String get headerQuestions => locale.languageCode == 'id' ? id.headerQuestions : en.headerQuestions;
  String get headerAskQuestion => locale.languageCode == 'id' ? id.headerAskQuestion : en.headerAskQuestion;

  // Question List
  String get questionListTitle => locale.languageCode == 'id' ? id.questionListTitle : en.questionListTitle;
  String get questionListAskQuestion => locale.languageCode == 'id' ? id.questionListAskQuestion : en.questionListAskQuestion;
  String get questionListNoQuestions => locale.languageCode == 'id' ? id.questionListNoQuestions : en.questionListNoQuestions;
  String get questionListBy => locale.languageCode == 'id' ? id.questionListBy : en.questionListBy;
  String get questionListSearchPlaceholder => locale.languageCode == 'id' ? id.questionListSearchPlaceholder : en.questionListSearchPlaceholder;
  String get questionListFilterAll => locale.languageCode == 'id' ? id.questionListFilterAll : en.questionListFilterAll;
  String get questionListNoSearchResults => locale.languageCode == 'id' ? id.questionListNoSearchResults : en.questionListNoSearchResults;

  // Create Question
  String get createQuestionTitle => locale.languageCode == 'id' ? id.createQuestionTitle : en.createQuestionTitle;
  String get createQuestionSubtitle => locale.languageCode == 'id' ? id.createQuestionSubtitle : en.createQuestionSubtitle;
  String get createQuestionTitleLabel => locale.languageCode == 'id' ? id.createQuestionTitleLabel : en.createQuestionTitleLabel;
  String get createQuestionTitlePlaceholder => locale.languageCode == 'id' ? id.createQuestionTitlePlaceholder : en.createQuestionTitlePlaceholder;
  String get createQuestionTitleHint => locale.languageCode == 'id' ? id.createQuestionTitleHint : en.createQuestionTitleHint;
  String get createQuestionDescriptionLabel => locale.languageCode == 'id' ? id.createQuestionDescriptionLabel : en.createQuestionDescriptionLabel;
  String get createQuestionDescriptionPlaceholder => locale.languageCode == 'id' ? id.createQuestionDescriptionPlaceholder : en.createQuestionDescriptionPlaceholder;
  String get createQuestionDescriptionHint => locale.languageCode == 'id' ? id.createQuestionDescriptionHint : en.createQuestionDescriptionHint;
  String get createQuestionTagsLabel => locale.languageCode == 'id' ? id.createQuestionTagsLabel : en.createQuestionTagsLabel;
  String get createQuestionTagsPlaceholder => locale.languageCode == 'id' ? id.createQuestionTagsPlaceholder : en.createQuestionTagsPlaceholder;
  String get createQuestionButton => locale.languageCode == 'id' ? id.createQuestionButton : en.createQuestionButton;
  String get createQuestionCancel => locale.languageCode == 'id' ? id.createQuestionCancel : en.createQuestionCancel;
  String get createQuestionErrorNotLoggedIn => locale.languageCode == 'id' ? id.createQuestionErrorNotLoggedIn : en.createQuestionErrorNotLoggedIn;
  String get createQuestionErrorTitleRequired => locale.languageCode == 'id' ? id.createQuestionErrorTitleRequired : en.createQuestionErrorTitleRequired;
  String get createQuestionErrorTitleTooShort => locale.languageCode == 'id' ? id.createQuestionErrorTitleTooShort : en.createQuestionErrorTitleTooShort;
  String get createQuestionErrorDescriptionRequired => locale.languageCode == 'id' ? id.createQuestionErrorDescriptionRequired : en.createQuestionErrorDescriptionRequired;
  String get createQuestionErrorDescriptionTooShort => locale.languageCode == 'id' ? id.createQuestionErrorDescriptionTooShort : en.createQuestionErrorDescriptionTooShort;

  // Edit Question
  String get editQuestionTitle => locale.languageCode == 'id' ? id.editQuestionTitle : en.editQuestionTitle;
  String get editQuestionSubtitle => locale.languageCode == 'id' ? id.editQuestionSubtitle : en.editQuestionSubtitle;
  String get editQuestionTitleLabel => locale.languageCode == 'id' ? id.editQuestionTitleLabel : en.editQuestionTitleLabel;
  String get editQuestionTitlePlaceholder => locale.languageCode == 'id' ? id.editQuestionTitlePlaceholder : en.editQuestionTitlePlaceholder;
  String get editQuestionErrorTitleRequired => locale.languageCode == 'id' ? id.editQuestionErrorTitleRequired : en.editQuestionErrorTitleRequired;
  String get editQuestionDescriptionLabel => locale.languageCode == 'id' ? id.editQuestionDescriptionLabel : en.editQuestionDescriptionLabel;
  String get editQuestionDescriptionPlaceholder => locale.languageCode == 'id' ? id.editQuestionDescriptionPlaceholder : en.editQuestionDescriptionPlaceholder;
  String get editQuestionErrorDescriptionRequired => locale.languageCode == 'id' ? id.editQuestionErrorDescriptionRequired : en.editQuestionErrorDescriptionRequired;
  String get editQuestionTagsLabel => locale.languageCode == 'id' ? id.editQuestionTagsLabel : en.editQuestionTagsLabel;
  String get editQuestionTagsPlaceholder => locale.languageCode == 'id' ? id.editQuestionTagsPlaceholder : en.editQuestionTagsPlaceholder;
  String get editQuestionButton => locale.languageCode == 'id' ? id.editQuestionButton : en.editQuestionButton;

  // Question Detail
  String get questionDetailTitle => locale.languageCode == 'id' ? id.questionDetailTitle : en.questionDetailTitle;
  String get questionDetailNotFound => locale.languageCode == 'id' ? id.questionDetailNotFound : en.questionDetailNotFound;
  String get questionDetailBackToQuestions => locale.languageCode == 'id' ? id.questionDetailBackToQuestions : en.questionDetailBackToQuestions;
  String get questionDetailEditQuestion => locale.languageCode == 'id' ? id.questionDetailEditQuestion : en.questionDetailEditQuestion;
  String get questionDetailTitleLabel => locale.languageCode == 'id' ? id.questionDetailTitleLabel : en.questionDetailTitleLabel;
  String get questionDetailDescriptionLabel => locale.languageCode == 'id' ? id.questionDetailDescriptionLabel : en.questionDetailDescriptionLabel;
  String get questionDetailStatusLabel => locale.languageCode == 'id' ? id.questionDetailStatusLabel : en.questionDetailStatusLabel;
  String get questionDetailStatusOpen => locale.languageCode == 'id' ? id.questionDetailStatusOpen : en.questionDetailStatusOpen;
  String get questionDetailStatusAnswered => locale.languageCode == 'id' ? id.questionDetailStatusAnswered : en.questionDetailStatusAnswered;
  String get questionDetailStatusClosed => locale.languageCode == 'id' ? id.questionDetailStatusClosed : en.questionDetailStatusClosed;
  String get questionDetailSave => locale.languageCode == 'id' ? id.questionDetailSave : en.questionDetailSave;
  String get questionDetailCancel => locale.languageCode == 'id' ? id.questionDetailCancel : en.questionDetailCancel;
  String get questionDetailAskedBy => locale.languageCode == 'id' ? id.questionDetailAskedBy : en.questionDetailAskedBy;
  String get questionDetailCommentsTitle => locale.languageCode == 'id' ? id.questionDetailCommentsTitle : en.questionDetailCommentsTitle;
  String get questionDetailComments => locale.languageCode == 'id' ? id.questionDetailComments : en.questionDetailComments;
  String get questionDetailAddCommentLabel => locale.languageCode == 'id' ? id.questionDetailAddCommentLabel : en.questionDetailAddCommentLabel;
  String get questionDetailAddCommentPlaceholder => locale.languageCode == 'id' ? id.questionDetailAddCommentPlaceholder : en.questionDetailAddCommentPlaceholder;
  String get questionDetailAddCommentButton => locale.languageCode == 'id' ? id.questionDetailAddCommentButton : en.questionDetailAddCommentButton;
  String get questionDetailAddCommentError => locale.languageCode == 'id' ? id.questionDetailAddCommentError : en.questionDetailAddCommentError;
  String get questionDetailAddComment => locale.languageCode == 'id' ? id.questionDetailAddComment : en.questionDetailAddComment;
  String get questionDetailNoComments => locale.languageCode == 'id' ? id.questionDetailNoComments : en.questionDetailNoComments;

  // Errors
  String get errorUnauthorized => locale.languageCode == 'id' ? id.errorUnauthorized : en.errorUnauthorized;
}

class AppLocalizationEn {
  // Login
  final String loginTitle = 'Stack Underflow';
  final String loginSubtitle = 'Q&A Platform';
  final String loginUsernameLabel = 'Username';
  final String loginUsernamePlaceholder = 'Enter any username';
  final String loginPasswordLabel = 'Password';
  final String loginPasswordPlaceholder = 'Enter any password';
  final String loginButton = 'Login';
  final String loginNote = 'Note: This is a mock login. Any username/password will work.';
  final String loginSignupHere = 'Login here';
  final String loginErrorUsernameRequired = 'Username is required';
  final String loginErrorPasswordRequired = 'Password is required';

  // Signup
  final String signupTitle = 'Stack Underflow';
  final String signupSubtitle = 'Create your account';
  final String signupUsernameLabel = 'Username';
  final String signupUsernamePlaceholder = 'Choose a username';
  final String signupPasswordLabel = 'Password';
  final String signupPasswordPlaceholder = 'Choose a password';
  final String signupConfirmPasswordLabel = 'Confirm Password';
  final String signupConfirmPasswordPlaceholder = 'Confirm your password';
  final String signupButton = 'Sign Up';
  final String signupAlreadyHaveAccount = 'Already have an account?';
  final String signupLoginHere = 'Login here';
  final String signupErrorUsernameRequired = 'Username is required';
  final String signupErrorPasswordRequired = 'Password is required';
  final String signupErrorPasswordsNotMatch = 'Passwords do not match';

  // Header
  final String headerLogin = 'Login';
  final String headerSignup = 'Sign Up';
  final String headerQuestions = 'Questions';
  final String headerAskQuestion = 'Ask Question';

  // Question List
  final String questionListTitle = 'Questions';
  final String questionListAskQuestion = 'Ask Question';
  final String questionListNoQuestions = 'No questions yet. Be the first to ask!';
  final String questionListBy = 'by';
  final String questionListSearchPlaceholder = 'Search questions...';
  final String questionListFilterAll = 'All';
  final String questionListNoSearchResults = 'No questions found matching your search.';

  // Create Question
  final String createQuestionTitle = 'Ask a Question';
  final String createQuestionSubtitle = 'Share your knowledge with the community';
  final String createQuestionTitleLabel = 'Title';
  final String createQuestionTitlePlaceholder = "What's your question?";
  final String createQuestionTitleHint = 'Minimum 5 characters, maximum 200 characters';
  final String createQuestionDescriptionLabel = 'Description';
  final String createQuestionDescriptionPlaceholder = 'Provide more details about your question...';
  final String createQuestionDescriptionHint = 'Minimum 10 characters, maximum 5000 characters';
  final String createQuestionTagsLabel = 'Tags';
  final String createQuestionTagsPlaceholder = 'e.g., javascript, react, css';
  final String createQuestionButton = 'Post Question';
  final String createQuestionCancel = 'Cancel';
  final String createQuestionErrorNotLoggedIn = 'You must be logged in to create a question';
  final String createQuestionErrorTitleRequired = 'Title is required';
  final String createQuestionErrorTitleTooShort = 'Title must be at least 5 characters';
  final String createQuestionErrorDescriptionRequired = 'Description is required';
  final String createQuestionErrorDescriptionTooShort = 'Description must be at least 10 characters';

  // Edit Question
  final String editQuestionTitle = 'Edit Question';
  final String editQuestionSubtitle = 'Update your question details';
  final String editQuestionTitleLabel = 'Title';
  final String editQuestionTitlePlaceholder = "What's your question?";
  final String editQuestionErrorTitleRequired = 'Title is required';
  final String editQuestionDescriptionLabel = 'Description';
  final String editQuestionDescriptionPlaceholder = 'Provide more details about your question...';
  final String editQuestionErrorDescriptionRequired = 'Description is required';
  final String editQuestionTagsLabel = 'Tags';
  final String editQuestionTagsPlaceholder = 'e.g., javascript, react, css';
  final String editQuestionButton = 'Save Changes';

  // Question Detail
  final String questionDetailTitle = 'Question Details';
  final String questionDetailNotFound = 'Question not found';
  final String questionDetailBackToQuestions = 'Back to Questions';
  final String questionDetailEditQuestion = 'Edit Question';
  final String questionDetailTitleLabel = 'Title';
  final String questionDetailDescriptionLabel = 'Description';
  final String questionDetailStatusLabel = 'Status';
  final String questionDetailStatusOpen = 'Open';
  final String questionDetailStatusAnswered = 'Answered';
  final String questionDetailStatusClosed = 'Closed';
  final String questionDetailSave = 'Save';
  final String questionDetailCancel = 'Cancel';
  final String questionDetailAskedBy = 'Asked by';
  final String questionDetailCommentsTitle = 'Comments';
  final String questionDetailComments = 'Comments';
  final String questionDetailAddCommentLabel = 'Add a comment';
  final String questionDetailAddCommentPlaceholder = 'Write a comment...';
  final String questionDetailAddCommentButton = 'Add Comment';
  final String questionDetailAddCommentError = 'Comment cannot be empty';
  final String questionDetailAddComment = 'Add Comment';
  final String questionDetailNoComments = 'No comments yet.';

  // Errors
  final String errorUnauthorized = 'You are not authorized to perform this action';
}

class AppLocalizationId {
  // Login
  final String loginTitle = 'Stack Underflow';
  final String loginSubtitle = 'Platform Tanya Jawab';
  final String loginUsernameLabel = 'Nama Pengguna';
  final String loginUsernamePlaceholder = 'Masukkan nama pengguna apa saja';
  final String loginPasswordLabel = 'Kata Sandi';
  final String loginPasswordPlaceholder = 'Masukkan kata sandi apa saja';
  final String loginButton = 'Masuk';
  final String loginNote = 'Catatan: Ini adalah login tiruan. Nama pengguna/kata sandi apa pun akan berfungsi.';
  final String loginSignupHere = 'Masuk di sini';
  final String loginErrorUsernameRequired = 'Nama pengguna diperlukan';
  final String loginErrorPasswordRequired = 'Kata sandi diperlukan';

  // Signup
  final String signupTitle = 'Stack Underflow';
  final String signupSubtitle = 'Buat akun Anda';
  final String signupUsernameLabel = 'Nama Pengguna';
  final String signupUsernamePlaceholder = 'Pilih nama pengguna';
  final String signupPasswordLabel = 'Kata Sandi';
  final String signupPasswordPlaceholder = 'Pilih kata sandi';
  final String signupConfirmPasswordLabel = 'Konfirmasi Kata Sandi';
  final String signupConfirmPasswordPlaceholder = 'Konfirmasi kata sandi Anda';
  final String signupButton = 'Daftar';
  final String signupAlreadyHaveAccount = 'Sudah punya akun?';
  final String signupLoginHere = 'Masuk di sini';
  final String signupErrorUsernameRequired = 'Nama pengguna diperlukan';
  final String signupErrorPasswordRequired = 'Kata sandi diperlukan';
  final String signupErrorPasswordsNotMatch = 'Kata sandi tidak cocok';

  // Header
  final String headerLogin = 'Masuk';
  final String headerSignup = 'Daftar';
  final String headerQuestions = 'Pertanyaan';
  final String headerAskQuestion = 'Tanya Pertanyaan';

  // Question List
  final String questionListTitle = 'Pertanyaan';
  final String questionListAskQuestion = 'Tanya Pertanyaan';
  final String questionListNoQuestions = 'Belum ada pertanyaan. Jadilah yang pertama bertanya!';
  final String questionListBy = 'oleh';
  final String questionListSearchPlaceholder = 'Cari pertanyaan...';
  final String questionListFilterAll = 'Semua';
  final String questionListNoSearchResults = 'Tidak ada pertanyaan yang cocok dengan pencarian Anda.';

  // Create Question
  final String createQuestionTitle = 'Tanyakan Pertanyaan';
  final String createQuestionSubtitle = 'Bagikan pengetahuan Anda dengan komunitas';
  final String createQuestionTitleLabel = 'Judul';
  final String createQuestionTitlePlaceholder = 'Apa pertanyaan Anda?';
  final String createQuestionTitleHint = 'Minimal 5 karakter, maksimal 200 karakter';
  final String createQuestionDescriptionLabel = 'Deskripsi';
  final String createQuestionDescriptionPlaceholder = 'Berikan detail lebih lanjut tentang pertanyaan Anda...';
  final String createQuestionDescriptionHint = 'Minimal 10 karakter, maksimal 5000 karakter';
  final String createQuestionTagsLabel = 'Tag';
  final String createQuestionTagsPlaceholder = 'contoh: javascript, react, css';
  final String createQuestionButton = 'Kirim Pertanyaan';
  final String createQuestionCancel = 'Batal';
  final String createQuestionErrorNotLoggedIn = 'Anda harus masuk untuk membuat pertanyaan';
  final String createQuestionErrorTitleRequired = 'Judul diperlukan';
  final String createQuestionErrorTitleTooShort = 'Judul harus minimal 5 karakter';
  final String createQuestionErrorDescriptionRequired = 'Deskripsi diperlukan';
  final String createQuestionErrorDescriptionTooShort = 'Deskripsi harus minimal 10 karakter';

  // Edit Question
  final String editQuestionTitle = 'Edit Pertanyaan';
  final String editQuestionSubtitle = 'Perbarui detail pertanyaan Anda';
  final String editQuestionTitleLabel = 'Judul';
  final String editQuestionTitlePlaceholder = 'Apa pertanyaan Anda?';
  final String editQuestionErrorTitleRequired = 'Judul diperlukan';
  final String editQuestionDescriptionLabel = 'Deskripsi';
  final String editQuestionDescriptionPlaceholder = 'Berikan detail lebih lanjut tentang pertanyaan Anda...';
  final String editQuestionErrorDescriptionRequired = 'Deskripsi diperlukan';
  final String editQuestionTagsLabel = 'Tag';
  final String editQuestionTagsPlaceholder = 'contoh: javascript, react, css';
  final String editQuestionButton = 'Simpan Perubahan';

  // Question Detail
  final String questionDetailTitle = 'Detail Pertanyaan';
  final String questionDetailNotFound = 'Pertanyaan tidak ditemukan';
  final String questionDetailBackToQuestions = 'Kembali ke Pertanyaan';
  final String questionDetailEditQuestion = 'Edit Pertanyaan';
  final String questionDetailTitleLabel = 'Judul';
  final String questionDetailDescriptionLabel = 'Deskripsi';
  final String questionDetailStatusLabel = 'Status';
  final String questionDetailStatusOpen = 'Terbuka';
  final String questionDetailStatusAnswered = 'Terjawab';
  final String questionDetailStatusClosed = 'Ditutup';
  final String questionDetailSave = 'Simpan';
  final String questionDetailCancel = 'Batal';
  final String questionDetailAskedBy = 'Ditanyakan oleh';
  final String questionDetailCommentsTitle = 'Komentar';
  final String questionDetailComments = 'Komentar';
  final String questionDetailAddCommentLabel = 'Tambah komentar';
  final String questionDetailAddCommentPlaceholder = 'Tulis komentar...';
  final String questionDetailAddCommentButton = 'Tambah Komentar';
  final String questionDetailAddCommentError = 'Komentar tidak boleh kosong';
  final String questionDetailAddComment = 'Tambah Komentar';
  final String questionDetailNoComments = 'Belum ada komentar.';

  // Errors
  final String errorUnauthorized = 'Anda tidak berwenang untuk melakukan tindakan ini';
}
