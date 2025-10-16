import { useCart } from '../Hooks/useCart'

export default function CheckoutPage() {
    const { items, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className='p-8 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Your Cart is Empty</h1>
                <p>Add some games to get started!</p>
            </div>
        )
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>Shopping Cart</h1>

            <div className='space-y-4'>
                {items.map(item => (
                    <div key={item.id} className='border p-4 flex justify-between items-center'>
                        <div>
                            <h3 className='font-semibold'>{item.title}</h3>
                            <p className='text-gray-600'>
                                ${item.price} x {item.quantity} = ${item.price * item.quantity}
                            </p>
                        </div>
                        <button
                            onClick={() => incrementQuantity(item.id)} className='bg-amber-400 cursor-pointer' >
                            Increment
                        </button>
                        <button
                            onClick={() => decrementQuantity(item.id)} className='bg-amber-800 cursor-pointer'>
                            Decrement
                        </button>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className='ml-8 text-left'>
                <button className='bg-red-700' onClick={() => clearCart()}>Clear Cart</button>
            </div>

            <div className='mt-8 text-right'>
                <h2 className='text-xl font-bold'>Total: ${total.toFixed(2)}</h2>
            </div>
        </div>
    )
}