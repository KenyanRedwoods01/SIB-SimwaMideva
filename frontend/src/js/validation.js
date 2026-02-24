/**
 * Form Validation Module - Mansa-X Investment Platform
 * Handles all form validation logic
 */

class FormValidator {
    constructor() {
        this.errors = {};
        this.validationRules = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[0-9\-\+\(\)\s]{10,}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            username: /^[a-zA-Z0-9_]{3,20}$/,
            url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            number: /^[0-9]+(\.[0-9]{1,2})?$/,
            positiveNumber: /^[1-9][0-9]*(\.[0-9]{1,2})?$/
        };
    }

    /**
     * Validate a single field
     * @param {string} fieldName - Name of the field
     * @param {string} value - Value to validate
     * @param {string} type - Type of validation (email, phone, etc.)
     * @param {object} options - Additional validation options
     * @returns {boolean} - True if valid, false otherwise
     */
    validateField(fieldName, value, type, options = {}) {
        let isValid = true;
        let errorMessage = '';

        // Check if field is required and empty
        if (options.required && (!value || value.trim() === '')) {
            isValid = false;
            errorMessage = `${fieldName} is required`;
        }

        // Skip further validation if field is empty and not required
        if (!options.required && (!value || value.trim() === '')) {
            if (this.errors[fieldName]) {
                delete this.errors[fieldName];
            }
            return true;
        }

        // Validate based on type
        if (isValid && type && this.validationRules[type]) {
            if (!this.validationRules[type].test(value)) {
                isValid = false;
                errorMessage = `${fieldName} is invalid`;
            }
        }

        // Check minimum length
        if (isValid && options.minLength && value.length < options.minLength) {
            isValid = false;
            errorMessage = `${fieldName} must be at least ${options.minLength} characters`;
        }

        // Check maximum length
        if (isValid && options.maxLength && value.length > options.maxLength) {
            isValid = false;
            errorMessage = `${fieldName} must not exceed ${options.maxLength} characters`;
        }

        // Check minimum value (for numbers)
        if (isValid && options.min !== undefined && parseFloat(value) < options.min) {
            isValid = false;
            errorMessage = `${fieldName} must be at least ${options.min}`;
        }

        // Check maximum value (for numbers)
        if (isValid && options.max !== undefined && parseFloat(value) < options.max) {
            isValid = false;
            errorMessage = `${fieldName} must not exceed ${options.max}`;
        }

        // Custom validation function
        if (isValid && options.customValidator && typeof options.customValidator === 'function') {
            const customResult = options.customValidator(value);
            if (!customResult.valid) {
                isValid = false;
                errorMessage = customResult.message || `${fieldName} is invalid`;
            }
        }

        // Store or clear error
        if (!isValid) {
            this.errors[fieldName] = errorMessage;
        } else if (this.errors[fieldName]) {
            delete this.errors[fieldName];
        }

        return isValid;
    }

    /**
     * Validate entire form
     * @param {HTMLFormElement} form - Form element to validate
     * @param {object} validationConfig - Configuration for validation
     * @returns {boolean} - True if all fields are valid, false otherwise
     */
    validateForm(form, validationConfig) {
        this.errors = {};
        let isFormValid = true;

        for (const fieldName in validationConfig) {
            const config = validationConfig[fieldName];
            const field = form.querySelector(`[name="${fieldName}"]`);

            if (!field) {
                console.warn(`Field ${fieldName} not found in form`);
                continue;
            }

            const value = field.value;
            const isFieldValid = this.validateField(
                config.label || fieldName,
                value,
                config.type,
                config.options || {}
            );

            if (!isFieldValid) {
                isFormValid = false;
                this.displayFieldError(field, this.errors[fieldName]);
            } else {
                this.clearFieldError(field);
            }
        }

        return isFormValid;
    }

    /**
     * Display error message for a field
     * @param {HTMLElement} field - Form field element
     * @param {string} message - Error message to display
     */
    displayFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');

        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    /**
     * Clear error message for a field
     * @param {HTMLElement} field - Form field element
     */
    clearFieldError(field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');

        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.style.display = 'none';
        }
    }

    /**
     * Get all validation errors
     * @returns {object} - Object containing all errors
     */
    getErrors() {
        return this.errors;
    }

    /**
     * Check if there are any errors
     * @returns {boolean} - True if there are errors, false otherwise
     */
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Clear all errors
     */
    clearErrors() {
        this.errors = {};
    }
}

/**
 * Real-time field validation
 * @param {HTMLElement} field - Form field to validate
 * @param {string} type - Type of validation
 * @param {object} options - Validation options
 */
function setupRealtimeValidation(field, type, options = {}) {
    const validator = new FormValidator();

    field.addEventListener('blur', function () {
        const fieldName = this.getAttribute('data-field-name') || this.name;
        validator.validateField(fieldName, this.value, type, options);

        if (validator.hasErrors()) {
            validator.displayFieldError(this, validator.getErrors()[fieldName]);
        } else {
            validator.clearFieldError(this);
        }
    });

    field.addEventListener('input', function () {
        const fieldName = this.getAttribute('data-field-name') || this.name;
        validator.validateField(fieldName, this.value, type, options);

        if (!validator.hasErrors()) {
            validator.clearFieldError(this);
        }
    });
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
    const validator = new FormValidator();
    return validator.validateField('Email', email, 'email', { required: true });
}

/**
 * Validate phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePhone(phone) {
    const validator = new FormValidator();
    return validator.validateField('Phone', phone, 'phone', { required: true });
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Object with strength level and message
 */
function validatePasswordStrength(password) {
    let strength = 0;
    let message = '';

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    switch (strength) {
        case 0:
        case 1:
            message = 'Weak';
            break;
        case 2:
        case 3:
            message = 'Fair';
            break;
        case 4:
            message = 'Good';
            break;
        case 5:
            message = 'Strong';
            break;
    }

    return {
        strength: strength,
        message: message,
        isValid: strength >= 3
    };
}

/**
 * Validate matching fields (e.g., password confirmation)
 * @param {string} field1 - First field value
 * @param {string} field2 - Second field value
 * @returns {boolean} - True if fields match, false otherwise
 */
function validateMatchingFields(field1, field2) {
    return field1 === field2;
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {object} options - Validation options (maxSize, allowedTypes)
 * @returns {object} - Validation result
 */
function validateFileUpload(file, options = {}) {
    const result = {
        valid: true,
        message: ''
    };

    // Check file size
    if (options.maxSize && file.size > options.maxSize) {
        result.valid = false;
        result.message = `File size exceeds maximum of ${options.maxSize / 1024 / 1024}MB`;
        return result;
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
        result.valid = false;
        result.message = `File type not allowed. Allowed types: ${options.allowedTypes.join(', ')}`;
        return result;
    }

    return result;
}

// Export validator class for use in other modules
window.FormValidator = FormValidator;
window.ValidationUtils = {
    validateEmail,
    validatePhone,
    validatePasswordStrength,
    validateMatchingFields,
    validateFileUpload,
    setupRealtimeValidation
};
