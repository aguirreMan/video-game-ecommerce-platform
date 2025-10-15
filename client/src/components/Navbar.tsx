import Select from './Select'
import SearchBar from './SearchBar'
import { type OptionProps } from '../types/GameData'
import { Link } from 'react-router'
import { useCart } from '../Hooks/useCart'

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
    const { items } = useCart()
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)

    const platformOptions: OptionProps[] = [
        { label: 'PS5', value: 'PS5' },
        { label: 'XBOX', value: 'XBOX' },
        { label: 'Nintendo', value: 'Nintendo' }
    ]

    const genreOptions: OptionProps[] = [
        { label: 'Sports', value: 'Sports' },
        { label: 'Action', value: 'Action' },
        { label: 'Friendly', value: 'Friendly' }
    ]

    return (
        <nav className='bg-cyan-300 flex flex-col md:flex-row items-center 
        justify-between p-4 shadow-md'>
            <Link to='/'>
                <h1 className='mt-0 p-4 text-4xl font-extrabold text-blue-950 hover:text-blue-700 transition-colors duration-300 cursor-pointer'>
                    <span className='text-blue-700'>Game</span>Sphere
                </h1>
            </Link>
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
                <Link to='/Checkout' className='relative'>
                    <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
                        Cart Checkout
                        {itemCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-red-600
                             text-white text-xs font-bold rounded-full h-6 w-6 flex 
                             items-center justify-center'>
                                {itemCount}
                            </span>
                        )}
                    </button>
                </Link>
            </div>
        </nav >
    )
}