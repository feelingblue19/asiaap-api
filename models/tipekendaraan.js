'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipeKendaraan = sequelize.define('TipeKendaraan', {
    id_tipe: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    id_merk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama_tipe: {
      type: DataTypes.STRING,
    }
  }, {});

  TipeKendaraan.associate = function(models) {
   TipeKendaraan.belongsTo(models.MerkKendaraan, {
     foreignKey: 'id_merk',
     as: 'merk_kendaraan'
    });
    
    TipeKendaraan.belongsToMany(models.Sparepart, {
      through: 'Kecocokans',
      foreignKey: 'id_tipe',
      as: 'sparepart'
    });
  };
  
  return TipeKendaraan;
};