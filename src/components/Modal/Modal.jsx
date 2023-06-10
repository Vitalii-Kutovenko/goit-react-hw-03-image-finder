
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, onClose }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.modal}>
      <img src={largeImageURL} alt="" />
    </div>
  </div>
);

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
