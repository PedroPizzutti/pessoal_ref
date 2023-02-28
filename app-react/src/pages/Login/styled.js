import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1``;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &:focus {
      border: 2px solid ${cores.corPrincipal};
    }
  }

  button {
    height: 40px;
    font-size: 16px;
  }
`;
