/* eslint-disable react/jsx-no-bind */
import { get } from 'lodash';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, Titulo } from './styled';

export default function Register() {
  const id = useSelector((state) => state.auth.usuario.id);
  const nomeStored = useSelector((state) => state.auth.usuario.nome);
  const emailStored = useSelector((state) => state.auth.usuario.email);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [id, emailStored, nomeStored]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Campo "Nome" deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (!id && (senha.length < 6 || senha.length > 50)) {
      formErrors = true;
      toast.error('Campo "Senha" deve ter entre 6 e 50 caracteres.');
    }

    if (!id && senha !== confirmaSenha) {
      formErrors = true;
      toast.error('Campo "Senha" e "Confirma senha" devem ser iguais.');
    }

    if (formErrors) return;

    setIsLoading(true);
    try {
      await axios.post('/usuarios/', {
        nome,
        senha,
        email,
      });
      toast.success('Cadastro realizado com sucesso!');
      setIsLoading(false);
      history.push('/login');
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const erros = get(error, 'response.data.erros', []);
      setIsLoading(false);
      if (status === 400) {
        erros.map((err) => toast.error(err));
      } else {
        toast.error(`Erro não tratado: ${error.message}`);
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Titulo>{id ? 'Editar dados' : 'Crie sua conta!'}</Titulo>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <label htmlFor="sua senha novamente">
          Confirma senha:
          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            placeholder="Sua senha novamente"
          />
        </label>

        <button type="submit">
          {id ? 'Salvar alterações' : 'Criar minha conta'}
        </button>
      </Form>
    </Container>
  );
}
