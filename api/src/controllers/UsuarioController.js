import UsuarioModel from '../models/UsuarioModel';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await UsuarioModel.criaUsuario(req.body);
      const { id, nome, email } = novoUsuario;
      return res.status(201).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        erros: e.errors?.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const usuario = await UsuarioModel.localizaUsuario(req.idUsuario);

      if (!usuario) {
        return res.status(400).json({
          erros: ['Usuário não encontrado...'],
        });
      }

      const usuarioAtualizado = await UsuarioModel.atualizaUsuario(usuario, req.body);

      const { id, nome, email } = usuarioAtualizado;

      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        erros: e.errors?.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await UsuarioModel.localizaUsuario(req.idUsuario);

      if (!usuario) {
        return res.status(400).json({
          erros: ['Usuário não encontrado...'],
        });
      }

      UsuarioModel.deletaUsuario(usuario);

      return res.status(204).json(null);
    } catch (e) {
      return res.status(400).json({
        erros: e.errors?.map((err) => err.message),
      });
    }
  }
}

export default new UsuarioController();
