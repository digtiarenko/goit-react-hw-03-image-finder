import React, { Component } from 'react';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';

// import PropTypes from 'prop-types';

export class App extends Component {
  static propTypes = {};

  state = {
    result: [],
    page: 1,
    searchQuery: '',
    status: 'idle',
  };

  handleFetch = searchQuery => {
    const Api = '27492943-191b6e85ce2b26a7ce823ae12';
    this.setState({ status: 'pending', searchQuery });

    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${this.state.page}&per_page=12&key=${Api}`,
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

    this.setState({ result: normalizedHits, status: 'resolved' });
  };

  handleLoadMore = () => {
    console.log('click');
    this.setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    this.handleFetch(this.state.searchQuery);
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFetch} />
        <ImageGallery pictures={this.state.result} />
        {this.state.result.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;
