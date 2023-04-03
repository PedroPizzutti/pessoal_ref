import styled from 'styled-components';

import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const Form = styled.form`
  margin-top: 40px;
  margin-bottom: 20px;

  label {
    width: 50px;
    font-size: 20px;
  }

  input {
    margin-top: 5px;
    margin-bottom: 20px;
    width: 100%;
    margin-left: 10px;
    height: 40px;
    box-shadow: 0 0 1px 0.1px;
    border: 1px solid #ddd;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 4px;

    &:focus {
      border: 2px solid ${cores.corPrincipal};
    }
  }

  button {
    font-size: 16px;
    margin-top: 20px;
    width: 100%;
    margin-left: 10px;
    padding: 0 10px;
    height: 40px;
  }

  svg {
    font-size: 15px;
  }
`;
