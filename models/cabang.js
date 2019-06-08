'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cabang = sequelize.define('Cabang', {
    id_cabang: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nama_cabang: DataTypes.STRING,
    alamat_cabang: DataTypes.STRING
  }, {});

  Cabang.associate = function(models) {
    Cabang.hasMany(models.Pegawai, {
      as: 'pegawai',
      foreignKey: 'id_cabang'
    });
  };
  return Cabang;
};