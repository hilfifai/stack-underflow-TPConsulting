/**
 * Stack Underflow - Home Page
 * Home/Feed page logic
 */

const HomePage = {
    // Current tab
    currentTab: 'feed',
    
    // Questions container
    container: null,
    
    // Loading indicator
    loading: null,
    
    // Empty state
    emptyState: null,
    
    // Questions data
    questions: [],
    
    // Page number
    page: 1,
    
    // Loading state
    isLoading: false,
    
    // Initialize
    init() {
        this.container = document.getElementById('questions-container');
        this.loading = document.getElementById('loading');
        this.emptyState = document.getElementById('empty-state');
        
        // Setup pull to refresh
        this.setupPullToRefresh();
        
        // Setup infinite scroll
        this.setupInfiniteScroll();
    },
    
    // Load page content
    async load() {
        if (!Auth.isLoggedIn()) {
            App.showPage('login');
            return;
        }
        
        this.init();
        await this.loadQuestions();
    },
    
    // Switch tab
    switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        // Reset and reload
        this.questions = [];
        this.page = 1;
        this.loadQuestions();
    },
    
    // Load questions
    async loadQuestions() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            // Get cached data first
            const cacheKey = `questions_${this.currentTab}_${this.page}`;
            const cached = Storage.cache.get(cacheKey);
            
            if (cached) {
                this.questions = this.page === 1 ? cached : [...this.questions, ...cached];
                this.renderQuestions();
                this.hideLoading();
                
                // Fetch fresh data
                await this.fetchQuestions();
            } else {
                await this.fetchQuestions();
            }
            
        } catch (error) {
            console.error('Error loading questions:', error);
            Toast.show('Failed to load questions', 'error');
            this.hideLoading();
        }
    },
    
    // Fetch questions from API
    async fetchQuestions() {
        try {
            const params = {
                page: this.page,
                limit: Config.pagination.defaultPageSize,
                sort: this.currentTab === 'recent' ? 'newest' : 'votes'
            };
            
            const response = await ApiService.get('/questions', params);
            
            if (response.data) {
                const questions = response.data;
                
                // Cache the results
                const cacheKey = `questions_${this.currentTab}_${this.page}`;
                Storage.cache.set(cacheKey, questions, Config.app.cacheTimeout);
                
                if (this.page === 1) {
                    this.questions = questions;
                } else {
                    this.questions = [...this.questions, ...questions];
                }
                
                this.renderQuestions();
            }
            
        } catch (error) {
            if (this.questions.length === 0) {
                this.showEmptyState();
            }
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    },
    
    // Render questions
    renderQuestions() {
        if (!this.container) return;
        
        if (this.questions.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.hideEmptyState();
        
        const questionsHtml = this.questions.map(q => this.renderQuestionCard(q)).join('');
        
        if (this.page === 1) {
            this.container.innerHTML = `<div class="questions-list">${questionsHtml}</div>`;
        } else {
            const list = this.container.querySelector('.questions-list');
            if (list) {
                list.innerHTML += questionsHtml;
            }
        }
        
        // Add click handlers
        this.container.querySelectorAll('.question-card, .question-item').forEach(card => {
            card.addEventListener('click', () => {
                const questionId = card.dataset.id;
                App.navigateToQuestion(questionId);
            });
        });
    },
    
    // Render single question card
    renderQuestionCard(question) {
        const timeAgo = DateUtils.relativeTime(question.createdAt);
        const excerpt = Helpers.truncate(question.body, 150);
        
        const tagsHtml = question.tags && question.tags.length > 0
            ? `<div class="question-tags">${question.tags.map(tag => `<span class="question-tag">${tag}</span>`).join('')}</div>`
            : '';
        
        return `
            <div class="question-card" data-id="${question.id}">
                <div class="question-stats">
                    <div class="question-stat">
                        <span class="question-stat-value">${question.voteCount || 0}</span>
                        <span class="question-stat-label">votes</span>
                    </div>
                    <div class="question-stat ${question.answerCount > 0 ? 'has-answer' : ''}">
                        <span class="question-stat-value">${question.answerCount || 0}</span>
                        <span class="question-stat-label">answers</span>
                    </div>
                </div>
                <div class="question-content">
                    <h3 class="question-title">${Helpers.escapeHtml(question.title)}</h3>
                    <p class="question-excerpt">${Helpers.escapeHtml(excerpt)}</p>
                    ${tagsHtml}
                    <div class="question-meta">
                        <div class="question-author">
                            <span class="question-author-name">${Helpers.escapeHtml(question.author?.name || 'Anonymous')}</span>
                        </div>
                        <div class="question-time">
                            <i class="far fa-clock"></i>
                            <span>${timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Show loading state
    showLoading() {
        if (this.page === 1) {
            this.container.innerHTML = '';
        }
        if (this.loading) {
            this.loading.classList.remove('hidden');
        }
    },
    
    // Hide loading state
    hideLoading() {
        if (this.loading) {
            this.loading.classList.add('hidden');
        }
        this.isLoading = false;
    },
    
    // Show empty state
    showEmptyState() {
        if (this.emptyState) {
            this.emptyState.classList.remove('hidden');
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    },
    
    // Hide empty state
    hideEmptyState() {
        if (this.emptyState) {
            this.emptyState.classList.add('hidden');
        }
    },
    
    // Setup pull to refresh
    setupPullToRefresh() {
        // Simple pull to refresh for mobile
        let startY = 0;
        const header = document.getElementById('app-header');
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0) {
                const currentY = e.touches[0].clientY;
                const diff = currentY - startY;
                
                if (diff > 100 && !this.isLoading) {
                    header.classList.add('refreshing');
                    this.page = 1;
                    this.loadQuestions().then(() => {
                        header.classList.remove('refreshing');
                    });
                }
            }
        }, { passive: true });
    },
    
    // Setup infinite scroll
    setupInfiniteScroll() {
        if (!Config.features.infiniteScroll) return;
        
        const scrollHandler = Helpers.throttle(() => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (scrollTop + windowHeight >= documentHeight - 200 && !this.isLoading) {
                this.page++;
                this.loadQuestions();
            }
        }, 200);
        
        window.addEventListener('scroll', scrollHandler);
    },
    
    // Refresh questions
    async refresh() {
        this.page = 1;
        await this.loadQuestions();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomePage;
}
