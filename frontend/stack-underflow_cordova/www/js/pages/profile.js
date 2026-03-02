/**
 * Stack Underflow - Profile Page
 * User profile page logic
 */

const ProfilePage = {
    // User data
    user: null,
    
    // Initialize
    init() {
        // Setup logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Auth.logout();
                Toast.show('You have been logged out', 'success');
            });
        }
        
        // Setup my questions button
        const myQuestionsBtn = document.getElementById('my-questions-btn');
        if (myQuestionsBtn) {
            myQuestionsBtn.addEventListener('click', () => {
                // Filter home page to show only user's questions
                App.showPage('home');
                // Could implement filtering by user
            });
        }
    },
    
    // Load page content
    async load() {
        if (!Auth.isLoggedIn()) {
            App.showPage('login');
            return;
        }
        
        this.init();
        this.renderProfile();
        await this.fetchUserStats();
    },
    
    // Render profile
    renderProfile() {
        const user = Auth.getCurrentUser();
        if (!user) return;
        
        this.user = user;
        
        // Update profile elements
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        const avatarEl = document.querySelector('.profile-avatar');
        
        if (nameEl) nameEl.textContent = user.name;
        if (emailEl) emailEl.textContent = user.email;
        
        if (avatarEl) {
            if (user.avatar) {
                avatarEl.innerHTML = `<img src="${Helpers.escapeHtml(user.avatar)}" alt="${Helpers.escapeHtml(user.name)}">`;
            } else {
                avatarEl.innerHTML = `<i class="fas fa-user-circle"></i>`;
            }
        }
    },
    
    // Fetch user stats
    async fetchUserStats() {
        try {
            const response = await ApiService.get('/users/me/stats');
            
            const questionsEl = document.getElementById('profile-questions');
            const answersEl = document.getElementById('profile-answers');
            const reputationEl = document.getElementById('profile-reputation');
            
            if (questionsEl) questionsEl.textContent = response.data?.questionCount || 0;
            if (answersEl) answersEl.textContent = response.data?.answerCount || 0;
            if (reputationEl) reputationEl.textContent = Helpers.formatNumber(response.data?.reputation || 0);
            
        } catch (error) {
            console.error('Failed to fetch user stats:', error);
        }
    },
    
    // Update profile (editable)
    async updateProfile(data) {
        try {
            const response = await Auth.updateProfile(data);
            this.renderProfile();
            Toast.show('Profile updated successfully', 'success');
        } catch (error) {
            Toast.show(error.message || 'Failed to update profile', 'error');
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfilePage;
}
