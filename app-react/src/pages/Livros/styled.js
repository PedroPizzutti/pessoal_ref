import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  label {
    display: flex;
    font-size: 24px;
    flex-direction: column;
    margin-bottom: 5px;
  }

  input {
    height: 40px;
    margin-top: 5px;
    box-shadow: 0 0 1px 0.1px;
    font-size: 16px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
  }

  button {
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
