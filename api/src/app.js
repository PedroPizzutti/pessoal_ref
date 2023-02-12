import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import './database';

import homeRoutes from './routes/homeRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import livroRoutes from './routes/livroRoutes';
import artigoRoutes from './routes/artigoRoutes';
import tokenRoutes from './routes/tokenRoutes';

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
    this.app.use('/tokens/', tokenRoutes);
  }
}

export default new App().app;
