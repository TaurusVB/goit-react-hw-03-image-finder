import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageGalleryList onClick={onClick}>
      {images.map(img => (
        <ImageGalleryItem
          alt={img.tags}
          src={img.webformatURL}
          key={img.id}
          imgModal={img.largeImageURL}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
