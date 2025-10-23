import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import type { GameData } from '../types/GameData'
import AddToCartButton from '../components/AddToCartButton'
import { Star } from 'lucide-react'

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
        <div className='max-w-5xl mx-auto p-6 flex flex-col gap-12'>
            {/* Game Info + Features */}
            <div className='flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6'>
                {/* Game Image */}
                <img
                    src={game.image}
                    alt={game.title}
                    className='w-full md:w-56 h-auto object-cover rounded-lg'
                />

                {/* Game Info & Features */}
                <div className='flex-1 flex flex-col gap-4'>
                    {/* Title */}
                    <h1 className='text-3xl md:text-4xl font-bold text-blue-950'>{game.title}</h1>

                    {/* Genre & Platform badges */}
                    <div className='flex flex-wrap gap-2 mt-2'>
                        <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold'>
                            {game.genre}
                        </span>
                        {game.platform.map((plat) => (
                            <span
                                key={plat}
                                className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold'
                            >
                                {plat}
                            </span>
                        ))}
                    </div>
                    <p className='text-xl font-bold text-blue-900 mt-2'>${game.price.toFixed(2)}</p>
                    <AddToCartButton game={game} />

                    {/* Game Features / Description */}
                    <div className='mt-6'>
                        <h2 className='text-2xl font-semibold text-blue-900 mb-2'>Game Features</h2>
                        <p>Lorem ipsum dolor sit amet consectetur
                            adipiscing elit. Sit amet consectetur adipiscing
                            elit quisque faucibus ex. Adipiscing elit quisque
                            faucibus ex sapien vitae pellentesque.</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className='flex flex-col gap-6'>
                <h2 className='text-2xl font-bold text-blue-950'>Players Reviews</h2>
                {(!game.reviews || game.reviews.length === 0) ? (
                    <p className='text-gray-500 text-sm'>No reviews yet</p>
                ) : (
                    <ul className='flex flex-col gap-4'>
                        {game.reviews.map((review, index) => (
                            <li
                                key={index}
                                className='bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow'
                            >
                                <div className='flex justify-between items-center mb-2'>
                                    <h3 className='font-semibold text-blue-900'>{review.user}</h3>
                                    <div className='flex gap-1'>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                                size={16}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className='text-gray-700'>{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}