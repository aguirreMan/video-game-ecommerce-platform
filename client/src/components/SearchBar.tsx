import type { ChangeEvent } from 'react'

type SearchBarProps = {
    value: string
    onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value.toLowerCase()
        onChange(query)
    }

    function submitSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        //if (value.length >= 2) {
        //  console.log('fetching games')
        //}
    }

    return (
        <form onSubmit={submitSearch} className='w-full md:w-auto'>
            <div className='flex w-full max-w-md'>
                <input
                    id='browse your favorite games'
                    type='search'
                    value={value}
                    onChange={handleSearch}
                    placeholder='Search games...'
                    className='w-full bg-gray-800 text-white border border-gray-700 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500'
                />
                <button
                    type='submit'
                    className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-lg transition-colors cursor-pointer whitespace-nowrap'>
                    Search
                </button>
            </div>
        </form>
    )
}