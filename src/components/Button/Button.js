import propTypes from 'prop-types';
import { ButtonContainer, LoadButton } from './button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonContainer>
      <LoadButton type="button" onClick={onClick}>
        Load more
      </LoadButton>
    </ButtonContainer>
  );
}

Button.propTypes = {
  onClick: propTypes.func,
};
