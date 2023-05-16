import propTypes from 'prop-types';
import { Gallery } from './imageGallery.styled';

export default function ImageGallery({ scroll, children }) {
  return <Gallery ref={scroll}>{children}</Gallery>;
}

ImageGallery.propTypes = {
  children: propTypes.node,
};
