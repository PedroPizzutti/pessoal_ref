import React from 'react';
import { Switch } from 'react-router-dom';

import Artigo from '../pages/Artigo';
import Artigos from '../pages/Artigos';
import Livro from '../pages/Livro';
import Livros from '../pages/Livros';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Referencias from '../pages/Referencias';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Referencias} isClosed />
      <PrivateRoute exact path="/login" component={Login} isClosed={false} />
      <PrivateRoute
        exact
        path="/register"
        component={Register}
        isClosed={false}
      />
      <PrivateRoute exact path="/livros" component={Livros} isClosed />
      <PrivateRoute exact path="/livro" component={Livro} isClosed />
      <PrivateRoute exact path="/livro/:id" component={Livro} isClosed />
      <PrivateRoute exact path="/artigos" component={Artigos} isClosed />
      <PrivateRoute exact path="/artigo" component={Artigo} isClosed />
      <PrivateRoute exact path="/artigo/:id" component={Artigo} isClosed />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
