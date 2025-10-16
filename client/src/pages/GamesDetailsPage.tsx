import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import type { GameData } from '../types/GameData'
import AddToCartButton from '../components/AddToCartButton'

export default function GamesDetailsPage() {
    const { gameId } = useParams()
    const [game, setGame] = useState<GameData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!gameId) return

        async function fetchSingleGame() {
            try {
                const response = await fetch(`http://localhost:3000/api/games/${gameId}`)
                if (!response.ok) throw new Error('Failed to fetch game')
                const json: GameData = await response.json()
                setGame(json)
                console.log(json)
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Uknown error ')
            } finally {
                setLoading(false)
            }
        }
        fetchSingleGame()
    }, [gameId])

    if (loading) return <p>Loading game ...</p>
    if (error) return <p>Sorry game could not load</p>
    if (!game) return <p>game was not found</p>

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <div className='flex gap-6'>
                <img src={game.image} alt={game.title} className='w-48 h-auto object-cover' />
                <div>
                    <h1 className='text-3xl font-bold'>{game.title}</h1>
                    <p>{game.genre}</p>
                    <p>{game.platform}</p>
                    <p>{game.price}</p>
                    <AddToCartButton game={game} />
                </div>
            </div>
            <section className='mt-8'>
                <h2>Players Reviews</h2>
                {(!game.reviews || game.reviews.length === 0) ? (
                    <p className='mt-2 text-sm'>No reviews yet</p>
                ) : (
                    <ul>
                        {game.reviews.map((review, index) => (
                            <li key={index} className='border rounded p-4'>
                                <strong>{review.user}</strong> {review.comment} {review.rating}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}