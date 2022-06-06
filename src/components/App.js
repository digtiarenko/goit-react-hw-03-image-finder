import React, { Component } from 'react';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

// import PropTypes from 'prop-types';

export class App extends Component {
  static propTypes = {};

  state = {
    result: [],
    page: 1,
    searchQuery: '',
    status: 'idle',
  };

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ result: [] });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const Api = '27492943-191b6e85ce2b26a7ce823ae12';
    this.setState({ status: 'pending' });

    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=24&key=${Api}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.total === 0) {
          return Promise.reject(
            new Error(
              `U've been looking for ${searchQuery}. We don't have such pictures`,
            ),
          );
        } else {
          return this.handleHits(data.hits);
        }
      })
      .catch(error => console.log(error));
  };

  handleHits = hits => {
    const normalizedHits = hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      }),
    );

    this.setState(prevState => ({
      result: [...prevState.result, ...normalizedHits],
      page: prevState.page + 1,
      status: 'resolved',
    }));
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSearchQuery} />
        {this.state.status === 'pending' && <Loader />}
        <ImageGallery pictures={this.state.result} />
        {this.state.result.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;
