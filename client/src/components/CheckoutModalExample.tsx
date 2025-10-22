import { useCart } from '../Hooks/useCart'
import { useState } from 'react'
import type { ValidationResult, CheckoutFormData, FormState, CreditCardValidation, CVVValidation } from '../types/GameData'
import { useCheckoutForm } from '../Hooks/useFormValidation'
import { validateName, validateCreditCard, validateCVV } from '../utils/validation'

export default function CheckoutModal() {
    const { checkoutModal, closeModalCheckout, items } = useCart()
    const {
        formState,
        updateField,
        validateFieldValue,
        validateAllFields,
        isFormValid,
        getFormData
    } = useCheckoutForm()

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Enhanced name validation
    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        // Only allow letters and spaces, no numbers
        const cleanValue = value.replace(/[^a-zA-Z\s]/g, '')
        updateField('name', cleanValue)
    }

    // Credit card input handlers
    function handleCreditCardChange(part: keyof CheckoutFormData['creditCard'], value: string) {
        // Only allow digits and limit to 4 characters
        const cleanValue = value.replace(/\D/g, '').slice(0, 4)
        updateField('creditCard', {
            ...formState.creditCard.value,
            [part]: cleanValue
        })
    }

    // CVV input handler
    function handleCVVChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value.replace(/\D/g, '').slice(0, 3)
        updateField('cvv', value)
    }

    // Form submission
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        
        const validation = validateAllFields()
        if (!validation.isValid) {
            return
        }

        setIsSubmitting(true)
        
        try {
            const formData = getFormData()
            console.log('Submitting checkout data:', formData)
            
            // Here you would typically send the data to your backend
            // await submitCheckout(formData)
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Close modal and clear cart on success
            closeModalCheckout()
            
        } catch (error) {
            console.error('Checkout failed:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!checkoutModal) return null

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-80 flex items-center justify-center z-50'>
            <form 
                onSubmit={handleSubmit}
                className='h-auto flex-col items-center justify-center
                bg-gray-100 shadow-lg fixed top-5 left-1/2 -translate-x-1/2 
                w-[66%] bg-opacity-50 rounded p-6'
            >
                <div className='flex justify-between w-full mb-4'>
                    <h1 className='text-2xl font-bold'>GameShop.com</h1>
                    <button 
                        type="button"
                        className='cursor-pointer absolute top-2 right-2 text-xl' 
                        onClick={closeModalCheckout}
                    >
                        ×
                    </button>
                </div>

                <div className='mb-4 w-full'>
                    <h2 className='text-lg font-semibold mb-2'>Order Summary</h2>
                    {items.map(item =>
                        <li key={item.id} className='mb-1'>
                            {item.title} - ${item.price}
                        </li>
                    )}
                    
                    <div className='mt-4'>
                        <label htmlFor='name' className='block mb-2 ml-4'>
                            Full Name: <span className='text-red-500'>*</span>
                        </label>
                        <input
                            onChange={handleNameChange}
                            onBlur={() => validateFieldValue('name')}
                            value={formState.name.value}
                            id='name'
                            className={`ml-4 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 mb-2 rounded w-[50%] p-2 ${
                                formState.name.touched && !formState.name.isValid 
                                    ? 'ring-2 ring-red-500' 
                                    : ''
                            }`}
                            type='text'
                            placeholder='Enter your full name'
                        />
                        {formState.name.touched && !formState.name.isValid && (
                            <p className='text-red-500 text-sm ml-4 mb-2'>
                                {formState.name.error}
                            </p>
                        )}
                    </div>
                </div>

                <div className='mb-4'>
                    <label className='block mb-2 ml-4'>
                        Credit Card Number: <span className='text-red-500'>*</span>
                    </label>
                    <div className='flex justify-between w-full mb-2'>
                        {(['part1', 'part2', 'part3', 'part4'] as const).map((part, index) => (
                            <input
                                key={part}
                                onChange={(e) => handleCreditCardChange(part, e.target.value)}
                                onBlur={() => validateFieldValue('creditCard')}
                                value={formState.creditCard.value[part]}
                                type='text'
                                placeholder='XXXX'
                                maxLength={4}
                                className={`appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-4 w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    formState.creditCard.touched && !formState.creditCard.isValid 
                                        ? 'ring-2 ring-red-500' 
                                        : ''
                                }`}
                            />
                        ))}
                    </div>
                    {formState.creditCard.touched && !formState.creditCard.isValid && (
                        <p className='text-red-500 text-sm ml-4 mb-2'>
                            {formState.creditCard.error}
                        </p>
                    )}
                </div>

                <div className='w-full mb-4 flex items-end'>
                    <div className='mr-4'>
                        <label htmlFor='cvv-number' className='block ml-4 mb-2'>
                            CVV: <span className='text-red-500'>*</span>
                        </label>
                        <input 
                            type='text'
                            onChange={handleCVVChange}
                            onBlur={() => validateFieldValue('cvv')}
                            value={formState.cvv.value}
                            placeholder='xxx'
                            maxLength={3}
                            className={`appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                            bg-white border-none focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 rounded 
                            w-20 p-2 ml-4 ${
                                formState.cvv.touched && !formState.cvv.isValid 
                                    ? 'ring-2 ring-red-500' 
                                    : ''
                            }`}
                        />
                        {formState.cvv.touched && !formState.cvv.isValid && (
                            <p className='text-red-500 text-sm ml-4 mt-1'>
                                {formState.cvv.error}
                            </p>
                        )}
                    </div>
                    <button 
                        type='submit'
                        disabled={!isFormValid || isSubmitting}
                        className={`ml-64 cursor-pointer rounded w-40 h-10 text-white font-bold ${
                            isFormValid && !isSubmitting
                                ? 'bg-amber-700 hover:bg-amber-800'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {isSubmitting ? 'Processing...' : 'Pay Now!'}
                    </button>
                </div>
            </form>
        </div>
    )
}

