import { createContext } from 'react'
import type { CartContextData } from './CartProvider'

export const CartContext = createContext<CartContextData | undefined>(undefined)