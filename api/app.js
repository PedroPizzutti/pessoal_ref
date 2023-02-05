import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import './src/database';

import homeRoutes from './src/routes/homeRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
import livroRoutes from './src/routes/livroRoutes';
import artigoRoutes from './src/routes/artigoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/usuarios/', usuarioRoutes);
    this.app.use('/livros/', livroRoutes);
    this.app.use('/artigos/', artigoRoutes);
  }
}

export default new App().app;
