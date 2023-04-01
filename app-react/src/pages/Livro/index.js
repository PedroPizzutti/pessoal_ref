/* eslint-disable react/jsx-no-bind */
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isInt } from 'validator';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form, Titulo } from './styled';

export default function Livro({ match }) {
  const dispatch = useDispatch();

  const idLivro = get(match, 'params.id', '');

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [editora, setEditora] = useState('');
  const [citacao, setCitacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idLivro) return;

    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get(`/livros/details/${idLivro}`);

        setTitulo(response.data.titulo);
        setAutor(response.data.autor);
        setAno(response.data.ano);
        setLocalizacao(response.data.localizacao);
        setEditora(response.data.editora);
        setCitacao(response.data.citacao);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const erros = get(error, 'response.data.erros', []);
        toast.error(`Problema ao carregar o livro ${erros}`);
      }
    }

    getData();
  }, [idLivro]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (autor.length < 3 || autor.length > 255) {
      toast.error('Campo "Autor(a)" deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (titulo.length < 3 || titulo.length > 255) {
      toast.error('Campo "Título" deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isInt(String(ano))) {
      toast.error('Campo "Ano" deve ser um número inteiro');
      formErrors = true;
    }

    if (localizacao.length < 3 || localizacao.length > 255) {
      toast.error(
        'Campo "Localização da publicação" deve ter entre 3 e 255 caracteres'
      );
      formErrors = true;
    }

    if (editora.length < 3 || editora.length > 255) {
      toast.error('Campo "Editora" deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (citacao.length < 25 || citacao.length > 255) {
      toast.error('Campo "Referência" deve ter entre 25 e 255 caracteres');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (idLivro) {
        await axios.put(`/livros/${idLivro}`, {
          autor,
          titulo,
          ano,
          localizacao,
          editora,
          citacao,
        });
        toast.success('Livro atualizado!');
      } else {
        await axios.post(`/livros/`, {
          autor,
          titulo,
          ano,
          localizacao,
          editora,
          citacao,
        });
        toast.success('Livro criado!');
      }
      history.push('/livros');
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.erros', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      setIsLoading(false);
      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Titulo>{idLivro ? 'Editar livro' : 'Novo livro'}</Titulo>
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <label htmlFor="titulo">
          Título
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="autor">
          Autor(a)
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </label>
        <label htmlFor="ano">
          Ano
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </label>
        <label htmlFor="localizacao">
          Localização da publicação
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </label>
        <label htmlFor="editora">
          Editora
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
          />
        </label>
        <label htmlFor="citacao">
          Referência
          <input
            type="text"
            value={citacao}
            onChange={(e) => setCitacao(e.target.value)}
          />
        </label>
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

Livro.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
