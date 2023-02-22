import styled, { createGlobalStyle } from 'styled-components';
import * as cores from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: ${cores.corPrincipal};
    color: black;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background: ${cores.corPrincipal};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;

    &:hover {
      background: ${cores.corEscuraPrincipal};
    }
  }

  a {
    text-decoration: none;
    color: ${cores.corPrincipal};

    &:hover {
      color: ${cores.corEscuraPrincipal};
    }
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success{
    background: ${cores.corSucesso};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error{
    background: ${cores.corErro};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--warning{
    background: ${cores.corAdvertencia};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--info{
    background: ${cores.corInformacao};
  }
`;

export const Container = styled.section`
  max-width: 640px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
