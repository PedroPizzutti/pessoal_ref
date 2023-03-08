import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UsuarioModel';

class TokenController {
  async store(req, res) {
    const { email = '', senha = '' } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        erros: ['Credenciais inválidas'],
      });
    }

    const usuario = await UsuarioModel.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({
        erros: ['Usuário inválido!'],
      });
    }

    if (!(await usuario.validaSenha(senha))) {
      return res.status(401).json({
        erros: ['Senha inválida!'],
      });
    }

    const { id } = usuario;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(201).json(
      { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } },
    );
  }
}

export default new TokenController();
