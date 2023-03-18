/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaSearch, FaWindowClose } from 'react-icons/fa';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import {
  Deletar,
  Editar,
  FiltroPesquisa,
  Form,
  Tabela,
  Titulo,
  Visualizar
} from './styled';

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

    let params;

    if (!(filtroAutor || filtroTitulo) && palavraPesquisa){
      params = {
        palavra: palavraPesquisa,
       }
    }

    if (filtroAutor && filtroTitulo) {
      params = {
        autor: palavraPesquisa,
        titulo: palavraPesquisa,
       }
    };

    if (filtroAutor) {
      params = {
        autor: palavraPesquisa,
       }
    };

    if (filtroTitulo) {
      params = {
        titulo: palavraPesquisa,
       }
    };

    setIsLoading(true);
    const response = await axios.get('/livros/search', {
      params,
    })
    setLivros(response.data);
    setIsLoading(false);
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Titulo>Livros</Titulo>
      <Form onSubmit={handlePesquisar}>
        <label htmlFor="palavraPesquisa">
          Pesquisar:
          <input
            type="text"
            value={palavraPesquisa}
            onChange={(e) => setPalavraPesquisa(e.target.value)}
            placeholder="Insira o filtro da pesquisa"
          />
        </label>
        <button type="submit">
          <FaSearch />
        </button>
      </Form>
      <FiltroPesquisa>
        <label htmlFor="filtroAutor">
          <input
            type="checkbox"
            value={filtroAutor}
            onChange={(e) =>  setfiltroAutor(e.target.checked)}
          />
          autor(a)
        </label>
        <label htmlFor="filtroTitulo">
          <input
            type="checkbox"
            value={filtroTitulo}
            onChange={(e) => setfiltroTitulo(e.target.checked)}
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
            <tr key={String(livro.id)}>
              <td>{livro.id}</td>
              <td>{livro.ano}</td>
              <td>{livro.autor}</td>
              <td>{livro.titulo}</td>
              <td>
                <Visualizar to="\##">
                  <FaEye />
                </Visualizar>
              </td>
              <td>
                <Editar to="\##">
                  <FaEdit />
                </Editar>
              </td>
              <td>
                <Deletar to="\##">
                  <FaWindowClose />
                </Deletar>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Container>
  );
}
