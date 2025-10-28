const express = require("express");
const cors = require("cors");
const { startDB } = require("./lib/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get(
  "/",
  // (request, response, next) => {},
  // (request, response, next) => {},
  (request, response, next) => {
    const filters = request.query;
    console.log(
      `Request: method(${request.method}) path("${
        request.url
      }") queryParams(${JSON.stringify(filters)})`
    );
    response.send("Hello world from Node! " + JSON.stringify(filters));
  }
);

app.post("/", (req, res, next) => {
  const data = req.body;
  console.log(
    `Request: method(${req.method}) path("${req.url}") body(${JSON.stringify(
      data
    )})`
  );
  res.send("Hello world from Node in POST ! " + JSON.stringify(data));
});

startDB()
  .then(() => {
    app.use(require("./routes/security"));
    app.use(require("./routes/users"));
    app.use(require("./routes/articles"));

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
