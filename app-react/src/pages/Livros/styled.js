import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const Form = styled.form`
  margin-top: 40px;
  margin-bottom: 0px;

  label {
    width: 50px;
    font-size: 22px;
  }

  input {
    box-sizing: border-box;
    width: calc(100% - 180px);
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
    width: 40px;
    margin-left: 10px;
    padding: 0 10px;
    height: 40px;
  }

  svg {
    font-size: 15px;
  }
`;

export const FiltroPesquisa = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 50px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    font-size: 18px;
    margin-left: 5px;
    margin-right: 10px;

    input {
      box-shadow: 0 0 0.1px 0.1px;
      border: 0.1px solid #ddd;
      transform: scale(1.5);
      margin-right: 10px;
    }
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
