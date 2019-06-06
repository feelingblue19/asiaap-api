'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spareparts', {
      kode_sparepart: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      penempatan_sparepart: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20)
      },
      tipe_sparepart: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      nama_sparepart: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      harga_jual_sparepart: {
        allowNull: false,
        type: Sequelize.FLOAT(12, 2)
      },
      harga_beli_sparepart: {
        allowNull: false,
        type: Sequelize.FLOAT(12, 2)
      },
      merk_sparepart: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      stok_sparepart: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      min_stok: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gambar_sparepart: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Spareparts');
  }
};