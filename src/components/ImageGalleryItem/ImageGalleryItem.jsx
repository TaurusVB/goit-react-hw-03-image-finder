import { GalleryItem, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ alt, src, imgModal }) => {
  return (
    <GalleryItem>
      <Img alt={alt} src={src} data-src={imgModal} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  imgModal: PropTypes.string.isRequired,
};
