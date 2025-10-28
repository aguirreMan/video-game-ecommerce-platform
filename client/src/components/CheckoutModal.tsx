import { useCart } from '../Hooks/useCart'
import { useState } from 'react'
import type { SetStringState } from '../types/GameData'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

export default function CheckoutModal() {
    const { checkoutModal, closeModalCheckout, clearCart, items } = useCart()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState('')
    //Validating for credit card slots
    const [creditCardSlot1, setCreditCardSlot1] = useState('')
    const [creditCardSlot2, setCreditCardSlot2] = useState('')
    const [creditCardSlot3, setCreditCardSlot3] = useState('')
    const [creditCardSlot4, setCreditCardSlot4] = useState('')
    //State for the cvv number 
    const [cvv, setCVV] = useState('')
    //Error fields
    const [nameInputError, setNameInputError] = useState<string>('')
    const [cardError, setCardError] = useState<string>('')
    const [cvvError, setcvvError] = useState<string>('')


    function validateNameField(event: React.ChangeEvent<HTMLInputElement>) {
        const validField = event.target.value
        const hasNumber = [...validField].some(char => !isNaN(parseInt(char)))
        if (!hasNumber) {
            setInputValue(validField)
            setNameInputError('')
        } else {
            setNameInputError('Cannot contain numbers')
        }
    }

    function validateCreditCardFields(event: React.ChangeEvent<HTMLInputElement>, setter: SetStringState) {
        const inputLength = 4
        let userInput = event.target.value

        userInput = [...userInput].filter(char => char >= '0' && char <= '9').join('')

        if (userInput.length > inputLength) {
            userInput = userInput.slice(0, inputLength);
        }
        setter(userInput)

        if (userInput.length === inputLength) {
            setCardError('');
        } else if (userInput.length > 0) {
            setCardError('')
        } else {
            setCardError('');
        }
    }

    function validateCVV(event: React.ChangeEvent<HTMLInputElement>) {
        const inputLength = 3
        const userInput = event.target.value
        const digitsOnly = [...userInput].filter(char => char >= '0' && char <= '9').join('')
        const limitOutput = digitsOnly.slice(0, inputLength)

        setCVV(limitOutput)

        if (limitOutput.length !== inputLength) {
            setcvvError('')
        } else {
            setcvvError('')
        }
    }

    function processPayment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let validForm = true

        const isNameValid = inputValue.length > 0
        if (!isNameValid) {
            setNameInputError('Name is required')
            validForm = false
        } else {
            setNameInputError('')
        }

        const isCvvValid = cvv.length === 3
        if (!isCvvValid) {
            setcvvError('CVV must be 3 digits exact')
            validForm = false
        } else {
            setcvvError('')
        }

        const fullCardNumber = creditCardSlot1 + creditCardSlot2 + creditCardSlot3 + creditCardSlot4
        const isCardComplete = fullCardNumber.length === 16

        if (!isCardComplete) {
            setCardError('All card fields must be filled out')
            validForm = false
        } else {
            setCardError('')
        }

        if (validForm) {
            toast.success('Payment successful!', {
                description: 'Your games are on their way enjoy!',
                duration: 4000,
            })

            closeModalCheckout()
            clearCart()
            setInputValue('')
            setCreditCardSlot1('')
            setCreditCardSlot2('')
            setCreditCardSlot3('')
            setCreditCardSlot4('')
            setCVV('')
            // Redirect to home page after successful payment
            navigate('/')
        }
    }

    if (!checkoutModal) return

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='relative bg-gray-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-700'>
                {/* Header */}
                <div className='sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center z-10'>
                    <h1 className='text-2xl font-bold text-white'>Complete Your Purchase</h1>
                    <button
                        onClick={closeModalCheckout}
                        className='text-gray-400 hover:text-white 
                        transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800'
                        aria-label='Close'>
                        ×
                    </button>
                </div>

                <form onSubmit={processPayment} className='p-6 space-y-6'>
                    {/* Order Summary */}
                    <div className='bg-gray-800 rounded-xl p-4 border border-gray-700'>
                        <h2 className='text-lg font-semibold text-white mb-3'>Order Summary</h2>
                        <div className='space-y-2 mb-4'>
                            {items.map(item => (
                                <div key={item.id} className='flex justify-between items-center text-sm'>
                                    <span className='text-gray-300'>{item.title} × {item.quantity}</span>
                                    <span className='text-white font-medium'>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className='border-t border-gray-700 pt-3 mt-3'>
                            <div className='flex justify-between items-center'>
                                <span className='text-lg font-bold text-white'>Total</span>
                                <span className='text-xl font-bold text-blue-400'>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-2'>
                            Cardholder Name
                        </label>
                        <input
                            onChange={validateNameField}
                            value={inputValue}
                            id='name'
                            className='w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                            type='text'
                            placeholder='John Doe'
                        />
                        {nameInputError && (
                            <p className='mt-2 text-red-400 text-sm'>{nameInputError}</p>
                        )}
                    </div>

                    {/* Card Number */}
                    <div>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                            Card Number
                        </label>
                        <div className='flex gap-4 flex-wrap justify-between'>
                            <input
                                onChange={(event) => validateCreditCardFields(event, setCreditCardSlot1)}
                                value={creditCardSlot1}
                                type='number'
                                placeholder='0000'
                                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none bg-gray-800 
                                text-white border border-gray-700 rounded-lg px-4 py-3 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all text-center w-24'
                            />
                            <input
                                onChange={(event) => validateCreditCardFields(event, setCreditCardSlot2)}
                                value={creditCardSlot2}
                                type='number'
                                placeholder='0000'
                                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none bg-gray-800 
                                text-white border border-gray-700 rounded-lg px-4 py-3 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all text-center w-24'
                            />
                            <input
                                onChange={(event) => validateCreditCardFields(event, setCreditCardSlot3)}
                                value={creditCardSlot3}
                                type='number'
                                placeholder='0000'
                                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none bg-gray-800 
                                text-white border border-gray-700 rounded-lg px-4 py-3 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all text-center w-24'
                            />
                            <input
                                onChange={(event) => validateCreditCardFields(event, setCreditCardSlot4)}
                                value={creditCardSlot4}
                                type='number'
                                placeholder='0000'
                                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none bg-gray-800 
                                text-white border border-gray-700 rounded-lg px-4 py-3 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all text-center w-24'
                            />
                        </div>
                        {cardError && (
                            <p className='mt-2 text-red-400 text-sm'>{cardError}</p>
                        )}
                    </div>

                    {/* CVV and Submit */}
                    <div className='flex flex-col sm:flex-row gap-4 items-end'>
                        <div className='flex-1'>
                            <label htmlFor='cvv-number' className='block text-sm font-medium text-gray-300 mb-2'>
                                CVV
                            </label>
                            <input
                                type='number'
                                onChange={validateCVV}
                                value={cvv}
                                placeholder='XXX'
                                className='appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                [&::-webkit-outer-spin-button]:appearance-none 
                                bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                focus:border-transparent transition-all text-center w-20' />

                            {cvvError && (
                                <p className='mt-2 text-red-400 text-sm'>{cvvError}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='w-full sm:w-auto bg-base-purchase text-white font-bold px-8 py-3 rounded-lg 
                                transition-all duration-200 shadow-lg hover:shadow-xl 
                                transform hover:scale-105 active:scale-95 cursor-pointer'>
                                Complete Purchase
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}