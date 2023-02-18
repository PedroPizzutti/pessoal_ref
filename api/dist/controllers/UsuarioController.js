"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _UsuarioModel = require('../models/UsuarioModel'); var _UsuarioModel2 = _interopRequireDefault(_UsuarioModel);

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await _UsuarioModel2.default.criaUsuario(req.body);
      const { id, nome, email } = novoUsuario;
      res.status(201).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        erros: _optionalChain([e, 'access', _ => _.errors, 'optionalAccess', _2 => _2.map, 'call', _3 => _3((err) => err.message)]),
      });
    }
  }

  async update(req, res) {
    try {
      const usuario = await _UsuarioModel2.default.localizaUsuario(req.idUsuario);

      if (!usuario) {
        return res.status(400).json({
          erros: ['Usuário não encontrado...'],
        });
      }

      const usuarioAtualizado = await _UsuarioModel2.default.atualizaUsuario(usuario, req.body);

      const { id, nome, email } = usuarioAtualizado;

      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        erros: _optionalChain([e, 'access', _4 => _4.errors, 'optionalAccess', _5 => _5.map, 'call', _6 => _6((err) => err.message)]),
      });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await _UsuarioModel2.default.localizaUsuario(req.idUsuario);

      if (!usuario) {
        return res.status(400).json({
          erros: ['Usuário não encontrado...'],
        });
      }

      _UsuarioModel2.default.deletaUsuario(usuario);

      return res.status(200).json(null);
    } catch (e) {
      return res.status(400).json({
        erros: _optionalChain([e, 'access', _7 => _7.errors, 'optionalAccess', _8 => _8.map, 'call', _9 => _9((err) => err.message)]),
      });
    }
  }
}

exports. default = new UsuarioController();
