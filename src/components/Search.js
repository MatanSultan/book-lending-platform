import React, { useState } from "react";
import "../App.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Perform search as user types
  };

  return (
    <div className="search-container">
      <form className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book..."
          className="search-input"
        />
      </form>
    </div>
  );
};

export default Search;
