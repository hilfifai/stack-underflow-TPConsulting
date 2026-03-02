/**
 * Stack Underflow - Validation Utilities
 * Form validation helpers
 */

const Validation = {
    // Validation rules
    rules: {
        required: {
            validate: value => value !== null && value !== undefined && value !== '',
            message: 'This field is required'
        },
        email: {
            validate: value => Config.validation.email.test(value),
            message: 'Please enter a valid email address'
        },
        minLength: length => ({
            validate: value => value && value.length >= length,
            message: `Must be at least ${length} characters`
        }),
        maxLength: length => ({
            validate: value => !value || value.length <= length,
            message: `Must be no more than ${length} characters`
        }),
        min: value => ({
            validate: num => !isNaN(num) && parseFloat(num) >= value,
            message: `Must be at least ${value}`
        }),
        max: value => ({
            validate: num => !isNaN(num) && parseFloat(num) <= value,
            message: `Must be no more than ${value}`
        }),
        numeric: {
            validate: value => !isNaN(parseFloat(value)) && isFinite(value),
            message: 'Please enter a valid number'
        },
        alpha: {
            validate: value => /^[a-zA-Z]+$/.test(value),
            message: 'Only letters are allowed'
        },
        alphanumeric: {
            validate: value => /^[a-zA-Z0-9]+$/.test(value),
            message: 'Only letters and numbers are allowed'
        },
        username: {
            validate: value => Config.validation.username.pattern.test(value),
            message: 'Username can only contain letters, numbers, and underscores'
        },
        url: {
            validate: value => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            },
            message: 'Please enter a valid URL'
        },
        date: {
            validate: value => !isNaN(Date.parse(value)),
            message: 'Please enter a valid date'
        },
        confirm: (fieldName, getValue) => ({
            validate: value => value === getValue(),
            message: `Passwords do not match`
        }),
        passwordStrength: {
            validate: value => {
                if (!value) return false;
                const hasUpper = /[A-Z]/.test(value);
                const hasLower = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                return hasUpper && hasLower && hasNumber && hasSpecial;
            },
            message: 'Password must contain uppercase, lowercase, number, and special character'
        }
    },
    
    // Validate a single value
    validate(value, rules = []) {
        const errors = [];
        
        rules.forEach(rule => {
            let validator;
            let message;
            
            if (typeof rule === 'string') {
                validator = this.rules[rule];
                message = validator.message;
            } else if (typeof rule === 'object') {
                validator = rule.validate;
                message = rule.message || 'Invalid value';
            } else if (typeof rule === 'function') {
                const result = rule(value);
                if (result !== true) {
                    errors.push(result || 'Invalid value');
                }
                return;
            }
            
            if (validator && !validator.validate(value)) {
                errors.push(message);
            }
        });
        
        return errors.length > 0 ? errors : true;
    },
    
    // Validate form data
    validateForm(formData, schema) {
        const errors = {};
        
        Object.keys(schema).forEach(field => {
            const value = formData[field];
            const rules = schema[field];
            const result = this.validate(value, rules);
            
            if (result !== true) {
                errors[field] = result;
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },
    
    // Validate question form
    validateQuestion(formData) {
        const errors = {};
        
        // Title validation
        const titleResult = this.validate(formData.title, [
            'required',
            { validate: v => v && v.length >= Config.app.minQuestionTitleLength, 
              message: `Title must be at least ${Config.app.minQuestionTitleLength} characters` }
        ]);
        if (titleResult !== true) errors.title = titleResult;
        
        // Body validation
        const bodyResult = this.validate(formData.body, [
            'required',
            { validate: v => v && v.length >= Config.app.minQuestionBodyLength,
              message: `Body must be at least ${Config.app.minQuestionBodyLength} characters` }
        ]);
        if (bodyResult !== true) errors.body = bodyResult;
        
        // Tags validation
        if (formData.tags) {
            const tags = Array.isArray(formData.tags) ? formData.tags : formData.tags.split(',').map(t => t.trim());
            if (tags.length > Config.app.maxTagsPerQuestion) {
                errors.tags = [`Maximum ${Config.app.maxTagsPerQuestion} tags allowed`];
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },
    
    // Validate login form
    validateLogin(formData) {
        const errors = {};
        
        if (!formData.email || !Config.validation.email.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },
    
    // Validate registration form
    validateRegistration(formData) {
        const errors = {};
        
        if (!formData.name || formData.name.length < Config.validation.username.minLength) {
            errors.name = `Name must be at least ${Config.validation.username.minLength} characters`;
        }
        
        if (!formData.email || !Config.validation.email.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password || formData.password.length < Config.validation.password.minLength) {
            errors.password = `Password must be at least ${Config.validation.password.minLength} characters`;
        }
        
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },
    
    // Show validation errors on form
    showFormErrors(formElement, errors) {
        Object.keys(errors).forEach(field => {
            const input = formElement.querySelector(`[name="${field}"]`);
            if (input) {
                input.classList.add('error');
                const errorElement = formElement.querySelector(`[data-error-for="${field}"]`) ||
                                    input.parentElement.querySelector('.form-error');
                if (errorElement) {
                    errorElement.textContent = errors[field][0];
                    errorElement.style.display = 'block';
                }
            }
        });
    },
    
    // Clear validation errors from form
    clearFormErrors(formElement) {
        const inputs = formElement.querySelectorAll('.error');
        inputs.forEach(input => input.classList.remove('error'));
        
        const errorMessages = formElement.querySelectorAll('.form-error');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
    },
    
    // Add error class to input
    addError(input, message) {
        input.classList.add('error');
        const parent = input.parentElement;
        let errorElement = parent.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'form-error';
            parent.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    },
    
    // Remove error class from input
    removeError(input) {
        input.classList.remove('error');
        const parent = input.parentElement;
        const errorElement = parent.querySelector('.form-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validation;
}
