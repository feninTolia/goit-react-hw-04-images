import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };

  onEscBtnClick = evt => {
    if (evt.key === 'Escape') {
      this.setState({ modal: false });
    }
  };

  handleItemClic = () => {
    this.setState({ modal: true });

    window.addEventListener('keydown', this.onEscBtnClick);
  };

  handleCloseModal = evt => {
    if (evt.target.className === 'Overlay') {
      this.setState({ modal: false });
    }
  };

  render() {
    const { photoSrc, photoAlt, largeSrc } = this.props;

    return (
      <>
        <li onClick={this.handleItemClic} className="ImageGalleryItem">
          <img
            src={photoSrc}
            alt={photoAlt}
            className="ImageGalleryItem-image"
          />
        </li>
        {this.state.modal && (
          <Modal
            largeSrc={largeSrc}
            handleCloseModal={this.handleCloseModal}
            escEventUnmount={this.onEscBtnClick}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  photoSrc: PropTypes.string,
  photoAlt: PropTypes.string,
  largeSrc: PropTypes.string,
};

export default ImageGalleryItem;
