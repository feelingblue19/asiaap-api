'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pegawais', {
      id_pegawai: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(20)
      },
      id_cabang: {
        allowNull: false,
        type: Sequelize.STRING(20),
        references: {
          model: 'cabangs',
          key: 'id_cabang'
        }
      },
      nama_pegawai: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      alamat_pegawai: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      no_telp_pegawai: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      gaji_per_minggu: {
        allowNull: false,
        type: Sequelize.FLOAT(12, 2)
      },
      jabatan_pegawai: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      username: {
        unique: true,
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(255)
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
    return queryInterface.dropTable('Pegawais');
  }
};