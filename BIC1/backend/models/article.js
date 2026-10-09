import { Model, DataTypes } from "sequelize";
import connection from "./db.js";

class Article extends Model { };

Article.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishedAt: DataTypes.DATEONLY
}, {
    sequelize: connection,
});

export default Article;