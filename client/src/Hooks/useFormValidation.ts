import { useState, useCallback } from 'react'
import type { FormState, ValidationSchema, ValidationResult } from '../types/GameData'
import { validateField, validateForm } from '../utils/validation'

export function useFormValidation<T>(
    initialValues: T,
    validationSchema: ValidationSchema<T>
) {
    // Initialize form state
    const initializeFormState = (values: T): FormState<T> => {
        const state = {} as FormState<T>
        for (const key in values) {
            state[key] = {
                value: values[key],
                error: null,
                isValid: true,
                touched: false
            }
        }
        return state
    }

    const [formState, setFormState] = useState<FormState<T>>(() => 
        initializeFormState(initialValues)
    )

    // Update field value
    const updateField = useCallback((field: keyof T, value: T[keyof T]) => {
        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
                touched: true
            }
        }))
    }, [])

    // Validate single field
    const validateFieldValue = useCallback((field: keyof T) => {
        const fieldState = formState[field]
        const rules = validationSchema[field]
        
        if (!rules) return

        const result = validateField(fieldState.value, rules)
        
        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                error: result.hasSuccess ? null : result.message,
                isValid: result.hasSuccess,
                touched: true
            }
        }))

        return result
    }, [formState, validationSchema])

    // Validate all fields
    const validateAllFields = useCallback(() => {
        const formData = {} as T
        for (const key in formState) {
            formData[key] = formState[key].value
        }

        const { isValid, errors } = validateForm(formData, validationSchema)
        
        setFormState(prev => {
            const newState = { ...prev }
            for (const field in errors) {
                newState[field] = {
                    ...newState[field],
                    error: errors[field] || null,
                    isValid: !errors[field],
                    touched: true
                }
            }
            return newState
        })

        return { isValid, errors }
    }, [formState, validationSchema])

    // Reset form
    const resetForm = useCallback(() => {
        setFormState(initializeFormState(initialValues))
    }, [initialValues])

    // Check if form is valid
    const isFormValid = Object.values(formState).every(field => field.isValid)

    // Get form data
    const getFormData = useCallback(() => {
        const data = {} as T
        for (const key in formState) {
            data[key] = formState[key].value
        }
        return data
    }, [formState])

    // Set field error manually
    const setFieldError = useCallback((field: keyof T, error: string | null) => {
        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                error,
                isValid: !error,
                touched: true
            }
        }))
    }, [])

    return {
        formState,
        updateField,
        validateFieldValue,
        validateAllFields,
        resetForm,
        isFormValid,
        getFormData,
        setFieldError
    }
}

// Hook specifically for checkout form
export function useCheckoutForm() {
    const initialValues = {
        name: '',
        creditCard: {
            part1: '',
            part2: '',
            part3: '',
            part4: ''
        },
        cvv: ''
    }

    const validationSchema = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/
        },
        creditCard: {
            required: true,
            custom: (value: typeof initialValues.creditCard) => {
                const fullCardNumber = `${value.part1}${value.part2}${value.part3}${value.part4}`
                if (fullCardNumber.length !== 16) {
                    return {
                        hasSuccess: false,
                        message: 'Credit card must be 16 digits'
                    }
                }
                return { hasSuccess: true, message: '' }
            }
        },
        cvv: {
            required: true,
            custom: (value: string) => {
                if (value.length !== 3) {
                    return {
                        hasSuccess: false,
                        message: 'CVV must be 3 digits'
                    }
                }
                return { hasSuccess: true, message: '' }
            }
        }
    }

    return useFormValidation(initialValues, validationSchema)
}

