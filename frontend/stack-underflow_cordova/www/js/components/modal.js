/**
 * Stack Underflow - Modal Component
 * Modal dialog system
 */

const Modal = {
    // Current modal instance
    currentModal: null,
    
    // Show modal
    show(options = {}) {
        const {
            title = 'Modal',
            content = '',
            type = 'default',
            size = 'md',
            animate = true,
            closeOnOverlay = true,
            closeOnEscape = true,
            buttons = [],
            onOpen = null,
            onClose = null
        } = options;
        
        const overlay = document.getElementById('modal-overlay');
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalClose = document.getElementById('modal-close');
        
        if (!overlay || !modal) {
            console.warn('Modal elements not found');
            return;
        }
        
        // Set title
        modalTitle.textContent = title;
        
        // Set content
        modalContent.innerHTML = content;
        
        // Set type class
        modal.className = 'modal';
        modal.classList.add(`modal-${type}`);
        modal.classList.add(`modal-${size}`);
        if (animate) {
            modal.classList.add('modal-animate-slide');
        }
        
        // Clear previous buttons
        let footer = modal.querySelector('.modal-footer');
        if (footer) {
            footer.remove();
        }
        
        // Add buttons if provided
        if (buttons.length > 0) {
            footer = document.createElement('div');
            footer.className = 'modal-footer';
            
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = `btn ${btn.class || 'btn-secondary'}`;
                button.textContent = btn.text;
                button.addEventListener('click', () => {
                    if (btn.action) btn.action();
                    this.hide();
                });
                footer.appendChild(button);
            });
            
            modal.appendChild(footer);
        }
        
        // Show overlay
        overlay.classList.remove('hidden');
        overlay.classList.add('show');
        
        // Store current modal
        this.currentModal = { onClose };
        
        // Close button handler
        modalClose.onclick = () => this.hide();
        
        // Close on overlay click
        if (closeOnOverlay) {
            overlay.onclick = (e) => {
                if (e.target === overlay) {
                    this.hide();
                }
            };
        }
        
        // Close on Escape key
        if (closeOnEscape) {
            document.addEventListener('keydown', this.handleEscapeKey);
        }
        
        // Call onOpen callback
        if (onOpen) {
            onOpen();
        }
    },
    
    // Hide modal
    hide() {
        const overlay = document.getElementById('modal-overlay');
        
        if (!overlay) return;
        
        overlay.classList.remove('show');
        overlay.classList.add('hidden');
        
        // Clear content
        const modalContent = document.getElementById('modal-content');
        if (modalContent) {
            modalContent.innerHTML = '';
        }
        
        // Call onClose callback
        if (this.currentModal && this.currentModal.onClose) {
            this.currentModal.onClose();
        }
        
        // Remove escape key handler
        document.removeEventListener('keydown', this.handleEscapeKey);
        
        this.currentModal = null;
    },
    
    // Handle escape key
    handleEscapeKey(e) {
        if (e.key === 'Escape') {
            Modal.hide();
        }
    },
    
    // Show alert modal
    alert(message, title = 'Alert', onClose = null) {
        this.show({
            title,
            content: `<p>${message}</p>`,
            type: 'warning',
            buttons: [
                { text: 'OK', class: 'btn-primary', action: onClose }
            ]
        });
    },
    
    // Show confirm modal
    confirm(message, title = 'Confirm', onConfirm, onCancel = null) {
        this.show({
            title,
            content: `<p>${message}</p>`,
            type: 'default',
            buttons: [
                { text: 'Cancel', class: 'btn-secondary', action: onCancel },
                { text: 'Confirm', class: 'btn-primary', action: onConfirm }
            ]
        });
    },
    
    // Show success modal
    success(message, title = 'Success', onClose = null) {
        this.show({
            title,
            content: `<p>${message}</p>`,
            type: 'success',
            buttons: [
                { text: 'OK', class: 'btn-primary', action: onClose }
            ]
        });
    },
    
    // Show error modal
    error(message, title = 'Error', onClose = null) {
        this.show({
            title,
            content: `<p>${message}</p>`,
            type: 'error',
            buttons: [
                { text: 'OK', class: 'btn-primary', action: onClose }
            ]
        });
    },
    
    // Show prompt modal
    prompt(message, title = 'Input', defaultValue = '', onConfirm, onCancel = null) {
        const content = `
            <p>${message}</p>
            <div class="form-group">
                <input type="text" id="modal-prompt-input" value="${defaultValue}">
            </div>
        `;
        
        this.show({
            title,
            content,
            type: 'default',
            buttons: [
                { text: 'Cancel', class: 'btn-secondary', action: onCancel },
                { text: 'OK', class: 'btn-primary', action: () => {
                    const input = document.getElementById('modal-prompt-input');
                    if (input && onConfirm) {
                        onConfirm(input.value);
                    }
                }}
            ]
        });
    },
    
    // Show custom modal with form
    form(title, formHtml, onSubmit, onCancel = null) {
        this.show({
            title,
            content: `<form id="modal-form">${formHtml}</form>`,
            type: 'default',
            buttons: [
                { text: 'Cancel', class: 'btn-secondary', action: onCancel },
                { text: 'Submit', class: 'btn-primary', action: () => {
                    const form = document.getElementById('modal-form');
                    if (form && onSubmit) {
                        const formData = new FormData(form);
                        onSubmit(Object.fromEntries(formData));
                    }
                }}
            ]
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modal;
}
