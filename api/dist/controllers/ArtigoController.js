"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* eslint-disable max-len */
var _ArtigoModel = require('../models/ArtigoModel'); var _ArtigoModel2 = _interopRequireDefault(_ArtigoModel);

class LivroController {
  async store(req, res) {
    try {
      const dadosArtigo = req.body;
      dadosArtigo.id_usuario = req.idUsuario;
      const artigoCriado = await _ArtigoModel2.default.criaArtigo(dadosArtigo);
      return res.status(201).json(artigoCriado);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _ => _.errors, 'optionalAccess', _2 => _2.map, 'call', _3 => _3((erro) => erro.message)]),
        });
    }
  }

  async update(req, res) {
    try {
      const idArtigo = req.params.id;

      if (!idArtigo) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const artigo = await _ArtigoModel2.default.localizaArtigo(idArtigo);

      if (!artigo) {
        return res.status(400).json({
          erros: ['Artigo não encontrado...'],
        });
      }

      const artigoAtualizado = await _ArtigoModel2.default.atualizaArtigo(artigo, req.body);

      return res.json(artigoAtualizado);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _4 => _4.errors, 'optionalAccess', _5 => _5.map, 'call', _6 => _6((erro) => erro.message)]),
        });
    }
  }

  async delete(req, res) {
    try {
      const idArtigo = req.params.id;

      if (!idArtigo) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const artigo = await _ArtigoModel2.default.localizaArtigo(idArtigo);

      if (!artigo) {
        return res.status(400).json({
          erros: ['Artigo não encontrado...'],
        });
      }

      await _ArtigoModel2.default.deletaArtigo(artigo);

      return res.status(204).json(null);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _7 => _7.errors, 'optionalAccess', _8 => _8.map, 'call', _9 => _9((erro) => erro.message)]),
        });
    }
  }

  async index(req, res) {
    const artigosEncontrados = await _ArtigoModel2.default.buscaArtigosUsuario(req.idUsuario);
    return res.json(artigosEncontrados);
  }

  async show(req, res) {
    try {
      const idArtigo = req.params.id;

      if (!idArtigo) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const artigo = await _ArtigoModel2.default.localizaArtigo(idArtigo);

      if (!artigo) {
        return res.status(400).json({
          erros: ['Artigo não encontrado...'],
        });
      }

      return res.json(artigo);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _10 => _10.errors, 'optionalAccess', _11 => _11.map, 'call', _12 => _12((erro) => erro.message)]),
        });
    }
  }

  async filter(req, res) {
    try {
      const { autor, titulo, palavra } = req.query;

      let artigosEncontrados;

      if (autor && titulo) {
        artigosEncontrados = await _ArtigoModel2.default.buscaArtigosPorAutorTitulo(req.idUsuario, autor, titulo);
      } else if (autor && !titulo) {
        artigosEncontrados = await _ArtigoModel2.default.buscaArtigosPorAutor(req.idUsuario, autor);
      } else if (!autor && titulo) {
        artigosEncontrados = await _ArtigoModel2.default.buscaArtigosPorTitulo(req.idUsuario, titulo);
      } else if ((!(autor || titulo)) && palavra) {
        artigosEncontrados = await _ArtigoModel2.default.buscaArtigosPorPalavra(req.idUsuario, palavra);
      } else {
        artigosEncontrados = await _ArtigoModel2.default.buscaArtigosUsuario(req.idUsuario);
      }

      return res.json(artigosEncontrados);
    } catch (e) {
      return res.status(400)
        .json({
          erros: _optionalChain([e, 'access', _13 => _13.errors, 'optionalAccess', _14 => _14.map, 'call', _15 => _15((erro) => erro.message)]),
        });
    }
  }
}

exports. default = new LivroController();
