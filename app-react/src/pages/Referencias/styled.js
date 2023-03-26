import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as cores from '../../config/colors';

export const Titulo = styled.h1`
  padding: 10px;
`;

export const Paragrafo = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

export const Divisoria = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkEstilizado = styled(Link)`
  font-size: 18px;
  margin-top: 10px;
  margin-right: 20px;
  background: ${cores.corPrincipal};
  color: #fff;
  padding: 10px;
  border-radius: 4%;
`;
