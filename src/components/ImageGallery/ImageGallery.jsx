import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({
  data,
  handleToggleForImage,
  setModalImage,
}) {
  return (
    <ul className={s.ImageGallery}>
      {data.map(item => (
        <ImageGalleryItem
          imgData={item}
          key={item.id}
          onClickModal={handleToggleForImage}
          setModalImage={setModalImage}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  setModalImage: PropTypes.func.isRequired,
  handleToggleForImage: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
};
