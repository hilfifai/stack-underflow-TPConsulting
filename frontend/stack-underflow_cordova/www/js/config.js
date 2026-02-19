/**
 * Stack Underflow - Configuration
 * Application configuration settings
 */

const Config = {
    // API Configuration
    api: {
        baseUrl: 'http://localhost:8080/api',
        timeout: 30000,
        retryAttempts: 3,
        retryDelay: 1000
    },
    
    // Storage Keys
    storage: {
        token: 'stack_underflow_token',
        user: 'stack_underflow_user',
        refreshToken: 'stack_underflow_refresh_token',
        questions: 'stack_underflow_questions_cache',
        drafts: 'stack_underflow_drafts'
    },
    
    // App Settings
    app: {
        name: 'Stack Underflow',
        version: '1.0.0',
        language: 'en',
        theme: 'light',
        maxTagsPerQuestion: 5,
        minQuestionTitleLength: 15,
        minQuestionBodyLength: 30,
        pageSize: 20,
        cacheTimeout: 5 * 60 * 1000 // 5 minutes
    },
    
    // Pagination
    pagination: {
        defaultPageSize: 20,
        maxPageSize: 100
    },
    
    // Date Format
    date: {
        format: 'MMM d, yyyy',
        timeFormat: 'h:mm a',
        relativeTime: true
    },
    
    // Validation
    validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: {
            minLength: 6,
            maxLength: 100
        },
        username: {
            minLength: 3,
            maxLength: 30,
            pattern: /^[a-zA-Z0-9_]+$/
        }
    },
    
    // Feature Flags
    features: {
        offlineMode: false,
        pushNotifications: true,
        darkMode: true,
        infiniteScroll: true
    },
    
    // Social Links
    social: {
        website: 'https://stackunderflow.com',
        github: 'https://github.com/stackunderflow',
        twitter: 'https://twitter.com/stackunderflow'
    },
    
    // Get API URL
    getApiUrl() {
        // Check for environment variable or use default
        if (typeof cordova !== 'undefined') {
            // Mobile app - use local API
            return 'http://10.0.2.2:8080/api';
        }
        return this.api.baseUrl;
    },
    
    // Get full API endpoint
    getEndpoint(path) {
        return `${this.getApiUrl()}${path}`;
    },
    
    // Check if running in Cordova
    isCordova() {
        return typeof cordova !== 'undefined';
    },
    
    // Check if running on specific platform
    isPlatform(platform) {
        if (!this.isCordova()) return false;
        return device.platform.toLowerCase() === platform.toLowerCase();
    },
    
    // Get device info
    getDeviceInfo() {
        if (!this.isCordova()) {
            return {
                platform: 'browser',
                version: '1.0.0',
                model: 'browser'
            };
        }
        return {
            platform: device.platform,
            version: device.version,
            model: device.model
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
}
