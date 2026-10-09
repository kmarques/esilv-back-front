import express from "express";
import apiRouter from "./routes/api.js";
import connection from "./models/db.js";

const app = express();

app.use(express.json());
app.use(express.static('./client'));

app.get('/', (request, response, next) => {
    // response.send("<html><body><h1>Hello world</h1></body></html>");
    response.json({
        message: "hello world",
        queryParams: request.query
    });
});

app.get('/route/:id/:id2', (req, res) => {
    res.json(req.params);
})

app.post("/", (req, res) => {
    res.json({
        message: "hello world",
        method: "POST",
        body: req.body
    });
})

app.use("/api", apiRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));