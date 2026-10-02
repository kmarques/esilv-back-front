import express from 'express';

const app = express();

const uptime = Date.now();

app.use(express.json())
app.use(express.static('.'));

//Initialisez une application Express avec un tableau de films et un tableau d'avis stockés en mémoire (ex. `id`, `title`, `director`, `year`, `genre`, `rating`, `isAvailable`)
const movies = [
    { id: 1, title: "Article 1", director: "Director 1", year: 2020, genre: "Genre 1", rating: 8.5, isAvailable: true },
    { id: 2, title: "Article 2", director: "Director 2", year: 2021, genre: "Genre 2", rating: 8.6, isAvailable: false },
    { id: 3, title: "Article 3", director: "Director 3", year: 2022, genre: "Genre 3", rating: 8.7, isAvailable: true },
    { id: 4, title: "Article 4", director: "Director 4", year: 2023, genre: "Genre 4", rating: 8.8, isAvailable: false },
    { id: 5, title: "Article 5", director: "Director 5", year: 2024, genre: "Genre 5", rating: 8.9, isAvailable: true },
]

const reviews = [
    {
        id: 1,
        movieId: 1,
        userId: 1,
        rating: 8,
        comment: "Comment 1"
    },
    {
        id: 2,
        movieId: 2,
        userId: 2,
        rating: 9,
        comment: "Comment 2"
    },
    {
        id: 3,
        movieId: 3,
        userId: 3,
        rating: 10,
        comment: "Comment 3"
    },
    {
        id: 4,
        movieId: 4,
        userId: 4,
        rating: 7,
        comment: "Comment 4"
    },
    {
        id: 5,
        movieId: 5,
        userId: 5,
        rating: 8,
        comment: "Comment 5"
    },
    {
        id: 6,
        movieId: 1,
        userId: 2,
        rating: 9,
        comment: "Comment 6"
    },
    {
        id: 7,
        movieId: 2,
        userId: 3,
        rating: 10,
        comment: "Comment 7"
    },
    {
        id: 8,
        movieId: 3,
        userId: 4,
        rating: 7,
        comment: "Comment 8"
    },
    {
        id: 9,
        movieId: 4,
        userId: 5,
        rating: 8,
        comment: "Comment 9"
    },
    {
        id: 10,
        movieId: 5,
        userId: 1,
        rating: 9,
        comment: "Comment 10"
    },
]


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


app.get('/api/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.sendStatus(422);
    const movie = movies.find(movie => movie.id === id);
    if (movie) return res.json(movie);
    res.sendStatus(404);
});

app.get('/api/movies/:id/reviews/:reviewId', (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.sendStatus(422);
    const movie = movies.find(movie => movie.id === id);
    if (!movie) return res.sendStatus(404);

    const reviewId = Number(req.params.reviewId);
    if (Number.isNaN(reviewId)) return res.sendStatus(422);
    const review = reviews.find(review => review.id === reviewId);
    if (!review) return res.sendStatus(404);

    if (movie.id !== review.movieId) return res.sendStatus(404);
    res.json(review);
});

app.get('/api/movies', (req, res) => {
    // const sort = req.query.sort;
    // delete req.query.sort;
    // const limit = req.query.limit;
    // delete req.query.limit;
    // const page = req.query.page;
    // delete req.query.page;
    // const filters = req.query;
    // <==>
    const { sort, limit = 10, page = 1, ...filters } = req.query;
    let computedMovies = movies.filter(movie => {
        if (filters.genre)
            if (movie.genre.toLowerCase() !== filters.genre.toLowerCase()) return false;

        if (filters.minRating !== undefined)
            if (filters.minRating > movie.rating) return false;

        if (filters.available !== undefined)
            if (filters.available !== movie.isAvailable) return false;

        if (filters.search)
            if (![movie.title, movie.director].some(item => item.toLowerCase().includes(filters.search.toLowerCase()))) return false;

        return true;
    });

    if (sort) {
        let key, direction;
        if (sort[0] === '-') {
            key = sort.slice(1);
            direction = -1;
        } else {
            key = sort;
            direction = 1;
        }
        computedMovies = computedMovies.sort((a, b) => a[key].toString().localCompare(b[key].toString()) * direction)
    }

    // page 1 limit 30 => 0 - 29
    // page 2 limit 30 => 30 - 59
    const indexStart = (page - 1) * limit;
    const indexEnd = (page * limit);
    computedMovies.slice(indexStart, indexEnd);

    /* movies.findAll({
        where: filters,
        offset: indexStart,
        limit,
        order: [key, direction]
    });

    return res.json(computedMovies); */
});

app.listen(3000,
    () => console.log("Server listening on port 3000")
);