//This hook will fetch the game object 
import { useState, useEffect } from 'react'
import type { GameData } from '../types/GameData'

export default function useFetchGameData() {
    const [data, setData] = useState<null | GameData[]>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:3000/api/games")
                if (!res.ok) throw new Error("Failed to fetch games")
                const json: GameData[] = await res.json()
                setData(json)
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'A unknown error occured')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return { data, loading, error }
}