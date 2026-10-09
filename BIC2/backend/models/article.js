import { Model, DataTypes } from "sequelize";
import connection from "./db.js";

class Article extends Model { }

Article.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pusblishedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Date.now(),
        validate: {
            isDate: true
        }
    }
}, {
    sequelize: connection
});

export default Article;