'use strict';
module.exports = (sequelize, DataTypes) => {
  const MerkKendaraan = sequelize.define('MerkKendaraan', {
    id_merk: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nama_merk: DataTypes.STRING
  }, {});

  MerkKendaraan.associate = function(models) {
    MerkKendaraan.hasMany(models.TipeKendaraan, {
      as: 'tipe_kendaraan',
      foreignKey: 'id_merk'
    })
  };
  
  return MerkKendaraan;
};