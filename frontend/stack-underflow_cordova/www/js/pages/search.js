/**
 * Stack Underflow - Search Page
 * Search page logic
 */

const SearchPage = {
    // Search results container
    container: null,
    
    // Search input
    input: null,
    
    // Current query
    query: '',
    
    // Search results
    results: [],
    
    // Initialize
    init() {
        this.container = document.getElementById('search-results');
        this.input = document.getElementById('search-input');
        
        if (this.input) {
            this.input.focus();
        }
    },
    
    // Perform search
    async performSearch(query) {
        this.query = query.trim();
        
        if (this.query.length < 2) {
            this.showDefaultState();
            return;
        }
        
        // Clear previous results
        this.results = [];
        
        // Show loading
        this.showLoading();
        
        try {
            const response = await ApiService.get('/search', {
                q: this.query,
                type: 'questions'
            });
            
            this.results = response.data || [];
            this.renderResults();
            
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Search failed. Please try again.');
        }
    },
    
    // Render results
    renderResults() {
        if (!this.container) return;
        
        if (this.results.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.hideLoading();
        
        const resultsHtml = this.results.map(result => `
            <div class="search-result-item" data-id="${result.id}">
                <div class="search-result-content">
                    <h4 class="search-result-title">${Helpers.escapeHtml(result.title)}</h4>
                    <p class="search-result-excerpt">${Helpers.escapeHtml(Helpers.truncate(result.body, 100))}</p>
                    <div class="search-result-meta">
                        <span class="search-result-tags">
                            ${result.tags?.map(tag => `<span class="tag">${tag}</span>`).join('') || ''}
                        </span>
                        <span class="search-result-stats">
                            <span><i class="fas fa-thumbs-up"></i> ${result.voteCount || 0}</span>
                            <span><i class="far fa-comment"></i> ${result.answerCount || 0}</span>
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.container.innerHTML = `<div class="search-results-list">${resultsHtml}</div>`;
        
        // Add click handlers
        this.container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const questionId = item.dataset.id;
                App.navigateToQuestion(questionId);
            });
        });
    },
    
    // Show loading state
    showLoading() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="infinite-scroll-loading">
                    <div class="spinner"></div>
                    <span>Searching...</span>
                </div>
            `;
        }
    },
    
    // Hide loading
    hideLoading() {
        // Loading indicator removed after results shown
    },
    
    // Show default state
    showDefaultState() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="search-default-state">
                    <i class="fas fa-search"></i>
                    <p>Search for questions, tags, or users</p>
                </div>
            `;
        }
    },
    
    // Show no results
    showNoResults() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="search-no-results">
                    <i class="far fa-frown"></i>
                    <h3>No results found</h3>
                    <p>Try different keywords or browse popular tags</p>
                </div>
            `;
        }
    },
    
    // Show error
    showError(message) {
        if (this.container) {
            this.container.innerHTML = `
                <div class="search-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${Helpers.escapeHtml(message)}</p>
                </div>
            `;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchPage;
}
