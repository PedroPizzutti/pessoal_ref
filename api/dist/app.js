"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
require('./database');

var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _usuarioRoutes = require('./routes/usuarioRoutes'); var _usuarioRoutes2 = _interopRequireDefault(_usuarioRoutes);
var _livroRoutes = require('./routes/livroRoutes'); var _livroRoutes2 = _interopRequireDefault(_livroRoutes);
var _artigoRoutes = require('./routes/artigoRoutes'); var _artigoRoutes2 = _interopRequireDefault(_artigoRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);

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
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/usuarios/', _usuarioRoutes2.default);
    this.app.use('/livros/', _livroRoutes2.default);
    this.app.use('/artigos/', _artigoRoutes2.default);
    this.app.use('/tokens/', _tokenRoutes2.default);
  }
}

exports. default = new App().app;
