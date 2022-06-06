import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ href, small, alt, onClick }) {
  const handleClick = event => {
    event.preventDefault();
    onClick(href);
  };

  return (
    <li className={styles.imageGalleryItem}>
      <a href={href}>
        <img
          onClick={handleClick}
          src={small}
          alt={alt}
          className={styles.imageGalleryItemImage}
        />
      </a>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  small: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
