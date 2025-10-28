const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { connection } = require("../lib/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
      validate: {
        isIn: [["ADMIN", "USER"]],
      },
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
        // is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\dA-Za-z]).{8,32}$/,
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
    await bcrypt.genSalt(10)
  );
});

User.addHook("beforeUpdate", async (instance, { fields }) => {
  if (fields.includes("password")) {
    instance.password = await bcrypt.hash(
      instance.password,
      await bcrypt.genSalt(10)
    );
  }
});

module.exports = User;
