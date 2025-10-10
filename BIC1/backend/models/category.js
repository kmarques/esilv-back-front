const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Category extends Model {}

Category.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    history: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    tableName: "category",
    underscored: true,
  }
);

Category.addHook("beforeUpdate", (instance) => {
  instance.history = instance.history || [];
  console.log(instance.previous(), instance.dataValues);
  const { id, title, description, updatedAt } = instance.previous();
  instance.history = [
    { id, title, description, updatedAt },
    ...instance.history,
  ];
});

module.exports = Category;
