import express from "express";

const app = express();

// ### Données de départ
// Initialisez une application Express avec un tableau de films et un tableau d'avis stockés en mémoire (ex. `id`, `title`, `director`, `year`, `genre`, `rating`, `isAvailable`).
const movies = [
    { id: 1, title: "Film 1", director: "Director 1", year: 2020, genre: "Action", rating: 8.5, isAvailable: true },
    { id: 2, title: "Film 2", director: "Director 2", year: 2021, genre: "Comedy", rating: 7.2, isAvailable: false },
    { id: 3, title: "Film 3", director: "Director 3", year: 2022, genre: "Drama", rating: 9.0, isAvailable: true },
    { id: 4, title: "Film 4", director: "Director 4", year: 2022, genre: "Drama", rating: 9.0, isAvailable: true },
    { id: 5, title: "Film 5", director: "Director 5", year: 2022, genre: "Drama", rating: 9.0, isAvailable: true },
    { id: 6, title: "Film 6", director: "Director 6", year: 2022, genre: "Drama", rating: 9.0, isAvailable: true },
]

const reviews = [
    { id: 1, movieId: 1, rating: 8, comment: "Bon film" },
    { id: 2, movieId: 1, rating: 7, comment: "Film moyen" },
    { id: 3, movieId: 1, rating: 9, comment: "Excellent film" },
    { id: 4, movieId: 2, rating: 8, comment: "Bon film" },
    { id: 5, movieId: 2, rating: 7, comment: "Film moyen" },
    { id: 6, movieId: 2, rating: 9, comment: "Excellent film" }
]

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === req.params.id);
    if (movie) {
        res.json(movie);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/movies/:movieId/reviews/:reviewId', (req, res) => {
    const movie = movies.find(m => m.id === req.params.movieId);
    if (!movie) {
        return res.sendStatus(404);

    }
    const review = reviews.find(r => r.id === req.params.reviewId);
    if (!review) {
        return res.sendStatus(404);

    }
    res.json(review);
});

app.get('/api/movies', (req, res) => {
    let computedMovies = movies.filter(movie => {
        if (req.query.genre) {
            if (movie.genre !== req.query.genre) return false;
        }
        if (req.query.minRating) {
            if (movie.rating < req.query.minRating) return false;
        }
        if (req.query.available) {
            if (movie.isAvailable !== available) return false;
        }
        if (req.query.search) {
            if (![movie.director, movie.title].some(item => item.includes(req.query.search))) return false
        }
        return true;
    });
    if (req.params.sort) {
        computedMovies = computedMovies.sort((a, b) => {

        });
    }
    if (req.params.page) {
        const indexStart = (req.query.page - 1) * req.query.limit;
        const indexEnd = indexStart + req.query.limit;
        computedMovies = computedMovies.slice(indexStart, indexEnd);
    }

    res.json(computedMovies);
})

app.listen(3000, () => console.log("Server listening on port 3000"));