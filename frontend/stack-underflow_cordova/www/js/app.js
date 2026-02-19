/**
 * Stack Underflow - Main Application
 * Core application logic
 */

const App = {
    // Current page
    currentPage: null,
    
    // Previous page
    previousPage: null,
    
    // Page history
    pageHistory: [],
    
    // Initialize application
    async init() {
        console.log('Initializing Stack Underflow App...');
        
        // Initialize storage
        Storage.isAvailable();
        
        // Initialize auth state
        Auth.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup page navigation
        this.setupNavigation();
        
        // Check authentication status
        if (Auth.isLoggedIn()) {
            this.showPage('home');
        } else {
            this.showPage('login');
        }
        
        // Handle back button on Android
        if (typeof device !== 'undefined' && device.platform === 'Android') {
            document.addEventListener('backbutton', this.handleBackButton, false);
        }
        
        console.log('App initialized successfully');
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                LoginPage.handleSubmit();
            });
        }
        
        // Signup form
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                SignupPage.handleSubmit();
            });
        }
        
        // Ask question form
        const askQuestionForm = document.getElementById('ask-question-form');
        if (askQuestionForm) {
            askQuestionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                AskQuestionPage.handleSubmit();
            });
        }
        
        // Add comment form
        const addCommentForm = document.getElementById('add-comment-form');
        if (addCommentForm) {
            addCommentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                QuestionDetailPage.handleAddComment();
            });
        }
        
        // Navigation between login/signup
        const goToSignup = document.getElementById('go-to-signup');
        if (goToSignup) {
            goToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('signup');
            });
        }
        
        const goToLogin = document.getElementById('go-to-login');
        if (goToLogin) {
            goToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('login');
            });
        }
        
        // Cancel ask question
        const cancelQuestion = document.getElementById('cancel-question');
        if (cancelQuestion) {
            cancelQuestion.addEventListener('click', () => {
                this.showPage('home');
            });
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Auth.logout();
                Toast.show('You have been logged out', 'success');
            });
        }
        
        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page === 'ask') {
                    this.showPage('ask-question');
                } else if (page === 'profile') {
                    this.showPage('profile');
                } else if (page === 'home') {
                    this.showPage('home');
                }
            });
        });
        
        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                HomePage.switchTab(tab);
            });
        });
        
        // Search close button
        const closeSearch = document.getElementById('close-search');
        if (closeSearch) {
            closeSearch.addEventListener('click', () => {
                this.showPage('home');
            });
        }
        
        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', Helpers.debounce((e) => {
                SearchPage.performSearch(e.target.value);
            }, 300));
        }
        
        // Keyboard dismiss on mobile
        document.addEventListener('touchstart', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                document.activeElement.blur();
            }
        });
    },
    
    // Setup page navigation
    setupNavigation() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, false);
            }
        });
    },
    
    // Navigate to page
    showPage(pageName, addToHistory = true) {
        console.log(`Navigating to page: ${pageName}`);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.previousPage = this.currentPage;
            this.currentPage = pageName;
            
            // Update page-specific content
            this.loadPageContent(pageName);
            
            // Update header visibility
            this.updateHeaderVisibility(pageName);
            
            // Update bottom nav visibility
            this.updateBottomNavVisibility(pageName);
            
            // Update history
            if (addToHistory) {
                this.pageHistory.push(pageName);
                history.pushState({ page: pageName }, '', `#${pageName}`);
            }
        } else {
            console.error(`Page not found: ${pageName}`);
        }
    },
    
    // Load page-specific content
    loadPageContent(pageName) {
        switch (pageName) {
            case 'home':
                HomePage.load();
                break;
            case 'question-detail':
                QuestionDetailPage.load();
                break;
            case 'profile':
                ProfilePage.load();
                break;
            case 'search':
                SearchPage.init();
                break;
        }
    },
    
    // Update header visibility
    updateHeaderVisibility(pageName) {
        const header = document.getElementById('app-header');
        const hiddenPages = ['login', 'signup'];
        
        if (hiddenPages.includes(pageName)) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    },
    
    // Update bottom nav visibility
    updateBottomNavVisibility(pageName) {
        const bottomNav = document.getElementById('bottom-nav');
        const hiddenPages = ['login', 'signup', 'ask-question'];
        
        if (hiddenPages.includes(pageName)) {
            bottomNav.classList.add('hidden');
        } else {
            bottomNav.classList.remove('hidden');
        }
    },
    
    // Navigate back
    goBack() {
        if (this.pageHistory.length > 1) {
            this.pageHistory.pop();
            const previousPage = this.pageHistory[this.pageHistory.length - 1];
            this.showPage(previousPage, false);
            history.back();
        } else {
            // Exit app on Android
            if (typeof navigator !== 'undefined' && navigator.app) {
                navigator.app.exitApp();
            }
        }
    },
    
    // Handle back button
    handleBackButton() {
        if (this.currentPage === 'home') {
            navigator.app.exitApp();
        } else {
            this.goBack();
        }
    },
    
    // Navigate to question detail
    navigateToQuestion(questionId) {
        QuestionDetailPage.setQuestionId(questionId);
        this.showPage('question-detail');
    },
    
    // Show toast notification
    showToast(message, type = 'info') {
        Toast.show(message, type);
    }
};

// Device ready event
document.addEventListener('deviceready', () => {
    App.init();
}, false);

// Fallback for browser testing
if (!Config.isCordova()) {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
