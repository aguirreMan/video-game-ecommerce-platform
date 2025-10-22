# Validation System Documentation

This document explains the comprehensive validation system created for your games e-commerce application.

## Overview

The validation system consists of:
- **Types**: TypeScript interfaces and types for validation
- **Utilities**: Validation functions for different field types
- **Hooks**: Custom React hooks for form management
- **Examples**: Implementation examples

## Files Created

1. `client/src/types/GameData.ts` - Updated with validation types
2. `client/src/utils/validation.ts` - Validation utility functions
3. `client/src/Hooks/useFormValidation.ts` - Custom validation hooks
4. `client/src/components/CheckoutModalExample.tsx` - Example implementation

## Types Available

### Core Validation Types

```typescript
// Basic validation result
type ValidationResult = {
    hasSuccess: boolean
    message: string
}

// Validation rule configuration
type ValidationRule<T> = {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: T) => ValidationResult
}

// Validation schema for forms
type ValidationSchema<T> = {
    [K in keyof T]?: ValidationRule<T[K]>
}
```

### Form Types

```typescript
// Checkout form data structure
type CheckoutFormData = {
    name: string
    creditCard: {
        part1: string
        part2: string
        part3: string
        part4: string
    }
    cvv: string
}

// Individual field state
type FormFieldState<T> = {
    value: T
    error: string | null
    isValid: boolean
    touched: boolean
}

// Complete form state
type FormState<T> = {
    [K in keyof T]: FormFieldState<T[K]>
}
```

### Specialized Validation Types

```typescript
// Credit card validation result
type CreditCardValidation = {
    isValid: boolean
    cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'
    error: string | null
}

// CVV validation result
type CVVValidation = {
    isValid: boolean
    error: string | null
}
```

## Validation Utilities

### Generic Validation Functions

```typescript
// Validate any field with rules
validateField<T>(value: T, rules: ValidationRule<T>): ValidationResult

// Validate entire form
validateForm<T>(formData: T, schema: ValidationSchema<T>): { isValid: boolean; errors: Partial<Record<keyof T, string>> }
```

### Specific Field Validators

```typescript
// Name validation (letters and spaces only)
validateName(name: string): ValidationResult

// Credit card validation with Luhn algorithm
validateCreditCard(cardNumber: string): CreditCardValidation

// CVV validation
validateCVV(cvv: string, cardType?: string): CVVValidation

// Email validation
validateEmail(email: string): ValidationResult

// Phone validation
validatePhone(phone: string): ValidationResult

// Password validation (complex requirements)
validatePassword(password: string): ValidationResult
```

## Custom Hooks

### useFormValidation Hook

```typescript
const {
    formState,           // Current form state
    updateField,         // Update field value
    validateFieldValue,  // Validate single field
    validateAllFields,   // Validate all fields
    resetForm,           // Reset form to initial state
    isFormValid,         // Check if entire form is valid
    getFormData,         // Get current form data
    setFieldError        // Manually set field error
} = useFormValidation<T>(initialValues, validationSchema)
```

### useCheckoutForm Hook

Pre-configured hook specifically for checkout forms:

```typescript
const checkoutForm = useCheckoutForm()
// Returns the same interface as useFormValidation but with checkout-specific defaults
```

## Usage Examples

### Basic Form Validation

```typescript
import { useFormValidation } from '../Hooks/useFormValidation'

const MyForm = () => {
    const initialValues = {
        name: '',
        email: ''
    }

    const validationSchema = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
    }

    const {
        formState,
        updateField,
        validateFieldValue,
        isFormValid
    } = useFormValidation(initialValues, validationSchema)

    return (
        <form>
            <input
                value={formState.name.value}
                onChange={(e) => updateField('name', e.target.value)}
                onBlur={() => validateFieldValue('name')}
            />
            {formState.name.touched && !formState.name.isValid && (
                <p className="error">{formState.name.error}</p>
            )}
        </form>
    )
}
```

### Checkout Form Implementation

See `CheckoutModalExample.tsx` for a complete implementation example.

## Key Features

1. **Type Safety**: Full TypeScript support with proper typing
2. **Flexible Rules**: Support for required, length, pattern, and custom validation
3. **Real-time Validation**: Validate on blur or change events
4. **Form State Management**: Track touched, valid, and error states
5. **Credit Card Validation**: Includes Luhn algorithm and card type detection
6. **Reusable**: Generic hooks that work with any form structure
7. **Error Handling**: Comprehensive error messages and validation feedback

## Integration Steps

1. **Import Types**: Import validation types from `GameData.ts`
2. **Use Utilities**: Import validation functions from `validation.ts`
3. **Use Hooks**: Import and use `useFormValidation` or `useCheckoutForm`
4. **Apply Validation**: Add validation rules to your form fields
5. **Handle Errors**: Display validation errors in your UI

## Best Practices

1. **Validate on Blur**: Validate fields when user leaves them
2. **Show Errors**: Display validation errors clearly to users
3. **Prevent Submission**: Disable submit button when form is invalid
4. **Real-time Feedback**: Provide immediate feedback for better UX
5. **Accessibility**: Include proper ARIA labels for screen readers

## Extending the System

To add new validation types:

1. Add new types to `GameData.ts`
2. Create validation functions in `validation.ts`
3. Update validation schemas as needed
4. Use the generic `useFormValidation` hook

The system is designed to be extensible and can handle any form validation requirements you might have.

