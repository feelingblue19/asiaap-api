'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pegawai = sequelize.define('Pegawai', {
    id_pegawai: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    id_cabang: DataTypes.STRING,
    nama_pegawai: DataTypes.STRING,
    alamat_pegawai: DataTypes.STRING,
    no_telp_pegawai: DataTypes.STRING,
    gaji_per_minggu: DataTypes.FLOAT,
    jabatan_pegawai: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  Pegawai.associate = function(models) {
    Pegawai.belongsTo(models.Cabang, {
      as: 'cabang',
      foreignKey: 'id_cabang'
    });
  };
  return Pegawai;
};