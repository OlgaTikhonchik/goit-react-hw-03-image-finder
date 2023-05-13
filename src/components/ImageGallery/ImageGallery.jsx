import PropTypes from 'prop-types';
import { Component } from 'react';
import { getImage } from '../../services/api';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    value: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    totalPages: 0,
    isShowModal: false,
    modalData: { img: '', tags: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.value;
    const nextValue = this.props.value;

    if (prevValue !== nextValue || prevState.page !== this.state.page) {
      getImage(nextValue, this.state.page)
        .then(images => {
          this.setState(prevState => ({
            images:
              this.state.page === 1
                ? images.hits
                : [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
            totalPages: Math.floor(images.totalHits / 12),
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (this.state.error) {
      this.setState({ error: null });
    }

    //   getImage(nextValue, this.state.page)
    //     .then(images => {
    //       this.setState(prevState => ({
    //         images:
    //           this.state.page === 1
    //             ? images.hits
    //             : [...prevState.images, ...images.hits],
    //         status: Status.RESOLVED,
    //         totalPages: Math.floor(images.totalHits / 12),
    //       }));
    //     })
    //     .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  setModalData = modalData => {
    this.setState({ modalData, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { images, error, status, page, totalPages, isShowModal, modalData } =
      this.state;
    if (status === 'idle') {
      return <div>Let`s find images together!</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }

    if (images.length === 0) {
      return (
        <ImageErrorView
          message={`Oops... there are no images matching your search... `}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                item={image}
                onImageClick={this.setModalData}
              />
            ))}
          </ul>
          {images.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={this.handleLoadMore}>Load More</Button>
          )}
          {isShowModal && (
            <Modal modalData={modalData} onModalClose={this.handleModalClose} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
