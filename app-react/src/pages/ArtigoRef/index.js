/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
import Clipboard from 'clipboard';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, Titulo } from './styled';

export default function ArtigoRef({ match }) {
  const idArtigo = get(match, 'params.id', '');

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [citacao, setCitacao] = useState('');
  const [textoCopiar, setTextoCopiar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idArtigo) return;

    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get(`/artigos/details/${idArtigo}`);

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

    setIsLoading(true);
    const clipboard = new Clipboard('.copy-button');
    clipboard.on('success', () => {
      toast.success('Texto copiado!');
      clipboard.destroy();
      history.push('/livros');
    });
    clipboard.on('error', () => {
      toast.error('Erro ao copiar texto!');
      clipboard.destroy();
    });
    setIsLoading(false);
  }, [idArtigo]);

  return (
    <Container>
      <Titulo>{idArtigo ? 'Editar artigo' : 'Novo artigo'}</Titulo>
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
            id="textoToCopy"
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
        >
          Copiar referência
        </button>
      </Form>
    </Container>
  );
}

ArtigoRef.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
