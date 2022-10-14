import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../UI/Loader/Loader';
import Error from '../UI/Error/Error';
import Idle from 'components/Idle/Idle';
import { pixabayFetchAPI } from '../../API/pixabay.service';

const GalleryView = ({ handleModalData, newQuery }) => {
  const [photos, setPhotos] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);

  useEffect(() => {
    handleModalData(photos);
    // eslint-disable-next-line
  }, [photos]);

  useEffect(() => {
    if (query !== newQuery) {
      setPage(1);
      setPhotos([]);
    }

    setQuery(newQuery);
  }, [query, newQuery]);

  useEffect(() => {
    if (query === '') {
      return;
    }

    if (page === 1) {
      setStatus('pending');
    }

    pixabayFetchAPI(query, page)
      .then(newPhotos => {
        setLoadMoreBtn(true);
        if (newPhotos.hits.length < 12) {
          setLoadMoreBtn(false);
        }

        setPhotos(prevPhotos => {
          if (prevPhotos) {
            return [...prevPhotos, ...newPhotos.hits];
          }

          return [...newPhotos.hits];
        });

        setStatus('resolved');
      })
      .catch(newError => {
        setError(newError);
        setStatus('rejected');
      });
  }, [query, page]);

  const handleLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return <Idle />;
  }

  if (status === 'resolved' && photos.length === 0) {
    return <Idle />;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery photos={photos} />
        {loadMoreBtn && photos.length !== 0 && (
          <Button onLoadMoreBtnClick={handleLoadMoreBtnClick}>Load more</Button>
        )}
      </>
    );
  }

  if (status === 'rejected') {
    return <Error />;
  }
};

GalleryView.propTypes = {
  handleModalData: PropTypes.func,
  query: PropTypes.string,
};

export default GalleryView;
