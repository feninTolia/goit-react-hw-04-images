import React, { Component } from 'react';
import GalleryView from './GalleryView/GalleryView';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    photosData: null,
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  handleModalData = photosData => {
    this.setState({ photosData });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <GalleryView
          query={this.state.query}
          handleModalData={this.handleModalData}
        />
      </div>
    );
  }
}

export default App;
