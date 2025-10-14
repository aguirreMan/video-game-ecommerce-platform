import { useContext } from 'react'
import { CartContext } from '../context/cartcontext'

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must use a cart provider')
    return context
}