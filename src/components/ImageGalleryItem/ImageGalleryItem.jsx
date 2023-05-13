import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { largeImageURL, tags, webformatURL } = item;
  return (
    <li
      onClick={e => {
        e.preventDefault();
        onImageClick({ img: largeImageURL, alt: tags });
      }}
    >
      {/* <img
        onClick={() => onImageClick({ img: largeImageURL, alt: tags })}
        src={webformatURL}
        alt={tags}
      /> */}
      <div>
        <img src={webformatURL} alt={tags} loading="lazy" />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
