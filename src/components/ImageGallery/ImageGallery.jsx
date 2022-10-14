import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';

const ImageGallery = ({ photos }) => {
  return (
    <div>
      <ul className="ImageGallery">
        {photos.map(el => (
          <ImageGalleryItem
            key={el.id}
            photoSrc={el.webformatURL}
            photoAlt={el.tags}
            largeSrc={el.largeImageURL}
          />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array,
};

export default ImageGallery;
