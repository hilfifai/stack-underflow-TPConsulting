/**
 * Stack Underflow - Storage Service
 * Handles local storage operations
 */

const Storage = {
    // Storage prefix
    prefix: 'stack_underflow_',
    
    // Check if localStorage is available
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Get item from storage
    get(key, defaultValue = null) {
        const prefixedKey = this.prefix + key;
        
        try {
            const item = localStorage.getItem(prefixedKey);
            if (item === null) return defaultValue;
            
            // Try to parse JSON
            try {
                return JSON.parse(item);
            } catch {
                return item;
            }
        } catch (error) {
            console.warn('Storage get error:', error);
            return defaultValue;
        }
    },
    
    // Set item in storage
    set(key, value) {
        const prefixedKey = this.prefix + key;
        
        try {
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(prefixedKey, serialized);
            return true;
        } catch (error) {
            console.warn('Storage set error:', error);
            return false;
        }
    },
    
    // Remove item from storage
    remove(key) {
        const prefixedKey = this.prefix + key;
        
        try {
            localStorage.removeItem(prefixedKey);
            return true;
        } catch (error) {
            console.warn('Storage remove error:', error);
            return false;
        }
    },
    
    // Clear all storage
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.warn('Storage clear error:', error);
            return false;
        }
    },
    
    // Get storage usage
    getUsage() {
        let total = 0;
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                total += localStorage.getItem(key).length * 2; // UTF-16
            }
        });
        
        return {
            used: total,
            formatted: this.formatBytes(total)
        };
    },
    
    // Format bytes to human readable
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Session storage (for temporary data)
    session: {
        get(key, defaultValue = null) {
            try {
                const item = sessionStorage.getItem(key);
                if (item === null) return defaultValue;
                try {
                    return JSON.parse(item);
                } catch {
                    return item;
                }
            } catch {
                return defaultValue;
            }
        },
        
        set(key, value) {
            try {
                const serialized = typeof value === 'string' ? value : JSON.stringify(value);
                sessionStorage.setItem(key, serialized);
                return true;
            } catch {
                return false;
            }
        },
        
        remove(key) {
            try {
                sessionStorage.removeItem(key);
                return true;
            } catch {
                return false;
            }
        },
        
        clear() {
            try {
                sessionStorage.clear();
                return true;
            } catch {
                return false;
            }
        }
    },
    
    // Cache operations
    cache: {
        // Set with expiration
        set(key, value, ttl = Config.app.cacheTimeout) {
            const data = {
                value,
                expires: Date.now() + ttl
            };
            return Storage.set(`cache_${key}`, data);
        },
        
        // Get from cache
        get(key) {
            const data = Storage.get(`cache_${key}`);
            if (!data) return null;
            
            if (Date.now() > data.expires) {
                Storage.remove(`cache_${key}`);
                return null;
            }
            
            return data.value;
        },
        
        // Remove cache item
        remove(key) {
            return Storage.remove(`cache_${key}`);
        },
        
        // Clear all cache
        clear() {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(`${Storage.prefix}cache_`)) {
                    localStorage.removeItem(key);
                }
            });
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
