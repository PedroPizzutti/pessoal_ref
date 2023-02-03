import UsuarioModel from '../models/UsuarioModel';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await UsuarioModel.create(req.body);
      res.json(novoUsuario);
    } catch (e) {
      res.status(400)
        .json({
          erros: e.errors.map((error) => error.message),
        });
    }
  }
}

export default new UsuarioController();
