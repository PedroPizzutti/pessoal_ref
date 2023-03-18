"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class LivroModel extends _sequelize.Model {
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
        editora: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo editora deve ter entre 3 e 255 caracteres',
            },
          },
        },
        localizacao: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo localização deve ter entre 3 e 255 caracteres',
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

  static async atualizaLivro(livro, dadosLivro) {
    const livroAtualizado = await livro.update(dadosLivro);
    return livroAtualizado;
  }

  static async deletaLivro(livro) {
    await livro.destroy();
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

    return livrosEncontrados;
  }

  static async buscaLivrosPorAutor(idUsuario, autor) {
    const livrosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        autor: {
          [_sequelize.Op.like]: `%${autor}%`,
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
          [_sequelize.Op.like]: `%${titulo}%`,
        },
      },
      order: ['autor', 'titulo'],
    });

    return livrosEncontrados;
  }

  static async buscaLivrosPorPalavra(idUsuario, palavra) {
    const livrosEncontrados = await this.findAll({
      attributes: ['id', 'autor', 'titulo', 'ano'],
      where: {
        id_usuario: idUsuario,
        [_sequelize.Op.or]: [
          {
            ano: {
              [_sequelize.Op.like]: `%${palavra}%`,
            },
          },
          {
            autor: {
              [_sequelize.Op.like]: `%${palavra}%`,
            },
          },
          {
            titulo: {
              [_sequelize.Op.like]: `%${palavra}%`,
            },
          },
        ],
      },
    });

    return livrosEncontrados;
  }
} exports.default = LivroModel;
