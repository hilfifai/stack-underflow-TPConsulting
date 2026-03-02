/**
 * Stack Underflow - Helper Utilities
 * Common utility functions
 */

const Helpers = {
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    },
    
    // Debounce function
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit = 300) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Deep clone object
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // Check if object is empty
    isEmpty(obj) {
        if (obj === null || obj === undefined) return true;
        if (Array.isArray(obj)) return obj.length === 0;
        if (typeof obj === 'object') return Object.keys(obj).length === 0;
        return false;
    },
    
    // Truncate string
    truncate(str, length = 100, suffix = '...') {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.substring(0, length - suffix.length) + suffix;
    },
    
    // Capitalize first letter
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    // Convert to slug
    slugify(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },
    
    // Escape HTML
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    // Strip HTML tags
    stripHtml(html) {
        if (!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },
    
    // Format number with suffix (1K, 1M, etc.)
    formatNumber(num) {
        if (num < 1000) return num.toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        return (num / 1000000).toFixed(1) + 'M';
    },
    
    // Get URL parameters
    getUrlParams(url) {
        const params = new URLSearchParams(url.split('?')[1] || window.location.search);
        const result = {};
        params.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    },
    
    // Scroll to element
    scrollTo(element, offset = 0) {
        if (!element) return;
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    },
    
    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (e) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },
    
    // Detect device type
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    },
    
    // Check if online
    isOnline() {
        return navigator.onLine;
    },
    
    // Wait for specified time
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // Retry function with exponential backoff
    async retry(fn, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                if (i < maxRetries - 1) {
                    const delay = baseDelay * Math.pow(2, i);
                    await this.wait(delay);
                }
            }
        }
        throw lastError;
    },
    
    // Group array by key
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const group = item[key];
            if (!result[group]) {
                result[group] = [];
            }
            result[group].push(item);
            return result;
        }, {});
    },
    
    // Sort array by multiple keys
    sortBy(array, ...keys) {
        return [...array].sort((a, b) => {
            for (const key of keys) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
            }
            return 0;
        });
    },
    
    // Remove duplicates from array
    unique(array, key = null) {
        if (!key) {
            return [...new Set(array)];
        }
        const seen = new Set();
        return array.filter(item => {
            const value = item[key];
            if (seen.has(value)) return false;
            seen.add(value);
            return true;
        });
    },
    
    // Chunk array into smaller arrays
    chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    // Parse markdown-like syntax to HTML
    parseMarkdown(text) {
        if (!text) return '';
        
        let html = this.escapeHtml(text);
        
        // Code blocks
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Bold
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Helpers;
}
