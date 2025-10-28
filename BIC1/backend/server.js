const express = require("express");
const cors = require("cors");
const { getConnection } = require("./lib/db");

const app = express();

// Check content-type for POST/PUT/PATCH if application/json
// then parse JSON data and populate req.body
app.use(express.json());
// Check content-type for POST/PUT/PATCH if application/x-www-form-urlencoded
// then parse URL-encoded data and populate req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function logger(req, res, next) {
  console.log("Request received:", req.method, req.url);
  next();
}
app.use(logger);

app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (req.body === undefined) {
      return res.sendStatus(400);
    }
  }
  next();
});

app.get(
  "/",
  // (request, response, next) => {},
  // (request, response, next) => {},
  // (request, response, next) => {},
  (request, response, next) => {
    const queryParams = request.query;
    console.log("Query params:", queryParams);
    response.send(
      "Hello from Express! Filtres : " + JSON.stringify(queryParams)
    );
  }
);

app.post("/", (request, response, next) => {
  const body = request.body;
  console.log("Body:", body);
  response.send("POST request received! Body: " + JSON.stringify(body));
});

getConnection().then(() => {
  const userRouter = require("./routes/users");
  const labelRouter = require("./routes/labels");
  const categoryRouter = require("./routes/categories");
  const securityRouter = require("./routes/security");

  app.use(userRouter);
  app.use(labelRouter);
  app.use(categoryRouter);
  app.use(securityRouter);

  app.listen(3000, () => {
    console.log("Server listening on port http://localhost:3000");
  });
});
