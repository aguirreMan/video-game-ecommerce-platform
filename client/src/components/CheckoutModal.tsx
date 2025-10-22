import { useCart } from '../Hooks/useCart'
import { useState } from 'react'
import type { SetStringState } from '../types/GameData'

export default function CheckoutModal() {
    const { checkoutModal, closeModalCheckout, clearCart, items } = useCart()

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
            alert('Thank you for your purchase enjoy your games')
            closeModalCheckout()
            clearCart()
            setInputValue('')
            setCreditCardSlot1('')
            setCreditCardSlot2('')
            setCreditCardSlot3('')
            setCreditCardSlot4('')
            setCVV('')
        }
    }

    if (!checkoutModal) return

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-80 flex items-center justify-center'>
            <form onSubmit={processPayment} className='h-auto flex-col items-center justify-center
         bg-gray-100 shadow-lg fixed top-5 left-1/2 -translate-x-1/2 
         w-[66%] bg-opacity-50 rounded '>
                <div className='flex justify-between w-full mb-4'>
                    <h1 className='text-2xl font-bold'>GameShop.com</h1>
                    <button className='cursor-pointer absolute top-2 right-2' onClick={closeModalCheckout}>x</button>
                </div>
                <div className='mb-4 w-full'>
                    {items.map(item =>
                        <li key={item.id}>{item.title} {item.price}</li>
                    )}
                    <label htmlFor='name' className='block mb-2 ml-4'>Name:</label>
                    <input
                        onChange={validateNameField}
                        value={inputValue}
                        id='name'
                        className='ml-4 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 mb-4 rounded w-[50%] p-2'
                        type='text'
                    />
                    {nameInputError && (
                        <p className='ml-4 text-red-500 text-sm'>{nameInputError}</p>
                    )}
                </div>
                <div className='flex justify-between w-full mb-4'>
                    <input onChange={(event) => validateCreditCardFields(event, setCreditCardSlot1)} value={creditCardSlot1} type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-4 w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <input onChange={(event) => validateCreditCardFields(event, setCreditCardSlot2)} value={creditCardSlot2} type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <input onChange={(event) => validateCreditCardFields(event, setCreditCardSlot3)} value={creditCardSlot3} type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <input onChange={(event) => validateCreditCardFields(event, setCreditCardSlot4)} value={creditCardSlot4} type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mr-4  w-20 p-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>
                {cardError && (
                    <p className='ml-4 text-red-500 text-sm mb-4'>{cardError}</p>
                )}
                <div className='w-full mb-4 flex items-end'>
                    <div className='mr-4'>
                        <label htmlFor='cvv-number' className='block ml-4 mb-2'>CVV</label>
                        <input type='number'
                            onChange={validateCVV}
                            value={cvv}
                            placeholder='xxx'
                            className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                            bg-white border-none focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 rounded 
                            w-20 p-2 ml-4' />
                        {cvvError && (
                            <p className='ml-4 text-red-500 text-sm mt-1'>{cvvError}</p>
                        )}
                    </div>
                    <button type='submit' className='ml-64 cursor-pointer bg-amber-700 rounded w-40 h-10 text-white font-bold'>Pay Now!</button>
                </div>
            </form>
        </div>
    )
}