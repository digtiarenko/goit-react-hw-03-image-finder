import React, { Component } from 'react';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import * as Api from '../Services/Api';

export class App extends Component {
  static propTypes = {};

  state = {
    result: [],
    page: 1,
    searchQuery: '',
    status: 'idle',
    modalUrl: '',
  };

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery, page: 1, result: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ status: 'pending' });

    Api.fetchImages({ searchQuery, page })
      .then(hits => this.handleHits(hits))
      .catch(error => this.handleError(error));
  };

  handleError = error => {
    console.log(error.toString());
    this.setState({ status: 'error' });
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
      status: 'resolved',
      error: null,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = modalSrc => {
    this.setState({
      modalUrl: modalSrc,
    });
  };
  closeModal = () => {
    this.setState({
      modalUrl: '',
    });
  };

  render() {
    const { status, result, modalUrl } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleSearchQuery} />
        {status === 'error' && <h2> There're no such pics in our database</h2>}
        {result.length > 0 && (
          <ImageGallery pictures={result} onClickImg={this.openModal} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <Button onClick={this.handleLoadMore} />}
        {modalUrl && <Modal src={modalUrl} onClick={this.closeModal} />}
      </div>
    );
  }
}

export default App;
