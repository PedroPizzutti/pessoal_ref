/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaExclamationCircle, FaEye, FaSearch, FaWindowClose } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import * as cores from '../../config/colors';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import {
  Editar, Excluir, Form,
  Tabela,
  Titulo,
  Visualizar
} from './styled';

export default function Livros() {
  const dispatch = useDispatch();

  const [palavraPesquisa, setPalavraPesquisa] = useState('');
  const [livros, setLivros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {

      try {
        setIsLoading(true);
        const response = await axios.get('/livros');
        setLivros(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const erros = get(error, 'response.data.erros', []);
        toast.error(`Problema ao carregar livros ${erros}`);
      }

    }

    getData();
  }, []);

  function handleAskDelete(e) {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  async function handleDelete(e, id, index) {
    e.persist();
    setIsLoading(true);
    try {
      await axios.delete(`livros/${id}`);
      const listaLivros = [...livros];
      listaLivros.splice(index, 1);
      setLivros(listaLivros);
      toast.success('Livro excluído!');
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.erros', []);

      if (errors.lenght > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
      setIsLoading(false);
    }
  }

  async function handlePesquisar(e) {
    e.preventDefault();

    let params;

    if (palavraPesquisa){
      params = {
        palavra: palavraPesquisa,
       }
    }
    setIsLoading(true);
    const response = await axios.get('/livros/search', {
      params,
    })
    setLivros(response.data);
    setIsLoading(false);
  };

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
            placeholder="Insira uma palavra-chave"
          />
        </label>
        <button type="submit">
          <FaSearch />
        </button>
      </Form>
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
          {livros.map((livro, index) => (
            <tr key={String(livro.id)}>
              <td>{livro.id}</td>
              <td>{livro.ano}</td>
              <td>{livro.autor}</td>
              <td>{livro.titulo}</td>
              <td>
                <Visualizar >
                  <FaEye />
                </Visualizar>
              </td>
              <td>
                <Editar to={`/livro/${livro.id}`}>
                  <FaEdit />
                </Editar>
              </td>
              <td>
                <Excluir onClick={handleAskDelete} to="###">
                  <FaWindowClose />
                </Excluir>

                <FaExclamationCircle display="none" cursor="pointer" color={cores.corAdvertencia} onClick={(e) => handleDelete(e, livro.id, index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Container>
  );
}
