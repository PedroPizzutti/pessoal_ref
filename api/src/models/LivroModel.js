import Sequelize, { Model, Op } from 'sequelize';

export default class LivroModel extends Model {
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
        editora: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo editora deve ter entre 3 e 255 caracteres',
            },
          },
        },
        localizacao: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo localização deve ter entre 3 e 255 caracteres',
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
        modelName: 'livros',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.usuarios, { foreignKey: 'id_usuario' });
  }

  static async criaLivro(dadosLivro) {
    const novoLivro = await this.create(dadosLivro);
    return novoLivro;
  }

  static async localizaLivro(idLivro) {
    const livroEncontrado = await this.findByPk(idLivro);
    return livroEncontrado;
  }

  static async buscaLivrosUsuario(idUsuario) {
    const livrosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
      },
      order: ['autor', 'titulo'],
    });

    return livrosEncontrados;
  }

  static async buscaLivrosPorAutorTitulo(idUsuario, autor, titulo) {
    const livrosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        [Op.or]: [
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

    return livrosEncontrados;
  }

  static async buscaLivrosPorAutor(idUsuario, autor) {
    const livrosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        autor: {
          [Op.like]: `%${autor}%`,
        },
      },
      order: ['autor', 'titulo'],
    });

    return livrosEncontrados;
  }

  static async buscaLivrosPorTitulo(idUsuario, titulo) {
    const livrosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
      order: ['autor', 'titulo'],
    });

    return livrosEncontrados;
  }
}
