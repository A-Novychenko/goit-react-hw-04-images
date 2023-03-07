import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabeel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handlerChange = e => {
    setValue(e.target.value);
  };

  const handlerSubmitForm = e => {
    e.preventDefault();

    const valueNormalize = value.toLowerCase().trim();

    if (valueNormalize !== '') {
      onSubmit(valueNormalize);
    } else {
      toast.error('Enter text please', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          color: 'red',
        },
      });
    }
    setValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handlerSubmitForm}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabeel></SearchFormBtnLabeel>
          <BsSearch size={16} />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          name="keyword"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handlerChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
