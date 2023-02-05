import Sequelize, { Model } from 'sequelize';

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
    this.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
  }
}
