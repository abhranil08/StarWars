import express from 'express';
import { getMovies, getAllMoviesForUser } from '../Controller/movieContoller.js';
import { getPlanets, getAllPlanetsForUser } from '../Controller/planetController.js';

const router = express.Router();

// Get/Search all movies
router.get('/movies', getMovies );
router.get('/planets', getPlanets );

/* Get all movies/planets by users (userId)
 - If custom name is set then that will be returned as the title.
*/
router.get('/movies/getAllMoviesForUser', getAllMoviesForUser );
router.get('/planets/getAllPlanetsForUser', getAllPlanetsForUser );

export default router;
