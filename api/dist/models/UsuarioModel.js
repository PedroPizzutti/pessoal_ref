"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class UsuarioModel extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      senha: {
        type: _sequelize2.default.VIRTUAL,
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
        usuario.senha_hash = await _bcryptjs2.default.hash(usuario.senha, 8);
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
    return _bcryptjs2.default.compare(senha, this.senha_hash);
  }
} exports.default = UsuarioModel;
