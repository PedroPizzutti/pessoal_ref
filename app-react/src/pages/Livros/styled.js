import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  font-size: 28px;
`;

export const Tabela = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid ${cores.corPrincipal};
    align-items: center;
    justify-content: left;
    padding: 15px;
  }

  th {
    font-size: 22px;
  }

  td {
    font-size: 18px;
  }
`;
