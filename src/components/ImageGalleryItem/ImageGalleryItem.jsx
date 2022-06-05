import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ href, small, alt }) {
  return (
    <li className={styles.imageGalleryItem}>
      <a href={href}>
        <img src={small} alt={alt} className={styles.imageGalleryItemImage} />
      </a>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string,
  href: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
