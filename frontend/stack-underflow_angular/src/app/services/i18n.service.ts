import { Injectable, signal } from '@angular/core';

export interface TranslationDict {
  [key: string]: string | TranslationDict;
}

const en: TranslationDict = {
  header: {
    logo: 'Stack Underflow',
    questions: 'Questions',
    askQuestion: 'Ask Question',
    logout: 'Logout',
    guest: 'Guest',
    login: 'Login',
    signup: 'Sign Up',
  },
  questionList: {
    title: 'Questions',
    askQuestion: 'Ask Question',
    noQuestions: 'No questions yet. Be the first to ask!',
    by: 'by',
    comment: 'comment',
    comments: 'comments',
    searchPlaceholder: 'Search questions...',
    searchResults: 'Found {{count}} results for "{{query}}"',
    noSearchResults: 'No questions found matching your search.',
    filterAll: 'All',
    filterResults: 'Found {{count}} questions with status "{{status}}"',
    searchAndFilterResults: 'Found {{count}} results for "{{query}}" with status "{{status}}"',
    previous: 'Previous',
    next: 'Next',
  },
  createQuestion: {
    title: 'Ask a Question',
    titleLabel: 'Title',
    titlePlaceholder: "What's your question?",
    titleHint: 'Minimum 5 characters, maximum 200 characters',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Provide more details about your question...',
    descriptionHint: 'Minimum 10 characters, maximum 5000 characters',
    postQuestion: 'Post Question',
    cancel: 'Cancel',
    submitting: 'Submitting...',
    error: {
      notLoggedIn: 'You must be logged in to create a question',
      titleRequired: 'Title is required',
      titleTooShort: 'Title must be at least 5 characters',
      titleTooLong: 'Title must be less than 200 characters',
      descriptionRequired: 'Description is required',
      descriptionTooShort: 'Description must be at least 10 characters',
      descriptionTooLong: 'Description must be less than 5000 characters',
    },
  },
  questionDetail: {
    notFound: 'Question not found',
    backToQuestions: 'Back to Questions',
    backLink: '← Back to Questions',
    editQuestion: 'Edit Question',
    titleLabel: 'Title',
    descriptionLabel: 'Description',
    statusLabel: 'Status',
    status: {
      open: 'Open',
      answered: 'Answered',
      closed: 'Closed',
    },
    save: 'Save',
    saving: 'Saving...',
    cancel: 'Cancel',
    askedBy: 'Asked by',
    edit: 'Edit',
    comments: 'Comments',
    addCommentPlaceholder: 'Add a comment...',
    addComment: 'Add Comment',
    submitting: 'Submitting...',
    noComments: 'No comments yet.',
    relatedQuestions: 'Related Questions',
    hotNetworkQuestions: 'Hot Network Questions',
    error: {
      commentRequired: 'Comment content is required',
      commentTooShort: 'Comment must be at least 3 characters',
      commentTooLong: 'Comment must be less than 1000 characters',
      unauthorized: 'You are not authorized to perform this action',
    },
  },
  login: {
    title: 'Stack Underflow',
    subtitle: 'Q&A Platform',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter any username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter any password',
    loginButton: 'Login',
    note: 'Note: This is a mock login. Any username/password will work.',
  },
  signup: {
    title: 'Stack Underflow',
    subtitle: 'Create your account',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Choose a username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Choose a password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    signupButton: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    loginHere: 'Login here',
    errors: {
      usernameRequired: 'Username is required',
      passwordRequired: 'Password is required',
      passwordsNotMatch: 'Passwords do not match',
      usernameExists: 'Username already exists',
    },
  },
  date: {
    justNow: 'Just now',
    minuteAgo: '{{count}} minute ago',
    minutesAgo: '{{count}} minutes ago',
    hourAgo: '{{count}} hour ago',
    hoursAgo: '{{count}} hours ago',
    dayAgo: '{{count}} day ago',
    daysAgo: '{{count}} days ago',
  },
};

