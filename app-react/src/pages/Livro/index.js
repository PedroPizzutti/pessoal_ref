import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form, Titulo } from './styled';

export default function Livro({ match }) {
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

  return (
    <Container>
      <Titulo>{idLivro ? 'Editar livro' : 'Novo livro'}</Titulo>
      <Loading isLoading={isLoading} />
      <Form onSubmit="###">
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
        <label htmlFor="localizacao">
          Ano
          <input
            type="text"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </label>
        <label htmlFor="editora">
          Localização
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </label>
        <label htmlFor="citacao">
          Editora
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
          />
        </label>
        <label htmlFor="ano">
          Citação
          <input
            type="text"
            value={citacao}
            onChange={(e) => setCitacao(e.target.value)}
          />
        </label>
      </Form>
    </Container>
  );
}

Livro.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
