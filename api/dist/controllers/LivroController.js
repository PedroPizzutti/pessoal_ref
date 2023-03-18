"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* eslint-disable max-len */
var _LivroModel = require('../models/LivroModel'); var _LivroModel2 = _interopRequireDefault(_LivroModel);

class LivroController {
  async store(req, res) {
    try {
      const dadosLivro = req.body;
      dadosLivro.id_usuario = req.idUsuario;
      const livroCriado = await _LivroModel2.default.criaLivro(dadosLivro);
      res.status(201).json(livroCriado);
    } catch (e) {
      res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _ => _.errors, 'optionalAccess', _2 => _2.map, 'call', _3 => _3((error) => error.message)]),
        });
    }
  }

  async update(req, res) {
    try {
      const idLivro = req.params.id;

      if (!idLivro) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const livro = await _LivroModel2.default.localizaLivro(idLivro);

      if (!livro) {
        return res.status(400).json({
          erros: ['Livro não encontrado...'],
        });
      }

      const livroAtualizado = await _LivroModel2.default.atualizaLivro(livro, req.body);

      return res.json(livroAtualizado);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _4 => _4.errors, 'optionalAccess', _5 => _5.map, 'call', _6 => _6((erro) => erro.message)]),
        });
    }
  }

  async delete(req, res) {
    try {
      const idLivro = req.params.id;

      if (!idLivro) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const livro = await _LivroModel2.default.localizaLivro(idLivro);

      if (!livro) {
        return res.status(400).json({
          erros: ['Livro não encontrado...'],
        });
      }

      _LivroModel2.default.deletaLivro(livro);

      return res.status(204).json(null);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _7 => _7.errors, 'optionalAccess', _8 => _8.map, 'call', _9 => _9((erro) => erro.message)]),
        });
    }
  }

  async index(req, res) {
    const livrosEncontrados = await _LivroModel2.default.buscaLivrosUsuario(req.idUsuario);
    res.json(livrosEncontrados);
  }

  async show(req, res) {
    try {
      const idLivro = req.params.id;

      if (!idLivro) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const livro = await _LivroModel2.default.localizaLivro(idLivro);

      if (!livro) {
        return res.status(400).json({
          erros: ['Livro não encontrado...'],
        });
      }

      return res.json(livro);
    } catch (e) {
      return res.status(400).json({
        errors: _optionalChain([e, 'access', _10 => _10.errors, 'optionalAccess', _11 => _11.map, 'call', _12 => _12((erro) => erro.message)]),
      });
    }
  }

  async filter(req, res) {
    try {
      const { autor, titulo, palavra } = req.query;

      let livrosEncontrados;

      if (autor && titulo) {
        livrosEncontrados = await _LivroModel2.default.buscaLivrosPorAutorTitulo(req.idUsuario, autor, titulo);
      } else if (autor && !titulo) {
        livrosEncontrados = await _LivroModel2.default.buscaLivrosPorAutor(req.idUsuario, autor);
      } else if (!autor && titulo) {
        livrosEncontrados = await _LivroModel2.default.buscaLivrosPorTitulo(req.idUsuario, titulo);
      } else if ((!(autor || titulo)) && palavra) {
        livrosEncontrados = await _LivroModel2.default.buscaLivrosPorPalavra(req.idUsuario, palavra);
      } else {
        livrosEncontrados = await _LivroModel2.default.buscaLivrosUsuario(req.idUsuario);
      }
      return res.json(livrosEncontrados);
    } catch (e) {
      return res.status(400).json({
        errors: _optionalChain([e, 'access', _13 => _13.errors, 'optionalAccess', _14 => _14.map, 'call', _15 => _15((erro) => erro.message)]),
      });
    }
  }
}

exports. default = new LivroController();
