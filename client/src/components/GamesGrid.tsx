import type { GameData } from '../types/GameData'
import AddToCartButton from './AddToCartButton'

type GamesGridProps = {
    games: GameData[]
}

export default function GamesGrid({ games }: GamesGridProps) {
    if (games.length === 0) {
        return <p>No games found</p>
    }

    return (
        <div className='grid grid-cols-3 gap-4'>
            {games.map(game => (
                <div key={game.id} className="border p-4">
                    <h3>{game.title}</h3>
                    <p>{game.platform.join(', ')}</p>
                    <p>{game.genre}</p>
                    <AddToCartButton
                        price={game.price}
                        onAddtoCart={() => onAddtoCart(game)} />
                </div>
            ))}
        </div>
    )
}