const id: TranslationDict = {
  header: {
    logo: 'Stack Underflow',
    questions: 'Pertanyaan',
    askQuestion: 'Ajukan Pertanyaan',
    logout: 'Keluar',
    guest: 'Tamu',
    login: 'Masuk',
    signup: 'Daftar',
  },
  questionList: {
    title: 'Pertanyaan',
    askQuestion: 'Ajukan Pertanyaan',
    noQuestions: 'Belum ada pertanyaan. Jadilah yang pertama bertanya!',
    by: 'oleh',
    comment: 'komentar',
    comments: 'komentar',
    searchPlaceholder: 'Cari pertanyaan...',
    searchResults: 'Ditemukan {{count}} hasil untuk "{{query}}"',
    noSearchResults: 'Tidak ada pertanyaan yang cocok dengan pencarian.',
    filterAll: 'Semua',
    filterResults: 'Ditemukan {{count}} pertanyaan dengan status "{{status}}"',
    searchAndFilterResults: 'Ditemukan {{count}} hasil untuk "{{query}}" dengan status "{{status}}"',
    previous: 'Sebelumnya',
    next: 'Selanjutnya',
  },
  createQuestion: {
    title: 'Ajukan Pertanyaan',
    titleLabel: 'Judul',
    titlePlaceholder: 'Apa pertanyaan Anda?',
    titleHint: 'Minimal 5 karakter, maksimal 200 karakter',
    descriptionLabel: 'Deskripsi',
    descriptionPlaceholder: 'Berikan detail lebih lanjut tentang pertanyaan Anda...',
    descriptionHint: 'Minimal 10 karakter, maksimal 5000 karakter',
    postQuestion: 'Posting Pertanyaan',
    cancel: 'Batal',
    submitting: 'Mengirim...',
    error: {
      notLoggedIn: 'Anda harus masuk untuk membuat pertanyaan',
      titleRequired: 'Judul wajib diisi',
      titleTooShort: 'Judul minimal 5 karakter',
      titleTooLong: 'Judul maksimal 200 karakter',
      descriptionRequired: 'Deskripsi wajib diisi',
      descriptionTooShort: 'Deskripsi minimal 10 karakter',
      descriptionTooLong: 'Deskripsi maksimal 5000 karakter',
    },
  },
  questionDetail: {
    notFound: 'Pertanyaan tidak ditemukan',
    backToQuestions: 'Kembali ke Pertanyaan',
    backLink: '← Kembali ke Pertanyaan',
    editQuestion: 'Edit Pertanyaan',
    titleLabel: 'Judul',
    descriptionLabel: 'Deskripsi',
    statusLabel: 'Status',
    status: {
      open: 'Terbuka',
      answered: 'Dijawab',
      closed: 'Ditutup',
    },
    save: 'Simpan',
    saving: 'Menyimpan...',
    cancel: 'Batal',
    askedBy: 'Ditanyakan oleh',
    edit: 'Edit',
    comments: 'Komentar',
    addCommentPlaceholder: 'Tambah komentar...',
    addComment: 'Tambah Komentar',
    submitting: 'Mengirim...',
    noComments: 'Belum ada komentar.',
    relatedQuestions: 'Pertanyaan Terkait',
    hotNetworkQuestions: 'Pertanyaan Populer',
    error: {
      commentRequired: 'Komentar wajib diisi',
      commentTooShort: 'Komentar minimal 3 karakter',
      commentTooLong: 'Komentar maksimal 1000 karakter',
      unauthorized: 'Anda tidak memiliki izin untuk melakukan tindakan ini',
    },
  },
  login: {
    title: 'Stack Underflow',
    subtitle: 'Platform Tanya Jawab',
    usernameLabel: 'Nama Pengguna',
    usernamePlaceholder: 'Masukkan nama pengguna',
    passwordLabel: 'Kata Sandi',
    passwordPlaceholder: 'Masukkan kata sandi',
    loginButton: 'Masuk',
    note: 'Catatan: Ini adalah login simulasi. Nama pengguna/kata sandi apa pun akan berfungsi.',
  },
  signup: {
    title: 'Stack Underflow',
    subtitle: 'Buat akun Anda',
    usernameLabel: 'Nama Pengguna',
    usernamePlaceholder: 'Pilih nama pengguna',
    passwordLabel: 'Kata Sandi',
    passwordPlaceholder: 'Pilih kata sandi',
    confirmPasswordLabel: 'Konfirmasi Kata Sandi',
    confirmPasswordPlaceholder: 'Konfirmasi kata sandi Anda',
    signupButton: 'Daftar',
    alreadyHaveAccount: 'Sudah punya akun?',
    loginHere: 'Masuk di sini',
    errors: {
      usernameRequired: 'Nama pengguna wajib diisi',
      passwordRequired: 'Kata sandi wajib diisi',
      passwordsNotMatch: 'Kata sandi tidak cocok',
      usernameExists: 'Nama pengguna sudah ada',
    },
  },
  date: {
    justNow: 'Baru saja',
    minuteAgo: '{{count}} menit yang lalu',
    minutesAgo: '{{count}} menit yang lalu',
    hourAgo: '{{count}} jam yang lalu',
    hoursAgo: '{{count}} jam yang lalu',
    dayAgo: '{{count}} hari yang lalu',
    daysAgo: '{{count}} hari yang lalu',
  },
};

const messages: Record<string, TranslationDict> = {
  en,
  id,
};

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private localeSignal = signal<string>('en');
  private messages = messages;

  get locale(): string {
    return this.localeSignal();
  }

  init(): void {
    const saved = localStorage.getItem('locale');
    if (saved && ['en', 'id'].includes(saved)) {
      this.localeSignal.set(saved);
    }
  }

  setLocale(locale: string): void {
    this.localeSignal.set(locale);
    localStorage.setItem('locale', locale);
  }

  t(key: string): string {
    const keys = key.split('.');
    let result: TranslationDict | string = this.messages[this.localeSignal()] || {};

    for (const k of keys) {
      if (typeof result === 'string') {
        return key;
      }
      result = result[k];
    }

    if (typeof result === 'string') {
      return result;
    }
    return key;
  }
}
