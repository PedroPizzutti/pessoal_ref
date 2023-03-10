import styled from 'styled-components';
import * as cores from '../../config/colors';

export const BarraNavegacao = styled.nav`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 20px 0 0;
    font-weight: bold;

    &:hover {
      color: ${cores.corEscuraPrincipal};
    }
  }
`;
