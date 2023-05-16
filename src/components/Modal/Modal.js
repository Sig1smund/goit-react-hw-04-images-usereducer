import { useEffect } from 'react';
import propTypes from 'prop-types';
import { Overlay, ModalWindow, ModalImg } from './modal.styled';

export default function Modal({ link, name, onToggle }) {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onToggle();
    }
  };

  const onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      onToggle();
    }
  };

  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onToggle();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onToggle]);

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalWindow>
        <ModalImg src={link} alt={name} onClick={onImageClick} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  link: propTypes.string,
  name: propTypes.string,
  onToggle: propTypes.func,
};
