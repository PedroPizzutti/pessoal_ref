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
  Editar, Excluir, FiltroPesquisa,
  Form,
  Tabela,
  Titulo,
  Visualizar
} from './styled';

export default function Artigos() {
  const dispatch = useDispatch();

  const [palavraPesquisa, setPalavraPesquisa] = useState('');
  const [filtroTitulo, setfiltroTitulo] = useState(false);
  const [filtroAutor, setfiltroAutor] = useState(false);
  const [artigos, setArtigos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/artigos');
      setArtigos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  function handleAskDelete(e) {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  }

  async function handleDelete(e, id, index) {
    e.persist();
    setIsLoading(true);
    try {
      await axios.delete(`artigos/${id}`);
      const listaArtigos = [...artigos];
      listaArtigos.splice(index, 1);
      setArtigos(listaArtigos);
      toast.success('Artigo excluído!');
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'reponse.status', 0);
      const errors = get(err, 'reponse.data.erros', []);

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
    const response = await axios.get('/artigos/search', {
      params,
    })
    setArtigos(response.data);
    setIsLoading(false);
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Titulo>Artigos</Titulo>
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
          {artigos.map((artigo, index) => (
            <tr key={String(artigo.id)}>
              <td>{artigo.id}</td>
              <td>{artigo.ano}</td>
              <td>{artigo.autor}</td>
              <td>{artigo.titulo}</td>
              <td>
                <Visualizar to={`/artigo/${artigo.id}`}>
                  <FaEye />
                </Visualizar>
              </td>
              <td>
                <Editar to={`/artigo/${artigo.id}`}>
                  <FaEdit />
                </Editar>
              </td>
              <td>
                <Excluir onClick={handleAskDelete} to="###">
                  <FaWindowClose />
                </Excluir>

                <FaExclamationCircle display="none" cursor="pointer" color={cores.corAdvertencia} onClick={(e) => handleDelete(e, artigo.id, index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Container>
  );
}
