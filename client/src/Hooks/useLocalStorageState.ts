import { useEffect, useState } from 'react'

export default function useLocalStorageState<Type>(key: string, initialValue: Type) {
    const [value, setValue] = useState<Type>(() => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as const
}