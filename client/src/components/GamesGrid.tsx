import type { GameData } from '../types/GameData'
import AddToCartButton from './AddToCartButton'
import { Link } from 'react-router'

type GamesGridProps = {
    games: GameData[]
}

export default function GamesGrid({ games }: GamesGridProps) {
    if (games.length === 0) {
        return <p>No games found</p>
    }

    return (
        <div className='grid grid-cols-3 gap-4'>
            {games.map((game) => (
                <Link
                    key={game.id}
                    to={`/GameDetails/${game.id}`}
                    className="border p-4 block hover:shadow-lg"
                >
                    <h3>{game.title}</h3>
                    <p>{game.platform.join(', ')}</p>
                    <p>{game.genre}</p>
                    <AddToCartButton game={game} />
                </Link>
            ))}
        </div>
    )
}