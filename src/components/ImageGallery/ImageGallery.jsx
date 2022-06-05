import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

import React from 'react';

function ImageGallery({ pictures }) {
  return (
    <ul className={styles.imageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          href={largeImageURL}
          small={webformatURL}
          alt={tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};

export default ImageGallery;
