const { startDB } = require("./lib/db");

startDB()
  .then(async (connection) => {
    console.log("Migrator connected to the database");
    // Import models to ensure they are registered with Sequelize
    require("./models/users");
    require("./models/articles");
    // ADD OTHER MODELS HERE
    // ...

    // Synchronize all defined models to the DB
    await connection.sync({
      alter: true,
    });
    console.log("Database synchronized");
    await connection.close();
    console.log("Migrator disconnected from the database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
