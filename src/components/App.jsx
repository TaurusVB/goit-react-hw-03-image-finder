import { Section } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Error } from './Error/Error';
import * as API from '../api/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: STATUS.IDLE,
    error: null,
    page: 1,
    isModalOpen: false,
    modalImgSrc: '',
    totalHits: null,
    per_page: 12,
  };

  componentDidMount() {}

  componentDidUpdate = async (_, prevState) => {
    const prevSearch = prevState.searchQuery;
    const prevPage = prevState.page;
    const { searchQuery, page, per_page } = this.state;

    if (prevSearch !== searchQuery || prevPage !== page) {
      this.setState({ status: STATUS.PENDING });

      try {
        const response = await API.getImages({ searchQuery, page, per_page });
        const { hits, totalHits } = response.data;
        await this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],
          totalHits: totalHits,
        }));
        await this.setState({ status: STATUS.RESOLVED });
      } catch (error) {
        await this.setState({ error: error.message, status: STATUS.REJECTED });
      }
    }
  };

  handleSubmit = async searchQuery => {
    await this.setState({
      searchQuery,
      images: [],
      page: 1,
      error: null,
      status: STATUS.PENDING,
    });
  };

  handleMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: STATUS.PENDING,
    }));
  };

  onModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  onModalOpen = ({ target, currentTarget }) => {
    if (target !== currentTarget) {
      this.setState({ isModalOpen: true, modalImgSrc: target.dataset.src });
    }
  };

  render() {
    const {
      images,
      status,
      isModalOpen,
      modalImgSrc,
      totalHits,
      error,
      page,
      per_page,
    } = this.state;

    return (
      <Section>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onClick={this.onModalOpen} />
        {isModalOpen && (
          <Modal imgSrc={modalImgSrc} onClose={this.onModalClose} />
        )}
        {status === STATUS.PENDING && <Loader />}
        {totalHits / per_page > page && status === STATUS.RESOLVED && (
          <Button onClick={this.handleMoreBtn}></Button>
        )}
        {totalHits === 0 && (
          <Error errorText={'Sorry, nothing has been found at your request'} />
        )}

        {error && (
          <Error
            errorText={`Something went wrong... ${error}. Please try again.`}
          />
        )}
      </Section>
    );
  }
}
