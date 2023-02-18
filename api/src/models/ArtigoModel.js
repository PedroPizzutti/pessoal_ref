import Sequelize, { Model, Op } from 'sequelize';

export default class ArtigoModel extends Model {
  static init(sequelize) {
    super.init(
      {
        autor: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo autor(a) deve ter entre 3 e 255 caracteres',
            },
          },
        },
        titulo: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo título deve ter entre 3 e 255 caracteres',
            },
          },
        },
        ano: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo revista deve ter entre 3 e 255 caracteres',
            },
          },
        },
        volume: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            isInt: {
              msg: 'Campo número deve ser um número inteiro',
            },
          },
        },
        paginacao: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [1, 8],
              msg: 'Campo paginação deve ter entre 1 e 8 caracteres',
            },
          },
        },
        citacao: {
          type: Sequelize.STRING,
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
        [Op.and]: [
          {
            autor: {
              [Op.like]: `%${autor}%`,
            },
          },
          {
            titulo: {
              [Op.like]: `%${titulo}%`,
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
          [Op.like]: `%${autor}%`,
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
          [Op.like]: `%${titulo}%`,
        },
      },
      order: ['autor', 'titulo'],
    });

    return artigosEncontrados;
  }
}
