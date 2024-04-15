import express from 'express';
import { findMovieById, listOfMovies, searchMovie } from '../controllers/controllers.js';
const router = express.Router();
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
router.use((req, res, next) => {
    res.locals.imageBaseUrl = imageBaseUrl;
    next();
});
router.get('/', listOfMovies);
router.get('/movie/:id', findMovieById);
router.post('/search', searchMovie);
export default router;
//# sourceMappingURL=routes.js.map