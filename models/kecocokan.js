'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kecocokan = sequelize.define('Kecocokan', {
    kode_sparepart: {
      primaryKey: true,
      type: DataTypes.STRING
    }, 
    id_tipe: DataTypes.STRING
  }, {});
  
  Kecocokan.associate = function(models) {
    // associations can be defined here
  };
  return Kecocokan;
};