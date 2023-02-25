import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Titulo, Form } from './styled';

export default function Referencias() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  return (
    <Container>
      <Titulo>Crie sua conta!</Titulo>
      <Form>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Exemplo: Joao da Silva"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Exemplo: E-mail@.com"
          />
        </label>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Exemplo: aOyihgf987@"
          />
        </label>

        <label htmlFor="confirmaSenha">
          Confirma senha:
          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            placeholder="Exemplo: aOyihgf987@"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
