/**
 * Stack Underflow - Login Page
 * Login page logic
 */

const LoginPage = {
    // Form element
    form: null,
    
    // Initialize
    init() {
        this.form = document.getElementById('login-form');
        if (this.form) {
            this.setupForm();
        }
    },
    
    // Setup form
    setupForm() {
        // Clear previous errors
        Validation.clearFormErrors(this.form);
        
        // Input validation on blur
        const emailInput = this.form.querySelector('#login-email');
        const passwordInput = this.form.querySelector('#login-password');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !Config.validation.email.test(emailInput.value)) {
                    Validation.addError(emailInput, 'Please enter a valid email address');
                } else {
                    Validation.removeError(emailInput);
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('blur', () => {
                if (!passwordInput.value) {
                    Validation.addError(passwordInput, 'Password is required');
                } else {
                    Validation.removeError(passwordInput);
                }
            });
        }
    },
    
    // Handle form submission
    async handleSubmit() {
        if (!this.form) return;
        
        const emailInput = this.form.querySelector('#login-email');
        const passwordInput = this.form.querySelector('#login-password');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validate form
        const validation = Validation.validateLogin({ email, password });
        
        if (!validation.isValid) {
            Validation.showFormErrors(this.form, validation.errors);
            return;
        }
        
        // Clear errors
        Validation.clearFormErrors(this.form);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;
        this.form.classList.add('loading');
        
        try {
            // Attempt login
            const response = await Auth.login(email, password);
            
            Toast.show('Welcome back!', 'success');
            
            // Navigate to home
            App.showPage('home');
            
        } catch (error) {
            Toast.show(error.message || 'Login failed. Please try again.', 'error');
            
            // Shake animation for error
            this.form.classList.add('shake');
            setTimeout(() => {
                this.form.classList.remove('shake');
            }, 500);
            
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.form.classList.remove('loading');
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginPage;
}
