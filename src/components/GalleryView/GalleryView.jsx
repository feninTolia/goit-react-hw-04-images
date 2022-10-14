import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../UI/Loader/Loader';
import Error from '../UI/Error/Error';
import Idle from 'components/Idle/Idle';
import { pixabayFetchAPI } from '../../API/pixabay.service';

export class GalleryView extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    status: 'idle',
    error: null,
    loadMoreBtn: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevState.photos !== this.state.photos) {
      this.props.handleModalData(this.state.photos);
    }

    if (prevProps.query !== this.props.query) {
      this.setState({ query: this.props.query });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending', page: 1, loadMoreBtn: true });

      pixabayFetchAPI(nextQuery, nextPage)
        .then(photos => {
          this.setState({ photos: photos.hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage < nextPage) {
      pixabayFetchAPI(nextQuery, nextPage)
        .then(newPhotos => {
          if (newPhotos.hits.length < 12) {
            this.setState({ loadMoreBtn: false });
          }

          this.setState(prevState => ({
            photos: [...prevState.photos, ...newPhotos.hits],
          }));
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status } = this.state;

    if (status === 'idle') {
      return <Idle />;
    }

    if (status === 'resolved' && this.state.photos.length === 0) {
      return <Idle />;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery
            photos={this.state.photos}
            onFullImgLoad={this.handleFullImgLoad}
          />
          {this.state.loadMoreBtn && this.state.photos.length !== 0 && (
            <Button onLoadMoreBtnClick={this.handleLoadMoreBtnClick}>
              Load more
            </Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <Error />;
    }
  }
}

GalleryView.propTypes = {
  handleModalData: PropTypes.func,
  query: PropTypes.string,
};

export default GalleryView;
