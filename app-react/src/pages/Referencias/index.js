import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Divisoria, LinkEstilizado, Paragrafo, Titulo } from './styled';

export default function Referencias() {
  return (
    <Container>
      <Divisoria>
        <Titulo>Bem-vindo(a) a sua biblioteca pessoal!</Titulo>
      </Divisoria>
      <Divisoria>
        <Paragrafo>O que você gostaria de fazer?</Paragrafo>
      </Divisoria>
      <Divisoria>
        <LinkEstilizado to="/livro">Adicionar um livro</LinkEstilizado>
        <LinkEstilizado to="/artigo">Adicionar um artigo</LinkEstilizado>
        <LinkEstilizado to="/livros">Consultar meus livros</LinkEstilizado>
        <LinkEstilizado to="/artigos">Consultar meus artigos</LinkEstilizado>
      </Divisoria>
    </Container>
  );
}
