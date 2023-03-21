import request from 'request';
import {favouritesByUser} from "../server.js";

export const getMovies = async( req, res, next ) => {
    const title = req.query.title;
    const url = 'https://swapi.dev/api/films';
    request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
        let moviesData = body.results;
        if (title) {
        moviesData = moviesData.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
        }

        const movies = moviesData.map(movie => ({
        title: movie.title,
        release_date: movie.release_date,
        created: movie.created,
        updated: movie.edited,
        url: movie.url,
        is_favourite: false,
      }));
      res.json(movies);
    }
});
};

export const getMoviesByUser = async( req, res, next ) => {
    const { search, user_id } = req.query;
    let title = req.query.title;      
    if(search) 
    {
        let customNameMatch;
        if(favouritesByUser[user_id] && favouritesByUser[user_id]["movies"])
        {
          let arr = favouritesByUser[user_id]["movies"];
          customNameMatch = arr.find(o => o.custom_name === search.toLowerCase()).title;
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
      is_favourite: false,
    }));
    res.json(movies);
  }
});
};

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

export const searchAllMoviesForUser = async( req, res, next ) => {
    const { user_id } = req.query;
    const url = 'https://swapi.dev/api/films';
    request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
        let moviesData = body.results;

        const movies = moviesData.map(movie => ({
        title: customMovieNameForUser(movie.title, user_id),
        release_date: movie.release_date,
        created: movie.created,
        updated: movie.edited,
        url: movie.url,
        is_favourite: false,
      }));
      res.json(movies);
    }
});
};