/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Titulo, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Referencias() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

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

    if (senha.length < 6 || senha.length > 50) {
      formErrors = true;
      toast.error('Campo "Senha" deve ter entre 6 e 50 caracteres.');
    }

    if (senha !== confirmaSenha) {
      formErrors = true;
      toast.error('Campo "Senha" e "Confirma senha" devem ser iguais.');
    }

    if (formErrors) return;

    try {
      await axios.post('/usuarios/', {
        nome,
        senha,
        email,
      });
      toast.success('Cadastro realizado com sucesso!');
      history.push('/login');
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const erros = get(error, 'response.data.erros', []);

      if (status === 400) {
        erros.map((err) => toast.error(err));
      } else {
        erros.map((err) => toast.error(`Erro não tratado: ${status} ${err}`));
      }
    }
  }

  return (
    <Container>
      <Titulo>Crie sua conta!</Titulo>
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

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
