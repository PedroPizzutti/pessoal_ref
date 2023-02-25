import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  padding: 10px;
`;

export const Paragrafo = styled.p`
  margin-top: 10px;
`;

export const Divisoria = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkEstilizado = styled(Link)`
  margin-right: 20px;
  background: ${cores.corPrincipal};
  color: #fff;
  padding: 10px;
  border-radius: 4%;
`;
