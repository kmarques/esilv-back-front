import express from "express";
import apiRouter from "./routes/api.js";
import connection from "./models/db.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.static('./client'));
app.use(cors());

app.get('/',
    // (req, res, next) => { },
    // (req, res, next) => {
    //     const user = User.findByPk(req.headers.USER_ID);
    //     req.user = user;
    //     next();
    // },
    // (req, res, next) => {
    //     const user = req.user;
    //     if (subject.authorId !== user.id) return res.sendStatus(403)
    //     next();
    // },
    // (req, res, next) => {
    //     if (req.headers.accept === "text/csv") {
    //         res.render = function (data) {
    //             const csvData = jsonToCsv(data);
    //             res.setHeader('Content-Type', 'text/csv');
    //             res.send(csvData);
    //         }
    //     }
    // },
    (request, response, next) => {
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