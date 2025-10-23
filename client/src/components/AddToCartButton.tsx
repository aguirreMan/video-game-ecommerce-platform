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
        <button onClick={updateCart}
            className='bg-base-buttons text-base-text font-bold py-2 
            hover:shadow-[0_0_20px_#4F46E5]/70 px-4 cursor-pointer rounded-md'>${game.price} - Add to Cart</button>
    )
}