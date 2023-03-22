import request from "request";
import {favouritesByUser} from "../server.js";

// get/search planets
export const getPlanets = async( req, res, next ) => {
    const name = req.query.name;
    const url = 'https://swapi.dev/api/planets';
    request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
        let planetData = body.results;
        if (name) {
        planetData = planetData.filter(planet => planet.name.toLowerCase().includes(name.toLowerCase()));
        }

        const planets = planetData.map(planet => ({
        name: planet.name,
        created: planet.created,
        updated: planet.edited,
        url: planet.url,
        is_favourite: false,
      }));
      res.json(planets);
    }
});
};

// Getting custom_name from global hashmap if it exists -> DB search needed to be done in future
function customPlanetNameForUser( name, user_id ){
    let customNameMatch;
    if(favouritesByUser[user_id] && favouritesByUser[user_id]["planets"])
    {
        let arr = favouritesByUser[user_id]["planets"]; 
        customNameMatch = arr.find(o => o.name.toLowerCase() === name.toLowerCase())
        if(customNameMatch)
            customNameMatch = customNameMatch.custom_name;
    }
    if(customNameMatch)
    {
        return customNameMatch;
    }    
    else
    {
        return name;
    }
};

// Getting isFavourites from global hashmap if it exists -> DB search needed to be done in future
function isFavouritePlanetsForUser( name, user_id ){
    let customNameMatch;
    if(favouritesByUser[user_id] && favouritesByUser[user_id]["planets"])
    {
        let arr = favouritesByUser[user_id]["planets"]; 
        customNameMatch = arr.find(o => o.name.toLowerCase() === name.toLowerCase())
        if(customNameMatch)
          return true;
        else
          return false;
    }
};

/* get planets for users*/
export const getAllPlanetsForUser = async( req, res, next ) => {
    const { user_id } = req.query;
    const url = 'https://swapi.dev/api/planets';
    request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
        let planetsData = body.results;

        const planets = planetsData.map(planet => ({
        name: customPlanetNameForUser(planet.name, user_id),
        created: planet.created,
        updated: planet.edited,
        url: planet.url,
        is_favourite: isFavouritePlanetsForUser(planet.name,user_id),
      }));
      res.json(planets);
    }
});
};