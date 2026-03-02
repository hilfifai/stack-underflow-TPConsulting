/**
 * Stack Underflow - Authentication Service
 * Handles user authentication and session management
 */

const Auth = {
    // Current user
    currentUser: null,
    
    // Check if user is logged in
    isLoggedIn() {
        return !!Storage.get(Config.storage.token) && !!this.currentUser;
    },
    
    // Get current user
    getCurrentUser() {
        if (!this.currentUser) {
            const userData = Storage.get(Config.storage.user);
            if (userData) {
                this.currentUser = userData;
            }
        }
        return this.currentUser;
    },
    
    // Login
    async login(email, password) {
        try {
            const response = await ApiService.post('/auth/login', { email, password });
            
            if (response.token) {
                ApiService.setToken(response.token);
                Storage.set(Config.storage.user, response.user);
                this.currentUser = response.user;
                
                // Track login event
                if (typeof analytics !== 'undefined') {
                    analytics.setUserId(response.user.id.toString());
                }
                
                return response;
            }
            
            throw new Error('Invalid login response');
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Register
    async register(name, email, password) {
        try {
            const response = await ApiService.post('/auth/register', { name, email, password });
            
            if (response.token) {
                ApiService.setToken(response.token);
                Storage.set(Config.storage.user, response.user);
                this.currentUser = response.user;
                
                // Track registration event
                if (typeof analytics !== 'undefined') {
                    analytics.setUserId(response.user.id.toString());
                }
                
                return response;
            }
            
            throw new Error('Invalid registration response');
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Logout
    logout() {
        // Clear stored data
        ApiService.clearToken();
        Storage.remove(Config.storage.user);
        Storage.remove(Config.storage.refreshToken);
        this.currentUser = null;
        
        // Track logout event
        if (typeof analytics !== 'undefined') {
            analytics.setUserId(null);
        }
        
        // Navigate to login
        App.showPage('login');
    },
    
    // Refresh token
    async refreshToken() {
        try {
            const refreshToken = Storage.get(Config.storage.refreshToken);
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            
            const response = await ApiService.post('/auth/refresh', { refreshToken });
            
            if (response.token) {
                ApiService.setToken(response.token);
                Storage.set(Config.storage.refreshToken, response.refreshToken);
                return response;
            }
            
            throw new Error('Invalid refresh response');
        } catch (error) {
            this.logout();
            throw error;
        }
    },
    
    // Update profile
    async updateProfile(profileData) {
        try {
            const response = await ApiService.put('/auth/profile', profileData);
            Storage.set(Config.storage.user, response.user);
            this.currentUser = response.user;
            return response;
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Change password
    async changePassword(currentPassword, newPassword) {
        try {
            return await ApiService.post('/auth/change-password', {
                currentPassword,
                newPassword
            });
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Request password reset
    async requestPasswordReset(email) {
        try {
            return await ApiService.post('/auth/forgot-password', { email });
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Reset password with token
    async resetPassword(token, newPassword) {
        try {
            return await ApiService.post('/auth/reset-password', { token, newPassword });
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Verify email
    async verifyEmail(token) {
        try {
            return await ApiService.post('/auth/verify-email', { token });
        } catch (error) {
            return ApiService.handleError(error);
        }
    },
    
    // Get user avatar initials
    getAvatarInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    },
    
    // Initialize auth state
    init() {
        const token = Storage.get(Config.storage.token);
        const userData = Storage.get(Config.storage.user);
        
        if (token && userData) {
            this.currentUser = userData;
            ApiService.setToken(token);
            return true;
        }
        
        return false;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
