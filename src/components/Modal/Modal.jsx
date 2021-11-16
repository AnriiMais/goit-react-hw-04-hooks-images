import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CloseBtn } from '../../images/cross.svg';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClickToggle, modalImageUrl }) {
  const handleKeyPress = e => {
    if (e.code === 'Escape') {
      onClickToggle();
    }
  };
  const handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      onClickToggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return createPortal(
    <div className={s.overlay} onClick={handleClickOverlay}>
      <div className={s.modal}>
        <img src={modalImageUrl} alt="" className={s.modalImage} />
        <button
          type="button"
          className={s.modalBtnClose}
          onClick={onClickToggle}
        >
          <CloseBtn />
        </button>
      </div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  onClickToggle: PropTypes.func.isRequired,
  modalImageUrl: PropTypes.string.isRequired,
};
