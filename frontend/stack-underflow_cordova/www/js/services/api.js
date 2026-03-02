/**
 * Stack Underflow - API Service
 * Handles all API requests
 */

const ApiService = {
    // Default headers
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    
    // Initialize API service
    init() {
        this.headers['Authorization'] = Storage.get(Config.storage.token) || '';
    },
    
    // Set authorization token
    setToken(token) {
        this.headers['Authorization'] = token ? `Bearer ${token}` : '';
        Storage.set(Config.storage.token, token);
    },
    
    // Clear token
    clearToken() {
        this.headers['Authorization'] = '';
        Storage.remove(Config.storage.token);
    },
    
    // Make API request
    async request(method, endpoint, data = null, options = {}) {
        const url = Config.getEndpoint(endpoint);
        const config = {
            method,
            headers: {
                ...this.headers,
                ...options.headers
            }
        };
        
        if (data && method !== 'GET') {
            config.body = JSON.stringify(data);
        }
        
        // Add timeout
        const controller = new AbortController();
        config.signal = controller.signal;
        
        const timeoutId = setTimeout(() => controller.abort(), Config.api.timeout);
        
        try {
            const response = await fetch(url, config);
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            
            throw error;
        }
    },
    
    // GET request
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request('GET', url);
    },
    
    // POST request
    async post(endpoint, data) {
        return this.request('POST', endpoint, data);
    },
    
    // PUT request
    async put(endpoint, data) {
        return this.request('PUT', endpoint, data);
    },
    
    // PATCH request
    async patch(endpoint, data) {
        return this.request('PATCH', endpoint, data);
    },
    
    // DELETE request
    async delete(endpoint) {
        return this.request('DELETE', endpoint);
    },
    
    // Upload file
    async upload(endpoint, file, onProgress = null) {
        const url = Config.getEndpoint(endpoint);
        const formData = new FormData();
        formData.append('file', file);
        
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && onProgress) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    onProgress(percent);
                }
            });
            
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error(`Upload failed: ${xhr.status}`));
                }
            });
            
            xhr.addEventListener('error', () => reject(new Error('Upload failed')));
            xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));
            
            xhr.open('POST', url);
            xhr.setRequestHeader('Authorization', this.headers['Authorization']);
            xhr.send(formData);
        });
    },
    
    // Handle API errors
    handleError(error) {
        console.error('API Error:', error);
        
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
            // Token expired, try to refresh
            return Auth.refreshToken()
                .then(() => {
                    Toast.show('Session refreshed. Please try again.', 'info');
                    return Promise.reject(error);
                })
                .catch(() => {
                    Auth.logout();
                    App.showPage('login');
                    Toast.show('Session expired. Please log in again.', 'error');
                    return Promise.reject(error);
                });
        }
        
        return Promise.reject(error);
    }
};

// Initialize on load
document.addEventListener('deviceready', () => {
    ApiService.init();
}, false);
