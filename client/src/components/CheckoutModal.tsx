import { useCart } from '../Hooks/useCart'

export default function CheckoutModal() {
    const { checkoutModal, closeModalCheckout, items } = useCart()
    if (!checkoutModal) return
    console.log(items)
    return (
        <form className='bg-white relative'>
            <div className='flex-row'>
                <h1 className='bg-amber-400'>GameShop.com</h1>
                <h1>Visa</h1>
                <button onClick={closeModalCheckout}>x</button>
            </div>
            <div className='bg-green-600'>
                <label className='bg-blue-500' htmlFor='card'>
                    <input type='number' min='4' max='4' />
                </label>
                <label className='bg-red-500' htmlFor='card'>
                    <input type='number' min='4' max='4' />
                </label>
                <label className='bg-blue-500' htmlFor='card'>
                    <input type='number' min='4' max='4' />
                </label>
                <label className='bg-red-500' htmlFor='card'>
                    <input type='number' min='4' max='4' />
                </label>
            </div>
        </form>
    )
}


//{items.map(item =>
//                 <li key={item.id}>{item.title} {item.price}</li>
//           )}