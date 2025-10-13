import Select from './Select'
import SearchBar from './SearchBar'
import { type OptionProps } from '../types/GameData'

type NavbarProps = {
    searchQuery: string
    setSearchQuery: (value: string) => void
    selectedGenre: string
    setSelectedGenre: (value: string) => void
    selectedPlatform: string
    setSelectedPlatform: (value: string) => void
}

export default function Navbar({
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedPlatform,
    setSelectedPlatform
}: NavbarProps) {
    const platformOptions: OptionProps[] = [
        { label: 'PS5', value: 'PS5' },
        { label: 'XBOX', value: 'XBOX' },
        { label: 'Nintendo', value: 'Nintendo' }
    ]

    const genreOptions: OptionProps[] = [
        { label: 'Sports', value: 'sports' },
        { label: 'Action', value: 'action' },
        { label: 'Family', value: 'family' }
    ]

    return (
        <nav className='bg-cyan-300 flex flex-col md:flex-row items-center 
        justify-between p-4 shadow-md'>
            <h1 className='mt-0 p-4 text-4xl font-extrabold text-blue-950 hover:text-blue-700 transition-colors duration-300 cursor-pointer'>
                <span className='text-blue-700'>Game</span>Sphere
            </h1>
            <div className='flex flex-row md:flex-row items-center gap-4 md:mt-0'>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <Select
                    value={selectedPlatform}
                    options={platformOptions}
                    onChange={setSelectedPlatform}
                    placeHolder='Platform games'
                />
                <Select
                    value={selectedGenre}
                    options={genreOptions}
                    onChange={setSelectedGenre}
                    placeHolder='Genres'
                />
            </div>
        </nav>
    )
}