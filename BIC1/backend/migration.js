import db from "./models/db.js";
import User from "./models/user.js";

db
    .sync({ alter: true })
    .then(() => console.log('Database synced'))
    .then(() => db.close());