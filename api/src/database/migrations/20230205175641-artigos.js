module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artigos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      revista: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      volume: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      paginacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      citacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('artigos');
  },
};
