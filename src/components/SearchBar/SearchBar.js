import { useState } from 'react';
import propTypes from 'prop-types';
import {
  HeaderBar,
  SearchForm,
  FormButton,
  FormInput,
} from './searchBar.styled';
import '../styles.css';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setInputValue(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return alert('Keyword is required');
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <HeaderBar>
      <SearchForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <span className="button-label">Search</span>
        </FormButton>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="inputValue"
          value={inputValue}
          onChange={handleInputChange}
        />
      </SearchForm>
    </HeaderBar>
  );
}

SearchBar.propTypes = {
  onSubmit: propTypes.func,
};
