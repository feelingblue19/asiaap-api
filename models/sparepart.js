'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sparepart = sequelize.define('Sparepart', {
    kode_sparepart: {
      primaryKey: true,
      type: DataTypes.STRING
    } ,
    penempatan_sparepart: DataTypes.STRING,
    tipe_sparepart: DataTypes.STRING,
    nama_sparepart: DataTypes.STRING,
    harga_jual_sparepart: DataTypes.FLOAT,
    harga_beli_sparepart: DataTypes.FLOAT,
    merk_sparepart: DataTypes.STRING,
    stok_sparepart: DataTypes.INTEGER,
    min_stok: DataTypes.INTEGER,
    gambar_sparepart: DataTypes.STRING
  }, {});

  Sparepart.associate = function(models) {
    Sparepart.belongsToMany(models.TipeKendaraan, {
      through: 'Kecocokans',
      foreignKey: 'kode_sparepart',
      as: 'sparepart'
    });
  };
  return Sparepart;
};