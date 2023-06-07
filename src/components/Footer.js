import React, { useState } from 'react';

const Footer = ({ markers, filterOptions, onFilterChange, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
    onSearch(searchText);
  };

  return (
    <footer>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
      />

      <select onChange={onFilterChange}>
        <option value="">All</option>
        {filterOptions.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </footer>
  );
};

export default Footer;
