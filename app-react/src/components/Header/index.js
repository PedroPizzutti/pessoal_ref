import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { BarraNavegacao } from './styled';

export default function Header() {
  return (
    <BarraNavegacao>
      <a href="###">
        <FaHome size={24} />
      </a>
      <a href="###">
        <FaUserAlt size={24} />
      </a>
      <a href="###">
        <FaSignInAlt size={24} />
      </a>
    </BarraNavegacao>
  );
}
