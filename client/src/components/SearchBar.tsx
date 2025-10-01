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
            console.log('fetching recipes')
        }
    }

    return (
        <form onSubmit={submitSearch}>
            <section>
                <div>
                    <input id='browse your favorite games' type='search'
                        value={searchedQuery}
                        onChange={handleSearch}
                    />
                </div>
            </section>
        </form>
    )
}
