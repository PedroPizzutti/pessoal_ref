"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class ArtigoModel extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        autor: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo autor(a) deve ter entre 3 e 255 caracteres',
            },
          },
        },
        titulo: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo título deve ter entre 3 e 255 caracteres',
            },
          },
        },
        ano: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 0,
          validate: {
            isInt: {
              msg: 'Campo ano deve ser um número inteiro',
            },
            len: {
              args: [4, 4],
              msg: 'Campo ano deve ter 4 dígitos',
            },
          },
        },
        revista: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo revista deve ter entre 3 e 255 caracteres',
            },
          },
        },
        volume: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 0,
          validate: {
            isInt: {
              msg: 'Campo volume deve ser um número inteiro',
            },
            len: {
              args: [1, 4],
              msg: 'Campo volume deve ter entre 1 e 4 dígitos',
            },
          },
        },
        numero: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 0,
          validate: {
            isInt: {
              msg: 'Campo número deve ser um número inteiro',
            },
          },
        },
        paginacao: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [1, 8],
              msg: 'Campo paginação deve ter entre 1 e 8 caracteres',
            },
          },
        },
        citacao: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [25, 255],
              msg: 'Campo localização deve ter entre 3 e 255 caracteres',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'artigos',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.usuarios, { foreignKey: 'id_usuario' });
  }

  static async criaArtigo(dadosArtigo) {
    const novoArtigo = await this.create(dadosArtigo);
    return novoArtigo;
  }

  static async atualizaArtigo(artigo, dadosArtigo) {
    const artigoAtualizado = await artigo.update(dadosArtigo);
    return artigoAtualizado;
  }

  static async deletaArtigo(artigo) {
    await artigo.destroy();
  }

  static async localizaArtigo(idArtigo) {
    const artigoEncontrado = await this.findByPk(idArtigo);
    return artigoEncontrado;
  }

  static async buscaArtigosUsuario(idUsuario) {
    const artigosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
      },
      order: ['id', 'autor'],
    });
    return artigosEncontrados;
  }

  static async buscaArtigosPorAutorTitulo(idUsuario, autor, titulo) {
    const artigosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        [_sequelize.Op.and]: [
          {
            autor: {
              [_sequelize.Op.like]: `%${autor}%`,
            },
          },
          {
            titulo: {
              [_sequelize.Op.like]: `%${titulo}%`,
            },
          },
        ],
      },
      order: ['autor', 'titulo'],
    });

    return artigosEncontrados;
  }

  static async buscaArtigosPorAutor(idUsuario, autor) {
    const artigosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        autor: {
          [_sequelize.Op.like]: `%${autor}%`,
        },
      },
      order: ['autor', 'titulo'],
    });

    return artigosEncontrados;
  }

  static async buscaArtigosPorTitulo(idUsuario, titulo) {
    const artigosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        titulo: {
          [_sequelize.Op.like]: `%${titulo}%`,
        },
      },
      order: ['autor', 'titulo'],
    });

    return artigosEncontrados;
  }
} exports.default = ArtigoModel;
