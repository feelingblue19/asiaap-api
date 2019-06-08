'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cabangs', {
      id_cabang: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      nama_cabang: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      alamat_cabang: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cabangs');
  }
};