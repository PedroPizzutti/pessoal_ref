import LivroModel from '../models/LivroModel';

class LivroController {
  async store(req, res) {
    try {
      const livro = req.body;
      livro.id_usuario = req.idUsuario;
      const livroCriado = await LivroModel.create(livro);
      res.json(livroCriado);
    } catch (e) {
      res.status(400)
        .json({
          erros: e.errors?.map((error) => error.message),
        });
    }
  }

  async index(req, res) {
    const livrosEncontrados = await LivroModel.buscaLivrosUsuario(req.idUsuario);
    res.json(livrosEncontrados);
  }

  async show(req, res) {
    const { autor, titulo } = req.query;
    let livrosEncontrados;

    if (autor && titulo) {
      livrosEncontrados = await LivroModel.buscaLivrosPorAutorTitulo(req.idUsuario, autor, titulo);
    } else if (autor && !titulo) {
      livrosEncontrados = await LivroModel.buscaLivrosPorAutor(req.idUsuario, autor);
    } else if (!autor && titulo) {
      livrosEncontrados = await LivroModel.buscaLivrosPorTitulo(req.idUsuario, titulo);
    }

    res.json(livrosEncontrados);
  }
}

export default new LivroController();
