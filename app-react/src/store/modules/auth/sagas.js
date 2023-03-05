/* eslint-disable no-unused-vars */
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as types from '../types';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    const { email, senha } = payload;
    const response = yield call(axios.post, '/tokens', { email, senha });
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Logado com sucesso!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválidos!');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
