import { CartContext } from './cartContext'
import { useState, type ReactNode } from 'react'

type CartData = {
    id: number
    title: string
    price: number
    quantity: number
}

export type CartContextData = {
    items: CartData[]
    addToCart: (game: CartData) => void
    removeFromCart: (id: number) => void
    decrementQuantity: (id: number) => void
    clearCart: () => void
}

type CartProviderProps = {
    children: ReactNode
}


export default function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartData[]>([])

    function addToCart(game: CartData) {
        console.log('Adding to cart:', game)
        const existingItem = items.find(item => item.id === game.id)
        if (existingItem) {
            setItems(items.map(item =>
                item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
            ))
        } else {
            setItems([...items, { ...game, quantity: 1 }])
        }
    }

    function removeFromCart(id: number) {
        setItems(items.filter(item => item.id !== id))
    }

    function decrementQuantity(id: number) {
        setItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }
                }
            }
            return item
        }))
    }


    function clearCart() {
        setItems([])
    }

    const contextValue = { items, addToCart, removeFromCart, decrementQuantity, clearCart }

    return (
        <CartContext.Provider value={contextValue} >
            {children}
        </CartContext.Provider>
    )
}
