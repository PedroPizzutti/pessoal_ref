import ArtigoModel from '../models/ArtigoModel';

class LivroController {
  async store(req, res) {
    try {
      const artigo = await ArtigoModel.create(req.body);
      res.json(artigo);
    } catch (e) {
      res.status(400)
        .json({
          erros: e.errors?.map((error) => error.message),
        });
    }
  }
}

export default new LivroController();
