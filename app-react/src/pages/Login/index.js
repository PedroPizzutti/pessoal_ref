/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { Container } from '../../styles/GlobalStyles';
import { Titulo, Form } from './styled';

export default function Login() {
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

    toast.success('Até aqui tudo certo!');
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
