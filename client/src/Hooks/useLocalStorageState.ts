import { useEffect, useState } from 'react'
import type { GameData } from '../types/GameData'

export default function useLocalStorageState() {
    const CART_KEY: string = 'cart'
    const [cart, setCart] = useState<null | GameData[]>(() => {
        const getCartValue = localStorage.getItem(CART_KEY)
        if (getCartValue) {
            return JSON.parse(getCartValue)
        } else {
            return [] as GameData[]
        }
    })

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
    }, [cart])

    return [cart, setCart] as const
}