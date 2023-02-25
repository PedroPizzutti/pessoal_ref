import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Referencias from '../pages/Referencias';
import Livros from '../pages/Livros';
import Artigos from '../pages/Artigos';
import Livro from '../pages/Livro';
import Artigo from '../pages/Artigo';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Referencias} />
      <PrivateRoute exact path="/login" component={Login} />
      <PrivateRoute exact path="/register" component={Register} />
      <PrivateRoute exact path="/livros" component={Livros} />
      <PrivateRoute exact path="/livro/:id" component={Livro} />
      <PrivateRoute exact path="/artigos" component={Artigos} />
      <PrivateRoute exact path="/artigo/:id" component={Artigo} />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
