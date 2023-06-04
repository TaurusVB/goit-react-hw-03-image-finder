import { ErrorText } from './Error.styled';
import PropTypes from 'prop-types';

export const Error = ({ errorText }) => {
  return <ErrorText>{errorText}</ErrorText>;
};

Error.propTypes = {
  errorText: PropTypes.string,
};
