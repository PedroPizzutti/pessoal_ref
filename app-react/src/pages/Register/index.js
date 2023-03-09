/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form, Titulo } from './styled';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.usuario.id);
  const nomeStored = useSelector((state) => state.auth.usuario.nome);
  const emailStored = useSelector((state) => state.auth.usuario.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

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

    dispatch(actions.registerRequest({ id, nome, email, senha }));
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
