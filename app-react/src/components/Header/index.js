import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BarraNavegacao } from './styled';

export default function Header() {
  return (
    <BarraNavegacao>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/aleluiaa">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/perdião">
        <FaSignInAlt size={24} />
      </Link>
    </BarraNavegacao>
  );
}
