import { useState } from 'react'
import { CartContext } from './cartContext'
import type { ReactNode } from 'react'
import useLocalStorageState from '../Hooks/useLocalStorageState'

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
    incrementQuantity: (id: number) => void
    decrementQuantity: (id: number) => void
    clearCart: () => void
    createModalCheckout: () => void
    closeModalCheckout: () => void
    checkoutModal: boolean
}

type CartProviderProps = {
    children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useLocalStorageState<CartData[]>('cart', [])
    const [checkoutModal, setCheckoutModal] = useState(false)

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

    function incrementQuantity(id: number) {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ))
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

    function createModalCheckout() {
        setCheckoutModal(true)
    }

    function closeModalCheckout() {
        setCheckoutModal(false)
    }

    const contextValue = { items, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, createModalCheckout, checkoutModal, closeModalCheckout }

    return (
        <CartContext.Provider value={contextValue} >
            {children}
        </CartContext.Provider>
    )
}