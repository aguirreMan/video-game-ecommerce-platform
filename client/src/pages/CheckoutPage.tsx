import CheckoutModal from '../components/CheckoutModal'
import { useCart } from '../Hooks/useCart'

export default function CheckoutPage() {
    const { items, removeFromCart, incrementQuantity, decrementQuantity, clearCart, createModalCheckout } = useCart()

    if (items.length === 0) {
        return (
            <div className='p-8 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Your Cart is Empty</h1>
                <p>Add some games to get started!</p>
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
        <div className='p-8'>
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
                        <div className='flex flex-row justify-between gap-12'>
                            <button
                                onClick={() => incrementQuantity(item.id)} className='rounded-full w-12 h-12 shadow-lg focus:outline-none bg-amber-300 cursor-pointer' >
                                +
                            </button>
                            <button
                                onClick={() => decrementQuantity(item.id)} className='rounded-full w-12 h-12 shadow-lg focus:outline-none bg-amber-300 cursor-pointer'>
                                -
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer'>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='ml-8 text-left'>
                <button className='bg-red-700' onClick={() => clearCart()}>Clear Cart</button>
            </div>

            <div className='mt-8 text-right'>
                <h2 className='text-xl font-bold'>Total: {formatPrice(total)}</h2>
            </div>
            <div>
                <button onClick={createModalCheckout} className='rounded bg-amber-500 font-bold cursor-pointer'>Order Now!</button>
                <CheckoutModal />
            </div>
        </div>
    )
}