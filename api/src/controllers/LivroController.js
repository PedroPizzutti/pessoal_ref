import LivroModel from '../models/LivroModel';

class LivroController {
  async store(req, res) {
    try {
      const dadosLivro = req.body;
      dadosLivro.id_usuario = req.idUsuario;
      const livroCriado = await LivroModel.criaLivro(dadosLivro);
      res.status(201).json(livroCriado);
    } catch (e) {
      res.status(400)
        .json({
          erros: e.errors?.map((error) => error.message),
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

      const livro = await LivroModel.localizaLivro(idLivro);

      if (!livro) {
        return res.status(400).json({
          erros: ['Livro não encontrado...'],
        });
      }

      const livroAtualizado = await LivroModel.atualizaLivro(livro, req.body);

      return res.json(livroAtualizado);
    } catch (e) {
      return res.status(400)
        .json({
          erros: e.errors?.map((erro) => erro.message),
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

      const livro = await LivroModel.localizaLivro(idLivro);

      if (!livro) {
        return res.status(400).json({
          erros: ['Livro não encontrado...'],
        });
      }

      LivroModel.deletaLivro(livro);

      return res.json(null);
    } catch (e) {
      return res.status(400)
        .json({
          erros: e.errors?.map((erro) => erro.message),
        });
    }
  }

  async index(req, res) {
    const livrosEncontrados = await LivroModel.buscaLivrosUsuario(req.idUsuario);
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

      const livro = await LivroModel.localizaLivro(idLivro);

      if (!livro) {
        return res.status(400).json({
          erros: ['Livro não encontrado...'],
        });
      }

      return res.json(livro);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors?.map((erro) => erro.message),
      });
    }
  }

  async filter(req, res) {
    try {
      const { autor, titulo } = req.query;

      let livrosEncontrados;

      if (autor && titulo) {
        livrosEncontrados = await LivroModel.buscaLivrosPorAutorTitulo(req.idUsuario, autor, titulo);
      } else if (autor && !titulo) {
        livrosEncontrados = await LivroModel.buscaLivrosPorAutor(req.idUsuario, autor);
      } else if (!autor && titulo) {
        livrosEncontrados = await LivroModel.buscaLivrosPorTitulo(req.idUsuario, titulo);
      } else {
        livrosEncontrados = await LivroModel.buscaLivrosUsuario(req.idUsuario);
      }
      res.json(livrosEncontrados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors?.map((erro) => erro.message),
      });
    }
  }
}

export default new LivroController();
