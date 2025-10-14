type AddtoCartprops = {
    price: number
    onAddtoCart: () => void
}

export default function AddToCartButton({ price, onAddtoCart }: AddtoCartprops) {
    return (
        <button onClick={onAddtoCart} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 cursor-pointer'>${price} - Add to Cart</button>
    )
}
