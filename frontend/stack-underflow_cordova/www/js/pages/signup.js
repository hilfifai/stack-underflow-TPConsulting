/**
 * Stack Underflow - Signup Page
 * Registration page logic
 */

const SignupPage = {
    // Form element
    form: null,
    
    // Initialize
    init() {
        this.form = document.getElementById('signup-form');
        if (this.form) {
            this.setupForm();
        }
    },
    
    // Setup form
    setupForm() {
        // Clear previous errors
        Validation.clearFormErrors(this.form);
        
        // Input validation on blur
        const nameInput = this.form.querySelector('#signup-name');
        const emailInput = this.form.querySelector('#signup-email');
        const passwordInput = this.form.querySelector('#signup-password');
        const confirmPasswordInput = this.form.querySelector('#signup-confirm-password');
        
        const inputs = [
            { input: nameInput, name: 'name', minLength: Config.validation.username.minLength },
            { input: emailInput, name: 'email', validate: Config.validation.email },
            { input: passwordInput, name: 'password', minLength: Config.validation.password.minLength }
        ];
        
        inputs.forEach(({ input, name, validate }) => {
            if (input) {
                input.addEventListener('blur', () => {
                    if (input.value && validate && !validate.test(input.value)) {
                        Validation.addError(input, `Invalid ${name}`);
                    } else {
                        Validation.removeError(input);
                    }
                });
            }
        });
        
        // Password confirmation
        if (confirmPasswordInput && passwordInput) {
            confirmPasswordInput.addEventListener('blur', () => {
                if (confirmPasswordInput.value !== passwordInput.value) {
                    Validation.addError(confirmPasswordInput, 'Passwords do not match');
                } else {
                    Validation.removeError(confirmPasswordInput);
                }
            });
        }
    },
    
    // Handle form submission
    async handleSubmit() {
        if (!this.form) return;
        
        const name = this.form.querySelector('#signup-name').value.trim();
        const email = this.form.querySelector('#signup-email').value.trim();
        const password = this.form.querySelector('#signup-password').value;
        const confirmPassword = this.form.querySelector('#signup-confirm-password').value;
        
        // Validate form
        const validation = Validation.validateRegistration({ name, email, password, confirmPassword });
        
        if (!validation.isValid) {
            Validation.showFormErrors(this.form, validation.errors);
            return;
        }
        
        // Clear errors
        Validation.clearFormErrors(this.form);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        this.form.classList.add('loading');
        
        try {
            // Attempt registration
            const response = await Auth.register(name, email, password);
            
            Toast.show('Account created successfully!', 'success');
            
            // Navigate to home
            App.showPage('home');
            
        } catch (error) {
            Toast.show(error.message || 'Registration failed. Please try again.', 'error');
            
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
    module.exports = SignupPage;
}
