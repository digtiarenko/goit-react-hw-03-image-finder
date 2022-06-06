import { Audio } from 'react-loader-spinner';
import styles from './Loader.module.css';

import React from 'react';

function Loader() {
  return (
    <div className={styles.loader}>
      <Audio height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
