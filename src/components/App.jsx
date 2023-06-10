// App.js
import React, { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import styles from './App.module.css';

const API_KEY = '35867216-72ed1ceebea896f77546d0ac6';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      loading: false,
      page: 1,
      largeImageURL: '',
      showModal: false,
      hasMoreImages: true,
      noImagesFound: false,
    };
  }

  handleSearchSubmit = newQuery => {
    this.setState(
      {
        query: newQuery,
        page: 1,
        images: [],
        hasMoreImages: true,
        noImagesFound: false,
      },
      this.fetchImages
    );
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.fetchImages
    );
  };

  handleImageClick = largeImageURL => {
    this.setState({
      largeImageURL,
      showModal: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      largeImageURL: '',
      showModal: false,
    });
  };

  fetchImages = async () => {
    const { query, page } = this.state;

    if (query === '') return;

    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (response.data.hits.length === 0 && page === 1) {
        this.setState({ noImagesFound: true });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          hasMoreImages: response.data.totalHits > page*12,
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, loading, largeImageURL, showModal, hasMoreImages, noImagesFound } =
      this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {noImagesFound ? (
          <p>No images found.</p>
        ) : (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}

        {loading && <Loader />}

        {hasMoreImages && images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

// hasMoreImages: response.data.totalHits > page*12,