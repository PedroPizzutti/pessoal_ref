import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form, Tabela, Titulo } from './styled';

export default function Livros() {
  const [filtro, setFiltro] = useState('');
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

  async function handlePesquisar(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Titulo>Livros</Titulo>
      <Form>
        <label htmlFor="filtro">
          Pesquisar:
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Insira o filtro da pesquisa"
          />
        </label>
        <button type="submit" onSubmit={handlePesquisar}>
          <FaSearch size={24} />
        </button>
      </Form>
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
