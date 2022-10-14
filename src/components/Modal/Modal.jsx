import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ handleCloseModal, escEventUnmount, largeSrc }) => {
  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', escEventUnmount);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleCloseModal} className="Overlay">
        <div className="Modal">
          <img src={largeSrc} alt="cat" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func,
  largeSrc: PropTypes.string,
  escEventUnmount: PropTypes.func,
};

export default Modal;
