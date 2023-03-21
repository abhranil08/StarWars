import express from 'express';
import { getMovies, getMoviesByUser, searchAllMoviesForUser } from '../Controller/movieContoller.js';
import { getPlanets, getPlanetsByUser, searchAllPlanetsForUser } from '../Controller/planetController.js';

const router = express.Router();
router.get('/movies', getMovies );
router.get('/planets', getPlanets );

// search by favourite movies/planets by users
router.get('/movies/getMoviesByUser', getMoviesByUser );
router.get('/planets/getPlanetsByUser', getPlanetsByUser );

// search by all movies/planets by users
router.get('/movies/searchAllMoviesForUser', searchAllMoviesForUser );
router.get('/planets/searchAllPlanetsForUser', searchAllPlanetsForUser );
export default router;
