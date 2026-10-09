import { Model, DataTypes } from "sequelize";
import connection from "./db.js";
import bcrypt from "bcryptjs";

class User extends Model { };

User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // is: /^(?:[a-z].*)(?:[A-Z].*)(?:[0-9].*)(?:[^a-zA-Z0-9].*).{6,32}$/
        }
    },
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    dob: DataTypes.DATEONLY
}, {
    sequelize: connection,
});

async function hashPassword(user) {
    user.password = bcrypt.hash(user.password);
}

User.addHook("beforeCreate", hashPassword)
User.addHook("beforeUpdate", (user, { fields }) => {
    if (fields.includes("password")) {
        return hashPassword(user);
    }
})

export default User;