import express from 'express';
import { type Request, type Response, type NextFunction } from 'express';
import { findMovieById, listOfMovies, searchMovie } from '../controllers/controllers.js';
const router = express.Router();

const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get('/', listOfMovies);
router.get('/movie/:id', findMovieById);
router.post('/search', searchMovie );

export default router;
