'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TipeKendaraans', {
      id_tipe: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      id_merk: {
        allowNull: false,
        type: Sequelize.STRING(20),
        references: {
          model: 'MerkKendaraans',
          key: 'id_merk'
        }
      },
      nama_tipe: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable('TipeKendaraans');
  }
};