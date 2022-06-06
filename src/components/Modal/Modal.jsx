import styles from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };
  handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      this.props.onClick();
    }
  };

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    return createPortal(
      <div
        className={styles.overlay}
        onKeyPress={this.handleCloseModal}
        onClick={this.handleCloseModal}
      >
        <div className={styles.modal}>
          <img src={this.props.src} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
