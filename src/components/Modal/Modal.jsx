import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.escEventUnmount);
  }

  render() {
    return (
      <>
        <div onClick={this.props.handleCloseModal} className="Overlay">
          <div className="Modal">
            <img src={this.props.largeSrc} alt="cat" />
          </div>
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  handleCloseModal: PropTypes.func,
  largeSrc: PropTypes.string,
  escEventUnmount: PropTypes.func,
};

export default Modal;
