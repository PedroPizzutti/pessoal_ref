import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const Form = styled.form`
  margin-top: 40px;
  margin-bottom: 30px;

  label {
    width: 50px;
    font-size: 22px;
  }

  input {
    box-sizing: border-box;
    width: calc(100% - 170px);
    margin-left: 10px;
    height: 40px;
    box-shadow: 0 0 1px 0.1px;
    font-size: 16px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
  }

  button {
    width: 40px;
    margin-left: 10px;
    padding: 0 10px;
    height: 40px;
  }
`;

export const Tabela = styled.table`
  width: 100%;
  margin-top: 5px;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid ${cores.corPrincipal};
    align-items: center;
    justify-content: left;
    padding: 15px;
  }

  th {
    font-size: 20px;
  }

  td {
    font-size: 18px;
  }
`;
