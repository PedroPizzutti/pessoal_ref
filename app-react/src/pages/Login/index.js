/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Titulo, Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido!');
    }

    if (senha.length < 6 || senha.length > 50) {
      formErrors = true;
      toast.error('Senha inválida!');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, senha, prevPath }));
  }

  return (
    <Container>
      <Titulo>Login</Titulo>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
        />

        <button type="submit">Acessar </button>
      </Form>
    </Container>
  );
}
