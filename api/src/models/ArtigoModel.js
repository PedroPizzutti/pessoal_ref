import Sequelize, { Model } from 'sequelize';

export default class ArtigoModel extends Model {
  static init(sequelize) {
    super.init({
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
    }, {
      sequelize,
      nomeModel: 'artigos',
    });
    return this;
  }
}
