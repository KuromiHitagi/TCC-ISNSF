import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Pesquisar" }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="navbar__search">
      <input
        type="text"
        placeholder={placeholder}
        className="navbar__search-input"
        value={query}
        onChange={handleChange}
      />
      <button
        aria-label="Pesquisar"
        className="navbar__search-button"
        onClick={() => onSearch(query)}
      >
        🔎
      </button>
    </div>
  );
};

export default SearchBar;
