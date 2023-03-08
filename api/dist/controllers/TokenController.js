"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UsuarioModel = require('../models/UsuarioModel'); var _UsuarioModel2 = _interopRequireDefault(_UsuarioModel);

class TokenController {
  async store(req, res) {
    const { email = '', senha = '' } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        erros: ['Credenciais inválidas'],
      });
    }

    const usuario = await _UsuarioModel2.default.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({
        erros: ['Usuário inválido!'],
      });
    }

    if (!(await usuario.validaSenha(senha))) {
      return res.status(401).json({
        erros: ['Senha inválida!'],
      });
    }

    const { id } = usuario;

    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(201).json(
      { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } },
    );
  }
}

exports. default = new TokenController();
