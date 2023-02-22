import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BarraRodape } from './styled';

export default function Footer() {
  return (
    <BarraRodape>
      <p>Desenvolvido por Pedro Pizzutti</p>
      <a href="https://www.linkedin.com/in/pedropizzutti/">
        <AiFillLinkedin size={24} />
      </a>
      <a href="https://github.com/PedroPizzutti">
        <AiFillGithub size={24} />
      </a>
    </BarraRodape>
  );
}
