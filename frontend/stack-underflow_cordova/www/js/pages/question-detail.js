/**
 * Stack Underflow - Question Detail Page
 * Question detail page logic
 */

const QuestionDetailPage = {
    // Current question ID
    questionId: null,
    
    // Question data
    question: null,
    
    // Answers data
    answers: [],
    
    // Comments data
    comments: [],
    
    // Initialize
    init() {
        // Setup vote buttons
        this.setupVoteButtons();
    },
    
    // Set question ID
    setQuestionId(id) {
        this.questionId = id;
        this.question = null;
        this.answers = [];
        this.comments = [];
    },
    
    // Load page content
    async load() {
        if (!Auth.isLoggedIn()) {
            App.showPage('login');
            return;
        }
        
        if (!this.questionId) {
            Toast.show('Question not found', 'error');
            App.showPage('home');
            return;
        }
        
        this.init();
        await this.fetchQuestion();
        await this.fetchAnswers();
        await this.fetchComments();
    },
    
    // Fetch question
    async fetchQuestion() {
        try {
            const response = await ApiService.get(`/questions/${this.questionId}`);
            this.question = response.data;
            this.renderQuestion();
        } catch (error) {
            Toast.show('Failed to load question', 'error');
            App.goBack();
        }
    },
    
    // Fetch answers
    async fetchAnswers() {
        try {
            const response = await ApiService.get(`/questions/${this.questionId}/answers`);
            this.answers = response.data || [];
            this.renderAnswers();
        } catch (error) {
            console.error('Failed to load answers:', error);
        }
    },
    
    // Fetch comments
    async fetchComments() {
        try {
            const response = await ApiService.get(`/questions/${this.questionId}/comments`);
            this.comments = response.data || [];
            this.renderComments();
        } catch (error) {
            console.error('Failed to load comments:', error);
        }
    },
    
    // Render question
    renderQuestion() {
        const container = document.getElementById('question-detail');
        if (!container || !this.question) return;
        
        const q = this.question;
        const timeAgo = DateUtils.relativeTime(q.createdAt);
        
        const tagsHtml = q.tags && q.tags.length > 0
            ? `<div class="question-tags-display">${q.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
            : '';
        
        const votesHtml = `
            <div class="vote-section">
                <div class="vote-controls">
                    <div class="vote-buttons">
                        <button class="vote-btn upvote" data-vote="up" data-type="question">
                            <i class="fas fa-caret-up"></i>
                        </button>
                        <button class="vote-btn downvote" data-vote="down" data-type="question">
                            <i class="fas fa-caret-down"></i>
                        </button>
                    </div>
                    <span class="vote-count">${q.voteCount || 0}</span>
                </div>
            </div>
        `;
        
        container.innerHTML = `
            <div class="question-header">
                <h1>${Helpers.escapeHtml(q.title)}</h1>
                <div class="question-meta-bar">
                    <span class="question-meta-item">
                        <i class="far fa-clock"></i>
                        <span>Asked ${timeAgo}</span>
                    </span>
                    <span class="question-meta-item">
                        <i class="far fa-eye"></i>
                        <span>${q.viewCount || 0} views</span>
                    </span>
                </div>
            </div>
            <div class="question-body">
                ${votesHtml}
                <div class="question-body-content">
                    ${Helpers.parseMarkdown(q.body)}
                </div>
                ${tagsHtml}
                <div class="question-footer">
                    <div class="question-actions">
                        <button class="btn btn-ghost btn-sm">
                            <i class="far fa-bookmark"></i> Save
                        </button>
                        <button class="btn btn-ghost btn-sm">
                            <i class="fas fa-share"></i> Share
                        </button>
                    </div>
                    <div class="question-author-card">
                        <div class="avatar avatar-sm">
                            ${Auth.getAvatarInitials(q.author?.name)}
                        </div>
                        <div class="question-author-info">
                            <span class="name">${Helpers.escapeHtml(q.author?.name || 'Anonymous')}</span>
                            <span class="time">asked ${timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Setup vote handlers
        this.setupVoteButtons();
    },
    
    // Render answers
    renderAnswers() {
        const container = document.getElementById('answers-container');
        if (!container) return;
        
        if (this.answers.length === 0) {
            container.innerHTML = `
                <div class="answers-empty">
                    <p>No answers yet. Be the first to answer!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.answers.map(answer => this.renderAnswerCard(answer)).join('');
        this.setupVoteButtons();
    },
    
    // Render answer card
    renderAnswerCard(answer) {
        const timeAgo = DateUtils.relativeTime(answer.createdAt);
        
        return `
            <div class="answer-card" data-id="${answer.id}">
                <div class="answer-body">
                    <div class="vote-section">
                        <div class="vote-controls">
                            <div class="vote-buttons">
                                <button class="vote-btn upvote" data-vote="up" data-type="answer" data-id="${answer.id}">
                                    <i class="fas fa-caret-up"></i>
                                </button>
                                <button class="vote-btn downvote" data-vote="down" data-type="answer" data-id="${answer.id}">
                                    <i class="fas fa-caret-down"></i>
                                </button>
                            </div>
                            <span class="vote-count">${answer.voteCount || 0}</span>
                        </div>
                    </div>
                    <div class="answer-content">
                        ${Helpers.parseMarkdown(answer.body)}
                    </div>
                </div>
                <div class="answer-footer">
                    <div class="question-author-card">
                        <div class="avatar avatar-sm">
                            ${Auth.getAvatarInitials(answer.author?.name)}
                        </div>
                        <div class="question-author-info">
                            <span class="name">${Helpers.escapeHtml(answer.author?.name || 'Anonymous')}</span>
                            <span class="time">answered ${timeAgo}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Render comments
    renderComments() {
        const container = document.getElementById('comments-list');
        if (!container) return;
        
        if (this.comments.length === 0) {
            container.innerHTML = '<p class="text-muted">No comments yet.</p>';
            return;
        }
        
        container.innerHTML = this.comments.map(comment => `
            <div class="comment" data-id="${comment.id}">
                <div class="comment-content">
                    <div class="comment-body">${Helpers.parseMarkdown(comment.body)}</div>
                    <div class="comment-footer">
                        <span class="comment-time">${DateUtils.relativeTime(comment.createdAt)}</span>
                        <span class="comment-author">${Helpers.escapeHtml(comment.author?.name || 'Anonymous')}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    // Setup vote buttons
    setupVoteButtons() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = btn.dataset.type;
                const vote = btn.dataset.vote;
                const id = btn.dataset.id || this.questionId;
                this.handleVote(type, vote, id);
            });
        });
    },
    
    // Handle vote
    async handleVote(type, vote, id) {
        if (!Auth.isLoggedIn()) {
            Toast.show('Please log in to vote', 'info');
            App.showPage('login');
            return;
        }
        
        try {
            const endpoint = type === 'question' ? `/questions/${id}/vote` : `/answers/${id}/vote`;
            const response = await ApiService.post(endpoint, { vote });
            
            // Update UI
            const voteBtn = document.querySelector(`.vote-btn[data-vote="${vote}"][data-type="${type}"][data-id="${id}"]`);
            const voteCount = voteBtn?.parentElement?.parentElement?.querySelector('.vote-count');
            
            if (voteCount && response.voteCount !== undefined) {
                voteCount.textContent = response.voteCount;
            }
            
            Toast.show('Vote recorded', 'success');
            
        } catch (error) {
            Toast.show(error.message || 'Failed to vote', 'error');
        }
    },
    
    // Handle add comment
    async handleAddComment() {
        const input = document.getElementById('comment-input');
        const body = input.value.trim();
        
        if (!body) {
            Toast.show('Please enter a comment', 'warning');
            return;
        }
        
        try {
            const response = await ApiService.post(`/questions/${this.questionId}/comments`, { body });
            
            // Add comment to list
            this.comments.push(response.data);
            this.renderComments();
            
            // Clear input
            input.value = '';
            
            Toast.show('Comment added', 'success');
            
        } catch (error) {
            Toast.show(error.message || 'Failed to add comment', 'error');
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionDetailPage;
}
