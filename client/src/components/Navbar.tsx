import Select from './Select'
import SearchBar from './SearchBar'
import { type OptionProps } from '../types/GameData'
import { useState } from 'react'

export default function Navbar() {
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

    const [selectPlatform, setSelectedPlatform] = useState<string>('')
    const [selectGenre, setSelectedGenre] = useState<string>('')


    return (
        <nav className='bg-cyan-300 flex flex-col md:flex-row items-center 
        justify-between p-4 shadow-md'>
            <h1 className='mt-0 p-4 text-4xl font-extrabold text-blue-950 hover:text-blue-700 transition-colors duration-300 cursor-pointer'>
                <span className='text-blue-700'>Game</span>Sphere
            </h1>
            <div className='flex flex-row md:flex-row items-center gap-4 md:mt-0'>
                <SearchBar />
                <Select
                    value={selectPlatform}
                    options={platformOptions}
                    onChange={setSelectedPlatform}
                    placeHolder='browse by platform'
                />
                <Select
                    value={selectGenre}
                    options={genreOptions}
                    onChange={setSelectedGenre}
                    placeHolder='browse by genre'
                />
            </div>
        </nav>
    )
}