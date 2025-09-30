const { Sequelize } = require("sequelize");

const result = {
  connection: null,
  async startDB() {
    const connection = new Sequelize(process.env.DATABASE_URL);

    await connection.authenticate();
    result.connection = connection;
    console.log("Database connected");
    return connection;
  },
};

module.exports = result;
