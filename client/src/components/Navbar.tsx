import SearchBar from './SearchBar'

export default function Navbar() {
    return (
        <nav>
            <h1><span>Game</span>Sphere</h1>
            <div className='search-bar'>
                <SearchBar />
            </div>
        </nav>
    )
}
