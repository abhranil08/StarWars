import request from 'request';
import {favouritesByUser} from "../server.js";

// search movies by user ( userId )
export const searchMoviesByUser = async( req, res, next ) => {
    const { search, user_id } = req.query;
    let title = search;
    
    // search in global hashmap if it exists -> DB search needed to be done in future
    if(search) 
    {
        let customNameMatch;
        if(favouritesByUser[user_id] && favouritesByUser[user_id]["movies"])
        {
          let arr = favouritesByUser[user_id]["movies"];
          customNameMatch = arr.find(o => o.custom_name === search.toLowerCase());
          
          if(customNameMatch)
            customNameMatch = customNameMatch.title;
        }
        if(customNameMatch)
        title = customNameMatch;
    };
    
    const url = `https://swapi.dev/api/films/?search=${title}`;
    request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else 
    {
      let moviesData = body.results;

      const movies = moviesData.map(movie => ({
      title: movie.title,
      release_date: movie.release_date,
      created: movie.created,
      updated: movie.edited,
      url: movie.url,
      custom_name: customMovieNameForUser(movie.title, user_id),
    }));
    res.json(movies);
  }
});
};

// search planets by user ( userId )
export const searchPlanetsByUser = async( req, res, next ) => {
    const { search, user_id } = req.query;
    let name = search;
    
    // search in global hashmap if it exists -> DB search needed to be done in future
    if(search) 
    {
        let customNameMatch;
        if(favouritesByUser[user_id] && favouritesByUser[user_id]["planets"])
        {
          let arr = favouritesByUser[user_id]["planets"];
          customNameMatch = arr.find(o => o.custom_name === search.toLowerCase());

          if(customNameMatch)
            customNameMatch = customNameMatch.name;
        }
        if(customNameMatch)
        name = customNameMatch;
    };
    
    const url = `https://swapi.dev/api/planets/?search=${name}`;
    request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } 
    else 
    {
      let planetsData = body.results;

      const planets = planetsData.map(planet => ({
      title: planet.name,
      release_date: planet.release_date,
      created: planet.created,
      updated: planet.edited,
      url: planet.url,
      custom_name: customPlanetNameForUser(planet.name, user_id),
    }));
    res.json(planets);
  }
});
};

// Getting custom_name from global hashmap if it exists -> DB search needed to be done in future
function customMovieNameForUser( title, user_id ){
    let customNameMatch;
    if(favouritesByUser[user_id] && favouritesByUser[user_id]["movies"])
    {
        let arr = favouritesByUser[user_id]["movies"]; 
        customNameMatch = arr.find(o => o.title.toLowerCase() === title.toLowerCase())
        if(customNameMatch)
            customNameMatch = customNameMatch.custom_name;
    }
    if(customNameMatch)
    {
        return customNameMatch;
    }    
    else
    {
        return title;
    }
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