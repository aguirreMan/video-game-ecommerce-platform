import { useCart } from '../Hooks/useCart'
import { useState } from 'react'


type Validation = {
    hasSucess: boolean
    message: string
}

export default function CheckoutModal() {
    const { checkoutModal, closeModalCheckout, items } = useCart()
    const [inputValue, setInputValue] = useState('')

    function validateNameField(event: React.ChangeEvent<HTMLInputElement>) {
        const validField = event.target.value
        const hasNumber = [...validField].some(char => !isNaN(parseInt(char)))
        if (!hasNumber) {
            setInputValue(validField)
        }
    }

    if (!checkoutModal) return

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-80 flex items-center justify-center'>
            <form className='h-auto flex-col items-center justify-center
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
                </div>
                <div className='flex justify-between w-full mb-4'>
                    <input type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ml-4 w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <input type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <input type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-20 p-2 mr-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    <input type='number' placeholder='XXXX' className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none mr-4  w-20 p-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>
                <div className='w-full mb-4 flex items-end'>
                    <div className='mr-4'>
                        <label htmlFor='cvv-number' className='block ml-4 mb-2'>CVV</label>
                        <input type='number'
                            placeholder='xxx'
                            className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
                            bg-white border-none focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 rounded 
                            w-20 p-2 ml-4' />
                    </div>
                    <button className='ml-64 cursor-pointer bg-amber-700 rounded w-40 h-10 text-white font-bold'>Pay Now!</button>
                </div>
            </form>
        </div>
    )
}


