import useFetchGameData from '../Hooks/useFetchGameData'
import GamesGrid from '../components/GamesGrid'

type ProductsPageProps = {
    searchQuery: string
    selectedGenre: string
    selectedPlatform: string
}

export default function ProductsPage({
    searchQuery,
    selectedGenre,
    selectedPlatform
}: ProductsPageProps) {
    const { data: games, loading, error } = useFetchGameData()

    if (loading) return <p>Loading games...</p>
    if (error) return <p>Error: {error}</p>
    if (!games) return <p>No games found</p>

    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesPlatform = !selectedPlatform || game.platform.includes(selectedPlatform)
        const matchesGenre = !selectedGenre || game.genre === selectedGenre
        return matchesSearch && matchesPlatform && matchesGenre
    })

    return <GamesGrid games={filteredGames} />
}