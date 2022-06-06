import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

import React from 'react';

function ImageGallery({ pictures, onClickImg }) {
  return (
    <ul className={styles.imageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          href={largeImageURL}
          small={webformatURL}
          alt={tags}
          onClick={onClickImg}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onClickImg: PropTypes.func.isRequired,
  pictures: PropTypes.array.isRequired,
};

export default ImageGallery;
