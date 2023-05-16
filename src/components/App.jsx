import { useReducer, useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import ImageGallery from './ImageGallery'
import ImageGalleryItem from './ImageGalleryItem';
import fetcher from 'services/fetch';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './styles.css';
import { act } from 'react-dom/test-utils';

const initialState = {
  search: '',
  items: [],
  totalItems: 0,
  page: 1,
  spinner: false,
  large: '',
  imageTags: '',
  modal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'set-new-search': {
      const {e} = action.payload
      return {
        ...state,
        search: e,
        page: initialState.page,
        items: initialState.items
      };
    }
    case 'set-images': {
      const { images, totalItems } = action.payload;
      const newImages = [...state.items, ...images];
      return { ...state, items: newImages, totalItems }
    }
    case 'set-next-page': {
      const nextPage = state.page + 1;
      return {
        ...state, page: nextPage
      };
    }
    case 'toogle-spinner':
      return {
        ...state,
        spinner: !state.spinner
      }
    case 'open-large-img':
      const { largeURL, tag } = action.payload;
      return {
        ...state,
        large: largeURL,
        imageTags: tag,
        modal: true
      }
    case 'toggle-modal':
      return {
        ...state,
        modal: !state.modal
      }
    default: return state;
  }
}

export default function App() {
  // const [search, setSearch] = useState('');
  // const [items, setItems] = useState([]);
  // const [totalItems, setTotalItems] = useState(null)
  // const [page, setPage] = useState(1);
  // const [spinner, setSpinner] = useState(false);
  // const [largeImg, setLargeImg] = useState('');
  // const [tags, setTags] = useState('');
  // const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const Gallery = useRef(null);
  const { page, search, spinner, modal, items, totalItems, large, imageTags } = state;
  const prevSearch = useRef(search);
  console.log(state.search);

  const modalClickToggler = () => dispatch({ type: 'toggle-modal' });

  const getLargeImgURL = (largeURL, tag) => {
    dispatch({ type: 'open-large-img', payload: { largeURL, tag } });
  };
  
  const handleButtonCLick = () => {
    if (items.length < totalItems) {
      return dispatch({ type: 'set-next-page' })
    };
  };

  const handleFormSubmit = e => {
    if (e !== prevSearch) {
      dispatch({ type: 'set-new-search', payload: { e } });
    };
  }

    const toScrollDownOnLoad = () => {
      const setHeight = Gallery.current.lastElementChild.clientHeight;
      window.scrollBy({ top: setHeight * 2.43, behavior: 'smooth' });
    };
  
    useEffect(() => {
      if (!search) {
        return;
      };

      dispatch({ type: 'toogle-spinner' });

      fetcher(state.search, page)
        .then(({ hits: images, totalHits: totalItems }) => {
          if (totalItems === 0) {
            window.alert(`No images found by keyword ${search}`)
            return;
          };
          if (page === 1) {
            dispatch({ type: 'set-images', payload: { images, totalItems } });
          } else {
            dispatch({ type: 'set-images', payload: { images, totalItems } });
            toScrollDownOnLoad();
          };
        })
        .catch(error => console.log(error))
        .finally(() => {
          dispatch({ type: 'toogle-spinner' });
        });
    }, [search, page]);

    return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery scroll={Gallery}>
          <ImageGalleryItem data={items} options={getLargeImgURL} />
        </ImageGallery>
        {items.length < totalItems && <Button onClick={handleButtonCLick} />}
        {spinner && <Loader />}
        {modal && <Modal link={large} name={imageTags} onToggle={modalClickToggler} />}
      </>
    );
}