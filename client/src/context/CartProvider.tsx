import { type ReactNode } from 'react'
import { CartContext } from './cartcontext';
import { useState } from 'react'

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
}

type CartProviderProps = {
    children: ReactNode
}


export default function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartData[]>([])

    function addToCart(game: CartData) {
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

    const contextValue = { items, addToCart, removeFromCart }

    return (
        <CartContext.Provider value={contextValue} >
            {children}
        </CartContext.Provider>
    )
}
