/**
 * Stack Underflow - Date Utilities
 * Date formatting and manipulation helpers
 */

const DateUtils = {
    // Format date to relative time (e.g., "5 minutes ago")
    relativeTime(date) {
        const now = new Date();
        const then = new Date(date);
        const diffMs = now - then;
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHour = Math.round(diffMin / 60);
        const diffDay = Math.round(diffHour / 24);
        const diffWeek = Math.round(diffDay / 7);
        const diffMonth = Math.round(diffDay / 30);
        const diffYear = Math.round(diffDay / 365);
        
        if (diffSec < 60) {
            return 'just now';
        } else if (diffMin < 60) {
            return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
        } else if (diffHour < 24) {
            return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
        } else if (diffDay < 7) {
            return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
        } else if (diffWeek < 4) {
            return diffWeek === 1 ? '1 week ago' : `${diffWeek} weeks ago`;
        } else if (diffMonth < 12) {
            return diffMonth === 1 ? '1 month ago' : `${diffMonth} months ago`;
        } else {
            return diffYear === 1 ? '1 year ago' : `${diffYear} years ago`;
        }
    },
    
    // Format date to specific format
    format(date, format = 'MMM d, yyyy') {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const replacements = {
            'MMM': months[d.getMonth()],
            'MMMM': fullMonths[d.getMonth()],
            'd': d.getDate(),
            'dd': d.getDate().toString().padStart(2, '0'),
            'yyyy': d.getFullYear(),
            'yy': d.getFullYear().toString().slice(-2),
            'h': this.formatHour(d.getHours()),
            'hh': d.getHours().toString().padStart(2, '0'),
            'mm': d.getMinutes().toString().padStart(2, '0'),
            'ss': d.getSeconds().toString().padStart(2, '0'),
            'a': d.getHours() < 12 ? 'AM' : 'PM',
            'A': d.getHours() < 12 ? 'am' : 'pm'
        };
        
        let formatted = format;
        Object.keys(replacements).forEach(key => {
            formatted = formatted.replace(new RegExp(key, 'g'), replacements[key]);
        });
        
        return formatted;
    },
    
    // Format hour to 12-hour format
    formatHour(hour) {
        const h = hour % 12 || 12;
        return h.toString();
    },
    
    // Format date with time
    formatWithTime(date) {
        return this.format(date, 'MMM d, yyyy "at" h:mm a');
    },
    
    // Format date for API
    formatForAPI(date) {
        return new Date(date).toISOString();
    },
    
    // Parse date from API response
    parseFromAPI(dateString) {
        if (!dateString) return null;
        return new Date(dateString);
    },
    
    // Get time ago for mobile (shorter format)
    timeAgo(date) {
        const now = new Date();
        const then = new Date(date);
        const diffMs = now - then;
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHour = Math.round(diffMin / 60);
        const diffDay = Math.round(diffHour / 24);
        
        if (diffSec < 60) {
            return 'now';
        } else if (diffMin < 60) {
            return diffMin + 'm';
        } else if (diffHour < 24) {
            return diffHour + 'h';
        } else if (diffDay < 7) {
            return diffDay + 'd';
        } else {
            return this.format(date, 'MMM d');
        }
    },
    
    // Check if date is today
    isToday(date) {
        const d = new Date(date);
        const today = new Date();
        return d.getDate() === today.getDate() &&
               d.getMonth() === today.getMonth() &&
               d.getFullYear() === today.getFullYear();
    },
    
    // Check if date is yesterday
    isYesterday(date) {
        const d = new Date(date);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return d.getDate() === yesterday.getDate() &&
               d.getMonth() === yesterday.getMonth() &&
               d.getFullYear() === yesterday.getFullYear();
    },
    
    // Format for display in lists
    formatForList(date) {
        if (this.isToday(date)) {
            return 'Today ' + this.format(date, 'h:mm a');
        } else if (this.isYesterday(date)) {
            return 'Yesterday ' + this.format(date, 'h:mm a');
        } else {
            return this.format(date, 'MMM d, yyyy');
        }
    },
    
    // Calculate reading time for content
    readingTime(content, wordsPerMinute = 200) {
        if (!content) return 0;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateUtils;
}
