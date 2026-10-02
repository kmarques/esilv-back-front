import express from 'express';

const app = express();

const uptime = Date.now();

app.use(express.json())
app.use(express.static('.'));

app.get("/", function (request, response) {
    console.log(
        request.method,
        request.pathname,
        request.query,
        request.body,
        request.headers
    );

    response.json({
        success: true, method: 'GET'
    });
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ success: true, method: 'POST' });
});

app.get('/healthz', (req, res) => {
    res.json({
        uptime,
        status: 'OK'
    });
});

app.get('/articles', (req, res) => {
    console.log(req.query);
    res.json([
        {
            id: 1,
            title: 'Article 1',
            content: 'Content 1'
        },
        {
            id: 2,
            title: 'Article 2',
            content: 'Content 2'
        }
    ])
});

app.get('/articles/:id', (req, res) => {
    res.json({
        params: req.params
    })
});

app.listen(3000,
    () => console.log("Server listening on port 3000")
);