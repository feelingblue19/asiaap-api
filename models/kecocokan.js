'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kecocokan = sequelize.define('Kecocokan', {
    kode_sparepart: {
      primaryKey: true,
      type: DataTypes.STRING
    }, 
    id_tipe: {
      primaryKey: true,
      type: DataTypes.STRING
    }
  }, {});
  
  Kecocokan.associate = function(models) {
    Kecocokan.belongsTo(models.Sparepart, {
      foreignKey: 'kode_sparepart'
    });

    Kecocokan.belongsTo(models.TipeKendaraan, {
      foreignKey: 'id_tipe'
    })
  };
  return Kecocokan;
};