/**
 * Stack Underflow - Ask Question Page
 * Ask question page logic
 */

const AskQuestionPage = {
    // Form element
    form: null,
    
    // Tags array
    tags: [],
    
    // Draft key
    draftKey: 'ask_question_draft',
    
    // Initialize
    init() {
        this.form = document.getElementById('ask-question-form');
        if (this.form) {
            this.setupForm();
            this.loadDraft();
        }
    },
    
    // Setup form
    setupForm() {
        // Title character count
        const titleInput = document.getElementById('question-title');
        if (titleInput) {
            titleInput.addEventListener('input', () => {
                this.updateCharCount(titleInput, 15);
                this.saveDraft();
            });
        }
        
        // Body input
        const bodyInput = document.getElementById('question-body');
        if (bodyInput) {
            bodyInput.addEventListener('input', () => {
                this.saveDraft();
            });
        }
        
        // Tags input
        const tagsInput = document.getElementById('question-tags');
        if (tagsInput) {
            tagsInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    this.addTag(tagsInput.value);
                    tagsInput.value = '';
                }
            });
            
            tagsInput.addEventListener('blur', () => {
                if (tagsInput.value) {
                    this.addTag(tagsInput.value);
                    tagsInput.value = '';
                }
            });
        }
        
        // Check for draft on load
        this.checkDraft();
    },
    
    // Update character count
    updateCharCount(input, minLength) {
        const count = input.value.length;
        const countDisplay = input.parentElement.querySelector('.char-count') || 
                           input.parentElement.parentElement.querySelector('.char-count');
        
        if (countDisplay) {
            countDisplay.textContent = `${count}/${minLength}`;
            countDisplay.classList.remove('warning', 'error');
            
            if (count < minLength) {
                countDisplay.classList.add('error');
            } else if (count < minLength + 10) {
                countDisplay.classList.add('warning');
            }
        }
    },
    
    // Add tag
    addTag(tagName) {
        const tag = tagName.trim().toLowerCase();
        
        if (!tag || this.tags.includes(tag)) return;
        if (this.tags.length >= Config.app.maxTagsPerQuestion) {
            Toast.show(`Maximum ${Config.app.maxTagsPerQuestion} tags allowed`, 'warning');
            return;
        }
        
        this.tags.push(tag);
        this.renderTags();
        this.saveDraft();
    },
    
    // Remove tag
    removeTag(tagName) {
        this.tags = this.tags.filter(t => t !== tagName);
        this.renderTags();
        this.saveDraft();
    },
    
    // Render tags
    renderTags() {
        const container = document.querySelector('.tag-input-container');
        if (!container) return;
        
        const tagsHtml = this.tags.map(tag => `
            <span class="tag">
                ${Helpers.escapeHtml(tag)}
                <button type="button" class="remove-tag" data-tag="${Helpers.escapeHtml(tag)}">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
        
        container.innerHTML = tagsHtml + '<input type="text" id="question-tags" placeholder="Add tags...">';
        
        // Add remove handlers
        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                this.removeTag(btn.dataset.tag);
            });
        });
        
        // Re-attach tag input listener
        const tagsInput = container.querySelector('#question-tags');
        if (tagsInput) {
            tagsInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    this.addTag(tagsInput.value);
                    tagsInput.value = '';
                }
            });
        }
    },
    
    // Save draft
    saveDraft() {
        const draft = {
            title: document.getElementById('question-title')?.value || '',
            body: document.getElementById('question-body')?.value || '',
            tags: [...this.tags]
        };
        
        Storage.set(this.draftKey, draft);
    },
    
    // Load draft
    loadDraft() {
        const draft = Storage.get(this.draftKey);
        if (draft) {
            const titleInput = document.getElementById('question-title');
            const bodyInput = document.getElementById('question-body');
            
            if (titleInput && draft.title) {
                titleInput.value = draft.title;
                this.updateCharCount(titleInput, 15);
            }
            
            if (bodyInput && draft.body) {
                bodyInput.value = draft.body;
            }
            
            if (draft.tags && draft.tags.length > 0) {
                this.tags = draft.tags;
                this.renderTags();
            }
        }
    },
    
    // Check for draft
    checkDraft() {
        const draft = Storage.get(this.draftKey);
        if (draft && (draft.title || draft.body || draft.tags?.length > 0)) {
            // Could show a "Continue where you left off" message
        }
    },
    
    // Clear draft
    clearDraft() {
        Storage.remove(this.draftKey);
        this.tags = [];
        
        const titleInput = document.getElementById('question-title');
        const bodyInput = document.getElementById('question-body');
        
        if (titleInput) {
            titleInput.value = '';
            this.updateCharCount(titleInput, 15);
        }
        
        if (bodyInput) bodyInput.value = '';
        
        this.renderTags();
    },
    
    // Handle form submission
    async handleSubmit() {
        if (!this.form) return;
        
        const title = document.getElementById('question-title').value.trim();
        const body = document.getElementById('question-body').value.trim();
        
        // Validate
        const validation = Validation.validateQuestion({ title, body, tags: this.tags });
        
        if (!validation.isValid) {
            // Show errors
            Object.keys(validation.errors).forEach(field => {
                const input = this.form.querySelector(`#question-${field}`);
                if (input) {
                    Validation.addError(input, validation.errors[field][0]);
                }
            });
            return;
        }
        
        // Clear errors
        Validation.clearFormErrors(this.form);
        
        // Show loading
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Posting...';
        submitBtn.disabled = true;
        
        try {
            const response = await ApiService.post('/questions', {
                title,
                body,
                tags: this.tags
            });
            
            // Clear draft
            this.clearDraft();
            
            Toast.show('Question posted successfully!', 'success');
            
            // Navigate to the new question
            App.navigateToQuestion(response.data.id);
            
        } catch (error) {
            Toast.show(error.message || 'Failed to post question', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AskQuestionPage;
}
