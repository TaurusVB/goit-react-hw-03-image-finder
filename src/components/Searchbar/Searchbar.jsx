import { Formik } from 'formik';
import {
  SearchForm,
  Input,
  Label,
  SearchButton,
  SearchBar,
  SearchIcon,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubit = async (values, actions) => {
    await onSubmit(values.search);
    actions.resetForm();
  };
  return (
    <Formik initialValues={{ search: '' }} onSubmit={handleSubit}>
      <SearchBar>
        <SearchForm>
          <SearchButton type="submit">
            <SearchIcon />
          </SearchButton>
          <Label htmlFor="search"></Label>
          <Input
            id="search"
            type="text"
            name="search"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
          ></Input>
        </SearchForm>
      </SearchBar>
    </Formik>
  );
};
