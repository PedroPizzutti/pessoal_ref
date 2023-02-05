import LivroModel from '../models/LivroModel';

class LivroController {
  async store(req, res) {
    try {
      const livro = await LivroModel.create(req.body);
      res.json(livro);
    } catch (e) {
      res.status(400)
        .json({
          erros: e.errors.map((error) => error.message),
        });
    }
  }
}

export default new LivroController();
