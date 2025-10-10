const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Label extends Model {}

Label.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "label",
    underscored: true,
  }
);

module.exports = Label;
