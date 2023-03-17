const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load movies from API
app.get('/api/movies', (req, res) => {
  const url = 'https://swapi.dev/api/films';
  request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      const movies = body.results.map(movie => ({
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
});

// Load planets from API
app.get('/api/planets', (req, res) => {
  const url = 'https://swapi.dev/api/planets';
  request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      const planets = body.results.map(planet => ({
        name: planet.name,
        created: planet.created,
        updated: planet.edited,
        url: planet.url,
        is_favourite: false,
      }));
      res.json(planets);
    }
  });
});

// Add a favourite movie or planet
app.post('/api/favourites', (req, res) => {
  const { user_id, movie, planet, custom_name } = req.body;
  if (!user_id || (!movie && !planet)) {
    res.status(400).send('Bad Request');
    return;
  }

  const favourite = { user_id, movie, planet, custom_name };
  // TODO: Save favourite to database

  res.json(favourite);
});

app.listen(port, () => {
  console.log(`Favourites app listening at http://localhost:${port}`);
});
