import { addFavouriteMovie, addFavouritePlanet } from '../Controller/favouriteController.js';
import express from 'express';

const router = express.Router();

//Add favourite end points
router.post('/movies', addFavouriteMovie);
router.post('/planets',addFavouritePlanet)

export default router;

