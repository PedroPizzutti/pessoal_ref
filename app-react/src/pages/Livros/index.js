import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Tabela, Titulo } from './styled';

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/livros');
      setLivros(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Titulo>Livros</Titulo>
      <Tabela>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ano</th>
            <th>Autor</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr>
              <td>{livro.id}</td>
              <td>{livro.ano}</td>
              <td>{livro.autor}</td>
              <td>{livro.titulo}</td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Container>
  );
}
