import {favouritesByUser} from "../server.js";
import axios from 'axios';

// add favourites to global hashmap per user -> DB write should be done in future
export const addFavouriteMovie = async( req, res, next ) => {
  const { user_id, title, custom_name } = req.body;
  
  if (!user_id || !title || !custom_name) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  let result;
  const urlSearchMovie = `https://swapi.dev/api/films/?search=${title}`;

  try {
    result = await axios.get(urlSearchMovie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch data from the API" });
  }

  if (!favouritesByUser[user_id]) {
    favouritesByUser[user_id] = {};
  }

  if (!favouritesByUser[user_id]["movies"]) {
    favouritesByUser[user_id]["movies"] = [];
  }

  const data = {
    title: title,
    is_favourite: true,
    custom_name: custom_name,
  };
  
  

  favouritesByUser[user_id]["movies"].push(data);
  res.status(201).json({ message: "Favourite added successfully" });
};

// add favourites to global hashmap per user -> DB write should be done in future
export const addFavouritePlanet = async( req, res, next ) => {
  const { user_id, name, custom_name } = req.body;

  if (!user_id || !name || !custom_name) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  let result;
  const urlSearchPlanet = `https://swapi.dev/api/planets/?search=${name}`;
  
  try {
      result = await axios.get(urlSearchPlanet);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch data from the API" });
  }

  if (!favouritesByUser[user_id]) {
    favouritesByUser[user_id] = {};
  }
  
  if (!favouritesByUser[user_id]["planets"]) {
    favouritesByUser[user_id]["planets"] = [];
  }

  const data = {
    name: name,
    is_favourite: true,
    custom_name: custom_name
  };

  favouritesByUser[user_id]["planets"].push(data);
  res.status(201).json({ message: "Favourite added successfully" });
};