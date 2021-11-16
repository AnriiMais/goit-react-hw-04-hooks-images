import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import Loader from '../Loader';
import Modal from '../Modal';
import { getRequest } from '../services/api';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';

export default function App() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query === '') return;
    // setIsLoading(true);
    getRequest({ query, page })
      .catch(error => setError(error))
      .then(({ hits, total }) => {
        setTotal(total);
        setHits(prev => [...prev, ...hits]);
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [page, hits]);

  const getQueryOnSubmit = inputQuery => {
    if (query === inputQuery) return;
    setQuery(inputQuery);
    setHits([]);
    setPage(1);
    setIsLoading(true);
  };
  const handleToggle = e => {
    setIsActiveModal(prev => !prev);
  };
  const onClickChangePage = () => {
    setIsLoading(true);
    setPage(prev => prev + 1);
  };
  const ModalImageGet = src => {
    setModalImage(src);
  };
  return (
    <div className="App">
      <Searchbar getOnSubmit={getQueryOnSubmit} />
      {error && <h1>{error.message}</h1>}
      {isActiveModal && (
        <Modal onClickToggle={handleToggle} modalImageUrl={modalImage} />
      )}
      {isLoading && <Loader />}
      {hits && hits.length > 0 && (
        <>
          <ImageGallery
            data={hits}
            handleToggleForImage={handleToggle}
            setModalImage={ModalImageGet}
          />
          {hits.length < total && <Button onClickBtn={onClickChangePage} />}
        </>
      )}

      <ToastContainer />
    </div>
  );
}
