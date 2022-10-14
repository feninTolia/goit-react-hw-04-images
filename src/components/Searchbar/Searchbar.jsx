import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = evt => {
    setQuery(evt.currentTarget.value);
  };

  const handleInputSubmit = evt => {
    evt.preventDefault();

    onFormSubmit(query);
    setQuery('');
  };

  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleInputSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">&#128269;</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={query}
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default Searchbar;
