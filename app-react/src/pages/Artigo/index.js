/* eslint-disable no-plusplus */
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

export default function Artigo({ match }) {
  const dispatch = useDispatch();

  const idArtigo = get(match, 'params.id', '');

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [revista, setRevista] = useState('');
  const [volume, setVolume] = useState('');
  const [numero, setNumero] = useState('');
  const [paginacao, setPaginacao] = useState('');
  const [citacao, setCitacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idArtigo) return;

    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get(`/artigos/details/${idArtigo}`);

        setTitulo(response.data.titulo);
        setAutor(response.data.autor);
        setAno(response.data.ano);
        setRevista(response.data.revista);
        setVolume(response.data.volume);
        setCitacao(response.data.citacao);
        setVolume(response.data.volume);
        setPaginacao(response.data.paginacao);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const erros = get(error, 'response.data.erros', []);
        toast.error(`Problema ao carregar o livro ${erros}`);
      }
    }

    getData();
  }, [idArtigo]);

  function handleCitacao(e) {
    e.preventDefault();

    if (titulo.length > 0) {
      setCitacao('');
      setCitacao(`${titulo} .`);
    }

    let nomeAbrev = '';
    if (autor.length > 0) {
      setCitacao('');
      const namesAutor = autor.split(' ');
      const lastName = `${namesAutor[namesAutor.length - 1].toUpperCase()}, `;

      let initials = '';
      for (let i = 0; i < namesAutor.length - 1; i++) {
        const name = namesAutor[i];
        const initialName = name[0];
        initials = `${initials + initialName.toUpperCase()}. `;
      }
      nomeAbrev = lastName + initials;
      setCitacao(`${nomeAbrev + titulo}`);
    }

    if (ano.length > 0) {
      setCitacao('');
      setCitacao(`${nomeAbrev + titulo}. ${ano}.`);
    }

    if (revista.length > 0) {
      setCitacao('');
      setCitacao(`${nomeAbrev + titulo}. ${revista}, ${ano}.`);
    }

    if (volume.length > 0) {
      setCitacao('');
      setCitacao(`${nomeAbrev + titulo}. ${revista}, v.${volume}, ${ano}.`);
    }

    if (numero.length > 0) {
      setCitacao('');
      setCitacao(
        `${nomeAbrev + titulo}. ${revista}, v.${volume}, n.${numero}, ${ano}.`
      );
    }

    if (paginacao.length > 0) {
      setCitacao('');
      setCitacao(
        `${
          nomeAbrev + titulo
        }. ${revista}, v.${volume}, n.${numero}, p.${paginacao},  ${ano}.`
      );
    }
  }

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

    if (revista.length < 3 || revista.length > 255) {
      toast.error('Campo "Revista" deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isInt(String(volume))) {
      toast.error('Campo "Volume" deve ser um número inteiro');
      formErrors = true;
    }

    if (volume.length < 1 || volume.length > 4) {
      toast.error('Campo "Volume" deve ter entre 1 e 4 caracteres');
      formErrors = true;
    }

    if (!isInt(String(numero))) {
      toast.error('Campo "Número" deve ser um número inteiro');
      formErrors = true;
    }

    if (paginacao.length < 1 || paginacao.length > 8) {
      toast.error('Campo "Paginação" deve ter entre 1 e 8 caracteres');
      formErrors = true;
    }

    if (citacao.length < 25 || citacao.length > 255) {
      toast.error('Campo "Referência" deve ter entre 25 e 255 caracteres');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (idArtigo) {
        await axios.put(`/artigos/${idArtigo}`, {
          autor,
          titulo,
          ano,
          revista,
          volume,
          numero,
          paginacao,
          citacao,
        });
        toast.success('Artigo atualizado!');
      } else {
        await axios.post(`/artigos/`, {
          autor,
          titulo,
          ano,
          revista,
          volume,
          numero,
          paginacao,
          citacao,
        });
        toast.success('Artigo criado!');
      }
      history.push('/artigos');
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
      <Titulo>{idArtigo ? 'Editar artigo' : 'Novo artigo'}</Titulo>
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <label htmlFor="titulo">
          Título
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onBlur={handleCitacao}
          />
        </label>
        <br />
        <label htmlFor="autor">
          Autor(a)
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            onBlur={handleCitacao}
          />
        </label>
        <label htmlFor="ano">
          Ano
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            onBlur={handleCitacao}
          />
        </label>
        <label htmlFor="revista">
          Revista
          <input
            type="text"
            value={revista}
            onChange={(e) => setRevista(e.target.value)}
            onBlur={handleCitacao}
          />
        </label>
        <label htmlFor="volume">
          Volume
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            onBlur={handleCitacao}
          />
        </label>
        <label htmlFor="numero">
          Numero
          <input
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            onBlur={handleCitacao}
          />
        </label>
        <label htmlFor="paginacao">
          Paginação
          <input
            type="text"
            value={paginacao}
            onChange={(e) => setPaginacao(e.target.value)}
            onBlur={handleCitacao}
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

Artigo.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
