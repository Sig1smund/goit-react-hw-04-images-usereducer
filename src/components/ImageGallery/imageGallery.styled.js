import styled from '@emotion/styled';

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
