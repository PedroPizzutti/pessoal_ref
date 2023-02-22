import React from 'react';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Paragrafo, Titulo } from './styled';

export default function Login() {
  toast.success('Sucesso!!!');
  toast.warn('Aviso!!!');
  toast.error('Erro!!!');
  toast.info('Informação!!!');
  return (
    <Container>
      <Titulo>Login</Titulo>
      <Paragrafo>
        lorem aiofhiosdahgiodsgiohsdio asdhguiasdhguhsdau aisduguisdhagius
        iusahguisduigsd iusadhguisdhgasd
      </Paragrafo>
      <a href="###">Link teste</a>
      <button type="submit">Enviar</button>
    </Container>
  );
}
