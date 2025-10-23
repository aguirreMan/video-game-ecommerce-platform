import Select from './Select'
import SearchBar from './SearchBar'
import { type OptionProps } from '../types/GameData'
import { Link } from 'react-router'
import { useCart } from '../Hooks/useCart'
import { ShoppingCart } from 'lucide-react'

type NavbarProps = {
    searchQuery: string
    setSearchQuery: (value: string) => void
    selectedGenre: string
    setSelectedGenre: (value: string) => void
    selectedPlatform: string
    setSelectedPlatform: (value: string) => void
    handleSearchChange: (query: string) => void
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
        <nav className='bg-base-theme w-full p-4 pt-12 md:pt-4 shadow-md relative flex flex-col md:flex-row items-center justify-between gap-2'>
            {/* Logo */}
            <Link to='/' className='flex-shrink-0 mb-2 md:mb-0'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-base-logo cursor-pointer'>
                    <span className='text-base-logo'>Game</span>Shop
                </h1>
            </Link>

            <div className='flex-1 mb-2 md:mb-0 md:mx-4'>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            {/* Selects for responsive design*/}
            <div className='flex items-center gap-2 flex-wrap justify-end mt-2 md:mt-0'>
                <Select
                    value={selectedPlatform}
                    options={platformOptions}
                    onChange={setSelectedPlatform}
                    placeHolder='Platform'
                    className='min-w-[120px]'
                />
                <Select
                    value={selectedGenre}
                    options={genreOptions}
                    onChange={setSelectedGenre}
                    placeHolder='Genre'
                    className='min-w-[120px]'
                />
            </div>
            {/* Made the cart icon to the right corner positioned absolute*/}
            <Link
                to='/Checkout'
                className='absolute top-4 right-4 text-white font-semibold 
                py-2 px-4 flex items-center justify-center gap-2 bg-base-buttons rounded'>
                <ShoppingCart className='w-5 h-5 text-white' />
                {itemCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                        {itemCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}