import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Titulo, Paragrafo, LinkEstilizado, Divisoria } from './styled';

export default function Referencias() {
  return (
    <Container>
      <Divisoria>
        <Titulo>Bem-vindo(a) a sua biblioteca pessoal!</Titulo>
      </Divisoria>
      <Divisoria>
        <Paragrafo>O que você gostaria de consultar hoje?</Paragrafo>
      </Divisoria>
      <Divisoria>
        <LinkEstilizado to="/livros">Meus livros</LinkEstilizado>
        <LinkEstilizado to="/artigos">Meus artigos</LinkEstilizado>
      </Divisoria>
    </Container>
  );
}
