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
    const livros = await LivroModel.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano', 'localizacao', 'editora', 'citacao'],
      where: {
        id_usuario: req.idUsuario,
      },
      order: ['autor', 'titulo'],
    });

    res.json(livros);
  }
}

export default new LivroController();
