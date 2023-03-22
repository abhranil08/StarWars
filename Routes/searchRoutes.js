import express from 'express';
import { searchMoviesByUser } from '../Controller/searchController.js';
import { searchPlanetsByUser } from '../Controller/searchController.js';

const router = express.Router();

// search by favourite movies/planets by users
router.get('/movies/byUser', searchMoviesByUser );
router.get('/planets/byUser', searchPlanetsByUser );

export default router;
