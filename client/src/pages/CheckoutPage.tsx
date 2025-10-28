import CheckoutModal from '../components/CheckoutModal'
import { useCart } from '../Hooks/useCart'

export default function CheckoutPage() {
    const { items, removeFromCart, incrementQuantity, decrementQuantity, clearCart, createModalCheckout } = useCart()

    if (items.length === 0) {
        return (
            <div className='p-8 text-center'>
                <h1 className='text-2xl text-base-text font-bold mb-4'>Your Cart is Empty</h1>
                <p className='text-white'>Add some games to get started!</p>
            </div>
        )
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    function formatPrice(amount: number) {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount)
    }

    return (
        <div className='p-4 sm:p-8'>
            <h1 className='text-2xl text-base-text flex justify-center font-bold mb-6'>Shopping Cart</h1>

            <div className='space-y-6'>
                {items.map(item => (
                    <div key={item.id} className='border-none p-4 flex justify-between items-center'>
                        <div>
                            <h3 className='font-semibold text-base-text text-2xl'>{item.title}</h3>
                            <p className='text-base-text'>
                                ${item.price} x {item.quantity} = {formatPrice(item.price * item.quantity)}
                            </p>
                        </div>
                        <div className='flex flex-row justify-between gap-2 sm:gap-6'>
                            <button
                                onClick={() => incrementQuantity(item.id)} className='rounded-full w-6 h-6 shadow-lg focus:outline-none bg-base-action-buttons cursor-pointer' >
                                +
                            </button>
                            <button
                                onClick={() => decrementQuantity(item.id)} className='rounded-full w-6 h-6 shadow-lg focus:outline-none bg-base-action-buttons cursor-pointer'>
                                -
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className='bg-base-remove-cart text-white text-sm px-2 py-1 rounded cursor-pointer'>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
                <h2 className='text-xl text-base-text font-bold sm:order-1'>Total: {formatPrice(total)}</h2>

                <div className='flex flex-col sm:flex-row gap-3 sm:order-2'>
                    <button
                        onClick={clearCart}
                        className='text-base-text border border-red-600
                         text-sm sm:text-base px-4 py-2 
                         rounded-full transition cursor-pointer'>
                        Clear Cart
                    </button>
                    <button
                        onClick={createModalCheckout}
                        className='bg-base-order-button text-white 
                        font-semibold text-base sm:text-lg px-6 py-3 rounded-full 
                        shadow-lg transition cursor-pointer'>
                        Order Now!
                    </button>
                </div>
                <CheckoutModal />
            </div>
        </div>
    )
}