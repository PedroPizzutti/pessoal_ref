"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      erros: ['É preciso estar logado!'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dadosToken = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dadosToken;

    req.idUsuario = id;
    req.emailUsuario = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      erros: ['Token expirado ou inválido'],
    });
  }
};
