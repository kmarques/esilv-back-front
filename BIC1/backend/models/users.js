const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // is: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\dA-Za-z]).{8,32}/,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
      validate: {
        isIn: [["ADMIN", "USER"]],
      },
    },
  },
  {
    sequelize: connection,
    tableName: "user_account",
    underscored: true,
  }
);

User.addHook("beforeCreate", async (instance) => {
  instance.password = await bcrypt.hash(
    instance.password,
    await bcrypt.genSalt()
  );
});

User.addHook("beforeUpdate", async (instance, options) => {
  if (options.fields.includes("password")) {
    instance.password = await bcrypt.hash(
      instance.password,
      await bcrypt.genSalt()
    );
  }
});

module.exports = User;
