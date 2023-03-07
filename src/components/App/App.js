import { useState, useEffect } from 'react';
import { GlobalStyle } from 'constants/GlobalStyles';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import {
  EndCollection,
  ErrorDescr,
  ErrorTitle,
  ImageGallery,
} from 'components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { fetchImage } from 'services/pixabayAPI';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';

export const App = () => {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (keyword === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const {
          data: { hits, total, totalHits },
        } = await fetchImage(keyword, page);

        if (!total || !hits) {
          return await Promise.reject(new Error(`"${keyword}" NOT FOUND !`));
        }

        setImages(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [keyword, page]);

  const hendleSubmit = value => {
    setPage(1);
    setImages([]);
    setKeyword(value);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={hendleSubmit}></Searchbar>
      <ImageGallery images={images} />

      {!isLoading && !error && images.length < totalHits && (
        <Button onCLick={loadMore} />
      )}

      {isLoading && <Loader />}

      {!isLoading && images.length > 0 && images.length >= totalHits && (
        <EndCollection>There are no more images for this query.</EndCollection>
      )}

      {error && (
        <>
          <ErrorTitle>Oops, something went wrong, please try again.</ErrorTitle>
          <ErrorDescr>{`ERROR: ${error.message}`}</ErrorDescr>
        </>
      )}

      <GlobalStyle />
      <ToastContainer />
    </Container>
  );
};
