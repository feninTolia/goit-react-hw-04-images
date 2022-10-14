import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = evt => {
    this.setState({ query: evt.currentTarget.value });
  };

  handleInputSubmit = evt => {
    evt.preventDefault();

    this.props.onFormSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.handleInputSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="button-label">&#128269;</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputChange}
              value={this.state.query}
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default Searchbar;
