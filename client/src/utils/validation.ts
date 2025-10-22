import type { ValidationResult, ValidationRule, ValidationSchema, CheckoutFormData, CreditCardValidation, CVVValidation } from '../types/GameData'

// Generic validation function
export function validateField<T>(
    value: T,
    rules: ValidationRule<T>
): ValidationResult {
    // Required validation
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        return {
            hasSuccess: false,
            message: 'This field is required'
        }
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return {
            hasSuccess: true,
            message: ''
        }
    }

    // String-specific validations
    if (typeof value === 'string') {
        // Min length validation
        if (rules.minLength && value.length < rules.minLength) {
            return {
                hasSuccess: false,
                message: `Must be at least ${rules.minLength} characters`
            }
        }

        // Max length validation
        if (rules.maxLength && value.length > rules.maxLength) {
            return {
                hasSuccess: false,
                message: `Must be no more than ${rules.maxLength} characters`
            }
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            return {
                hasSuccess: false,
                message: 'Invalid format'
            }
        }
    }

    // Custom validation
    if (rules.custom) {
        return rules.custom(value)
    }

    return {
        hasSuccess: true,
        message: ''
    }
}

// Validate entire form
export function validateForm<T>(
    formData: T,
    schema: ValidationSchema<T>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
    const errors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    for (const field in schema) {
        const rules = schema[field]
        if (rules) {
            const result = validateField(formData[field], rules)
            if (!result.hasSuccess) {
                errors[field] = result.message
                isValid = false
            }
        }
    }

    return { isValid, errors }
}

// Name validation
export function validateName(name: string): ValidationResult {
    const rules: ValidationRule<string> = {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        custom: (value) => {
            const hasNumber = [...value].some(char => !isNaN(parseInt(char)))
            if (hasNumber) {
                return {
                    hasSuccess: false,
                    message: 'Name cannot contain numbers'
                }
            }
            return { hasSuccess: true, message: '' }
        }
    }

    return validateField(name, rules)
}

// Credit card validation
export function validateCreditCard(cardNumber: string): CreditCardValidation {
    // Remove spaces and non-digits
    const cleaned = cardNumber.replace(/\D/g, '')
    
    // Check if it's a valid length
    if (cleaned.length !== 16) {
        return {
            isValid: false,
            cardType: 'unknown',
            error: 'Credit card must be 16 digits'
        }
    }

    // Luhn algorithm validation
    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i])

        if (isEven) {
            digit *= 2
            if (digit > 9) {
                digit -= 9
            }
        }

        sum += digit
        isEven = !isEven
    }

    if (sum % 10 !== 0) {
        return {
            isValid: false,
            cardType: 'unknown',
            error: 'Invalid credit card number'
        }
    }

    // Determine card type
    let cardType: CreditCardValidation['cardType'] = 'unknown'
    if (cleaned.startsWith('4')) {
        cardType = 'visa'
    } else if (cleaned.startsWith('5') || cleaned.startsWith('2')) {
        cardType = 'mastercard'
    } else if (cleaned.startsWith('3')) {
        cardType = 'amex'
    } else if (cleaned.startsWith('6')) {
        cardType = 'discover'
    }

    return {
        isValid: true,
        cardType,
        error: null
    }
}

// CVV validation
export function validateCVV(cvv: string, cardType?: string): CVVValidation {
    const cleaned = cvv.replace(/\D/g, '')
    
    // CVV length depends on card type
    const expectedLength = cardType === 'amex' ? 4 : 3
    
    if (cleaned.length !== expectedLength) {
        return {
            isValid: false,
            error: `CVV must be ${expectedLength} digits`
        }
    }

    return {
        isValid: true,
        error: null
    }
}

// Email validation
export function validateEmail(email: string): ValidationResult {
    const rules: ValidationRule<string> = {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }

    return validateField(email, rules)
}

// Phone validation
export function validatePhone(phone: string): ValidationResult {
    const rules: ValidationRule<string> = {
        required: true,
        pattern: /^\(\d{3}\)\s\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$|^\d{10}$/
    }

    return validateField(phone, rules)
}

// Password validation
export function validatePassword(password: string): ValidationResult {
    const rules: ValidationRule<string> = {
        required: true,
        minLength: 8,
        custom: (value) => {
            const hasUpperCase = /[A-Z]/.test(value)
            const hasLowerCase = /[a-z]/.test(value)
            const hasNumbers = /\d/.test(value)
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

            if (!hasUpperCase) {
                return {
                    hasSuccess: false,
                    message: 'Password must contain at least one uppercase letter'
                }
            }
            if (!hasLowerCase) {
                return {
                    hasSuccess: false,
                    message: 'Password must contain at least one lowercase letter'
                }
            }
            if (!hasNumbers) {
                return {
                    hasSuccess: false,
                    message: 'Password must contain at least one number'
                }
            }
            if (!hasSpecialChar) {
                return {
                    hasSuccess: false,
                    message: 'Password must contain at least one special character'
                }
            }

            return { hasSuccess: true, message: '' }
        }
    }

    return validateField(password, rules)
}

// Checkout form validation schema
export const checkoutValidationSchema: ValidationSchema<CheckoutFormData> = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/
    },
    creditCard: {
        required: true,
        custom: (value) => {
            const fullCardNumber = `${value.part1}${value.part2}${value.part3}${value.part4}`
            const validation = validateCreditCard(fullCardNumber)
            return {
                hasSuccess: validation.isValid,
                message: validation.error || ''
            }
        }
    },
    cvv: {
        required: true,
        custom: (value) => {
            const validation = validateCVV(value)
            return {
                hasSuccess: validation.isValid,
                message: validation.error || ''
            }
        }
    }
}

