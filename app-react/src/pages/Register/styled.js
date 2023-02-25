import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    font-size: 16px;
    flex-direction: column;
    margin-bottom: 15px;
  }

  input {
    height: 40px;
    margin-top: 5px;
    box-shadow: 0 0 1px 0.1px;
    font-size: 16px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;

    &:focus {
      border: 2px solid ${cores.corPrincipal};
    }
  }
`;
