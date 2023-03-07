import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onToggleModal, children }) => {
  useEffect(() => {
    const hendleESC = e => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', hendleESC);

    return () => window.removeEventListener('keydown', hendleESC);
  }, [onToggleModal]);

  const hendleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <>
      <Overlay onClick={hendleBackdrop}>
        <ModalContent>{children}</ModalContent>
      </Overlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};
