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

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, senha } = payload;

  try {
    if (id) {
      yield call(axios.put, '/usuarios', {
        email,
        nome,
        senha: senha || undefined,
      });
      toast.success('Dados atualizados!');
      yield put(actions.registerUpdatedSuccess({ nome, email }));
    } else {
      yield call(axios.post, '/usuarios', {
        email,
        nome,
        senha,
      });
      toast.success('Conta criada!');
      yield put(actions.registerCreatedSuccess());
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.erros', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Seu usuário foi atualizado, faça login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido!');
    }
    return yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
