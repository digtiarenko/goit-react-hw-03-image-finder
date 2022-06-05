import React, { Component } from 'react';
import styles from './SearchBar.module.css';

export class SearchBar extends Component {
  static propTypes = {};
  state = {
    input: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ input: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <header className={styles.searchBar}>
        <form onSubmit={this.handleSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className="material-symbols-outlined">search</span>
          </button>
          <input
            onChange={this.handleChange}
            value={this.state.input}
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus="on"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
