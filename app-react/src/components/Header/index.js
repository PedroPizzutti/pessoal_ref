/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FaCircle,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as cores from '../../config/colors';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { BarraNavegacao } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    toast.info('Logoff realizado...');
    history.push('/login');
  }

  return (
    <BarraNavegacao>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/login">
          <FaSignOutAlt size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      <FaCircle size={24} color={isLoggedIn ? cores.corSucesso : cores.corErro}/>
    </BarraNavegacao>
  );
}
