import propTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './imageGalleryItem.styled';

export default function ImageGalleryItem({ data, options }) {
  return data.map(item => {
    return (
      <GalleryItem key={item.id}>
        <GalleryImage
          src={item.webformatURL}
          srcSet={item.largeImageURL}
          alt={item.tags}
          onClick={() => options(item.largeImageURL, item.tags)}
        />
      </GalleryItem>
    );
  });
}

ImageGalleryItem.propTypes = {
  data: propTypes.array,
  options: propTypes.func,
};
