import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ photoSrc, photoAlt, largeSrc }) => {
  const [modal, setModal] = useState(false);

  const onEscBtnClick = evt => {
    if (evt.key === 'Escape') {
      setModal(false);
    }
  };

  const handleItemClic = () => {
    setModal(true);

    window.addEventListener('keydown', onEscBtnClick);
  };

  const handleCloseModal = evt => {
    if (evt.target.className === 'Overlay') {
      setModal(false);
    }
  };

  return (
    <>
      <li onClick={handleItemClic} className="ImageGalleryItem">
        <img src={photoSrc} alt={photoAlt} className="ImageGalleryItem-image" />
      </li>
      {modal && (
        <Modal
          largeSrc={largeSrc}
          handleCloseModal={handleCloseModal}
          escEventUnmount={onEscBtnClick}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  photoSrc: PropTypes.string,
  photoAlt: PropTypes.string,
  largeSrc: PropTypes.string,
};

export default ImageGalleryItem;
