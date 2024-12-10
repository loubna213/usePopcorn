
const Header = ({ movies, query, setQuery }) => {
    return (
        <header>
            <nav className='nav-bar'>
                <div className="logo">
                    <span>🍿</span>
                    <h1>usePopcorn</h1>
                </div>
                <input 
                    type="text" 
                    className="search" 
                    placeholder="Search movies..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="num-results">Found {movies.length} results</div>
            </nav>
        </header>
    )
}

export default Header;
