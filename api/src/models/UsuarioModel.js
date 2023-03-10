import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class UsuarioModel extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
      modelName: 'usuarios',
    });

    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        // eslint-disable-next-line no-param-reassign
        usuario.senha_hash = await bcryptjs.hash(usuario.senha, 8);
      }
    });

    return this;
  }

  static async localizaUsuario(idUsuario) {
    const usuario = await this.findByPk(idUsuario);
    return usuario;
  }

  static async criaUsuario(dadosUsuario) {
    const novoUsuario = await this.create(dadosUsuario);
    return novoUsuario;
  }

  static async atualizaUsuario(usuario, dadosUsuario) {
    const usuarioAtualizado = await usuario.update(dadosUsuario);
    return usuarioAtualizado;
  }

  static async deletaUsuario(usuario) {
    await usuario.destroy();
  }

  validaSenha(senha) {
    return bcryptjs.compare(senha, this.senha_hash);
  }
}
