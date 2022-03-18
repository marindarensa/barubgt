"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //menghubungkan detail_transaksi -> transaksi
      this.belongsTo(models.transaksi, {
        foreignKey: "id_transaksi",
        as: "transaksi",
      });
      //menghubungkan detail_transaksi -> paket
      this.belongsTo(models.paket, {
        foreignKey: "id_paket",
        as: "paket",
      });
    }
  }
  detail_transaksi.init(
    {
      id_detail_transaksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_transaksi: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      total: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "detail_transaksi",
      tableName: "detail_transaksi",
    }
  );
  return detail_transaksi;
};
