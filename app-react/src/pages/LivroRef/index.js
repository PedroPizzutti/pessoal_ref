/* eslint-disable react/jsx-no-bind */
import Clipboard from 'clipboard';
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
  const [citacao, setCitacao] = useState('');
  const [textoCopiar, setTextoCopiar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idLivro) return;

    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get(`/livros/details/${idLivro}`);

        setTitulo(response.data.titulo);
        setAutor(response.data.autor);
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

  function handleCopy() {
    const clipboard = new Clipboard('.copy-button');

    clipboard.on('success', () => {
      toast.success('Texto copiado!');
    });
    clipboard.on('error', () => {
      toast.error('Erro ao copiar texto!');
    });
  }

  return (
    <Container>
      <Titulo>Referência livro</Titulo>
      <Loading isLoading={isLoading} />
      <Form>
        <label htmlFor="titulo">
          Título
          <input readOnly type="text" value={titulo} />
        </label>
        <br />
        <label htmlFor="autor">
          Autor(a)
          <input readOnly type="text" value={autor} />
        </label>
        <label htmlFor="citacao">
          Referência
          <input
            id="textToCopy"
            readOnly
            type="text"
            value={citacao}
            onChange={(e) => setTextoCopiar(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="copy-button"
          data-clipboard-target="#textToCopy"
          data-clipboard-text={textoCopiar}
          onClick={handleCopy}
        >
          Copiar referência
        </button>
      </Form>
    </Container>
  );
}

Livro.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
