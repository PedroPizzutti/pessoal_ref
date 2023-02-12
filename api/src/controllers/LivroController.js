import LivroModel from '../models/LivroModel';

class LivroController {
  async store(req, res) {
    try {
      const dadosLivro = req.body;
      dadosLivro.id_usuario = req.idUsuario;
      const livroCriado = await LivroModel.criaLivro(dadosLivro);
      res.json(livroCriado);
    } catch (e) {
      res.status(400)
        .json({
          erros: e.errors?.map((error) => error.message),
        });
    }
  }

  async show(req, res) {
    const livro = await LivroModel.localizaLivro(req.params.id);
    return res.json(livro);
  }

  async index(req, res) {
    const livrosEncontrados = await LivroModel.buscaLivrosUsuario(req.idUsuario);
    res.json(livrosEncontrados);
  }

  async filter(req, res) {
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
