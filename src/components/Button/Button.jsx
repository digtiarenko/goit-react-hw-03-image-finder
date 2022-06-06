import styles from './Button.module.css';

function Button({ onClick }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={styles.button}
      type="button"
    >
      {' '}
      Load more{' '}
    </button>
  );
}

export default Button;
