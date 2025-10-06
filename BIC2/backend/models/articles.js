const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DRAFT",
      validate: {
        isIn: [["DRAFT", "PUBLISHED"]],
      },
    },
  },
  {
    sequelize: connection,
    tableName: "article",
    underscored: true,
  }
);

Article.addHook("beforeUpdate", (article, { fields }) => {
  if (fields.includes("status") && article.status === "PUBLISHED") {
    article.publishedAt = new Date();
  }
});

module.exports = Article;
