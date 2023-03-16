import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaSearch, FaWindowClose } from 'react-icons/fa';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { FiltroPesquisa, Form, Tabela, Titulo } from './styled';

export default function Livros() {
  const [palavraPesquisa, setPalavraPesquisa] = useState('');
  const [filtroTitulo, setfiltroTitulo] = useState(false);
  const [filtroAutor, setfiltroAutor] = useState(false);
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
        <label htmlFor="palavraPesquisa">
          Pesquisar:
          <input
            type="text"
            value={palavraPesquisa}
            onChange={(e) => setPalavraPesquisa(e.target.value)}
            placeholder="Insira o filtro da pesquisa"
          />
        </label>
        <button type="submit" onSubmit={handlePesquisar}>
          <FaSearch />
        </button>
      </Form>
      <FiltroPesquisa>
        <label htmlFor="filtroAutor">
          <input
            type="checkbox"
            value={filtroAutor}
            onChange={(e) => setfiltroAutor(e.target)}
          />
          autor(a)
        </label>
        <label htmlFor="filtroTitulo">
          <input
            type="checkbox"
            value={filtroTitulo}
            onChange={(e) => setfiltroTitulo(e.target)}
          />
          título
        </label>
      </FiltroPesquisa>
      <Tabela>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ano</th>
            <th>Autor(a)</th>
            <th>Título</th>
            <th>
              <FaEye />
            </th>
            <th>
              <FaEdit />
            </th>
            <th>
              <FaWindowClose />
            </th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr>
              <td>{livro.id}</td>
              <td>{livro.ano}</td>
              <td>{livro.autor}</td>
              <td>{livro.titulo}</td>
              <td>
                <FaEye />
              </td>
              <td>
                <FaEdit />
              </td>
              <td>
                <FaWindowClose />
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Container>
  );
}
