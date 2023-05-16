import propTypes from 'prop-types';

export default async function fetcher(search, page) {
  const KEY = '25175728-94f0f247d27e4ed37775dc2a1';
  const BASE_URL = 'https://pixabay.com/api';
  return await fetch(
    `${BASE_URL}/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No results from searching by keyword ${search}`)
    );
  });
}

fetcher.propTypes = {
  search: propTypes.string,
  page: propTypes.number,
};
