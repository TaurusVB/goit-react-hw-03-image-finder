import { InfinitySpin } from 'react-loader-spinner';
import { SpinnerContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <SpinnerContainer>
      <InfinitySpin />
    </SpinnerContainer>
  );
};
