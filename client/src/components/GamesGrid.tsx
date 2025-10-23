import type { GameData } from '../types/GameData'
import AddToCartButton from './AddToCartButton'
import { Link } from 'react-router'

type GamesGridProps = {
    games: GameData[]
}

export default function GamesGrid({ games }: GamesGridProps) {
    if (games.length === 0) {
        return <p className='text-center font-bold'>No games found</p>
    }

    return (
        <div className='grid grid-cols-3 gap-4 bg-gradient-to-b from-[#0F1115] to-[#1A1C23]'>
            {games.map((game) => (
                <Link
                    key={game.id}
                    to={`/GameDetails/${game.id}`}
                    className='border-none p-4 hover:shadow-lg bg-base-grid 
                    rounded-lg m-4 flex flex-col items-center text-center
                    hover:scale-105 '>
                    <h3 className='text-base-text mb-2 font-bold'>{game.title}</h3>
                    <img src={game.image} alt={game.image} />
                    <p className='text-base-text font-bold mt-1'>{game.platform.join(', ')}</p>
                    <p className='text-base-text font-bold mt-1 mb-1'>{game.genre}</p>
                    <AddToCartButton game={game} />
                </Link>
            ))}
        </div>
    )
}