import { Model, DataTypes } from "sequelize";
import connection from "./db.js";
import bcrypt from "bcryptjs";

class User extends Model { }

User.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // is: /^(?:[a-z].*)(?:[A-Z].*)(?:[0-9].*)(?:[^a-zA-Z0-9].*).{6,32}$/
        }
    }
}, {
    sequelize: connection
});

async function hashPassword(user) {
    user.password = await bcrypt.hash(user.password);
}

User.addHook('beforeCreate', hashPassword);

User.addHook("beforeUpdate", (user, { fields }) => {
    if (fields.includes('password')) {
        return hashPassword(user);
    }
});

export default User;