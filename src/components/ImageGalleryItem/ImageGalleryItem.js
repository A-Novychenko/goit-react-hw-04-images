import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { tags, webformatURL, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const hendleShowModal = () => setShowModal(prevState => !prevState);

  return (
    <>
      <Item onClick={hendleShowModal}>
        <Img src={webformatURL} alt={tags} />
      </Item>
      {showModal && (
        <Modal onToggleModal={hendleShowModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
