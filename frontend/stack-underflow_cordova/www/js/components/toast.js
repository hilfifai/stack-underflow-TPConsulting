/**
 * Stack Underflow - Toast Component
 * Toast notification system
 */

const Toast = {
    // Default duration
    duration: 3000,
    
    // Show toast notification
    show(message, type = 'info', duration = null) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (!toast || !toastMessage) {
            console.warn('Toast elements not found');
            return;
        }
        
        // Set message
        toastMessage.textContent = message;
        
        // Set type class
        toast.className = 'toast';
        toast.classList.add(type);
        toast.classList.add('show');
        
        // Auto hide
        const hideDuration = duration !== null ? duration : this.duration;
        if (hideDuration > 0) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, hideDuration);
        }
        
        // Vibration feedback on mobile
        if (Config.isCordova() && navigator.vibrate) {
            if (type === 'error') {
                navigator.vibrate([100, 50, 100]);
            } else if (type === 'success') {
                navigator.vibrate(50);
            }
        }
    },
    
    // Hide toast
    hide() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.remove('show');
            toast.classList.add('hidden');
        }
    },
    
    // Show success toast
    success(message, duration) {
        this.show(message, 'success', duration);
    },
    
    // Show error toast
    error(message, duration) {
        this.show(message, 'error', duration);
    },
    
    // Show warning toast
    warning(message, duration) {
        this.show(message, 'warning', duration);
    },
    
    // Show info toast
    info(message, duration) {
        this.show(message, 'info', duration);
    },
    
    // Show loading toast (indeterminate)
    loading(message = 'Loading...') {
        this.show(message, 'info', 0);
    },
    
    // Show confirmation toast with action
    confirm(message, onConfirm, onCancel) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.className = 'toast show';
        
        // Add action buttons
        let actionsHtml = `
            <button class="toast-action" id="toast-confirm">Yes</button>
            <button class="toast-action" id="toast-cancel">No</button>
        `;
        toastMessage.innerHTML = `${message} ${actionsHtml}`;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => this.hide());
        toast.appendChild(closeBtn);
        
        // Add event listeners
        document.getElementById('toast-confirm').addEventListener('click', () => {
            this.hide();
            if (onConfirm) onConfirm();
        });
        
        document.getElementById('toast-cancel').addEventListener('click', () => {
            this.hide();
            if (onCancel) onCancel();
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Toast;
}
