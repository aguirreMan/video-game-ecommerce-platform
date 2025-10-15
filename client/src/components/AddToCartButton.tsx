import { useCart } from '../Hooks/useCart'
type AddtoCartprops = {
    game: {
        id: number
        title: string,
        price: number
    }
}

export default function AddToCartButton({ game }: AddtoCartprops) {
    const { addToCart } = useCart()
    function updateCart() {
        addToCart({
            id: game.id,
            title: game.title,
            price: game.price,
            quantity: 1
        })
    }


    return (
        <button onClick={updateCart} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 cursor-pointer'>${game.price} - Add to Cart</button>
    )
}