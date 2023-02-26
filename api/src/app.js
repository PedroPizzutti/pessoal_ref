import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import './database';

import homeRoutes from './routes/homeRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import livroRoutes from './routes/livroRoutes';
import artigoRoutes from './routes/artigoRoutes';
import tokenRoutes from './routes/tokenRoutes';

const accessList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (accessList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
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
