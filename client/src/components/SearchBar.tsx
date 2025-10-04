import { useState, type ChangeEvent } from 'react'

export default function SearchBar() {

    const [searchedQuery, setSearchedQuery] = useState<string>('')

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value.toLowerCase()
        setSearchedQuery(query)
    }

    function submitSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (searchedQuery.length >= 2) {
            console.log('fetching games')
        }
    }

    return (
        <form onSubmit={submitSearch} className='w-full md:w-auto'>
            <div className='flex w-full max-w-md'>
                <input id='browse your favorite games' type='search'
                    value={searchedQuery}
                    onChange={handleSearch}
                    placeholder='search games'
                    className='w-full rounded-l-lg md:w-64 px-3 py-2 rounded-2-lg border 
                    border-gray-300 focus:outline-none bg-white'
                />
                <button type='submit'
                    className='px-4 py-2 bg-blue-600 text-white 
                    font-semibold rounded-r-lg hover:bg-blue-700 cursor-pointer'>
                    Search
                </button>
            </div>
        </form>
    )
}