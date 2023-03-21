# StarWars

# Technologies used 🛠️

- [NodeJS] (https://nodejs.org/en/)
- [RestAPIs] (https://www.ibm.com/in-en/topics/rest-apis)

# Things to DO :
- [x] MUST load planets and movies from the JSON API provided by https://sw-api-rwjfuiltyq-el.a.run.app/
- [x] MUST expose list APIs - one for movies and one for planets
- [x] MUST expose APIs to add a movie and planet as a favourite
- [x] The favourite API should also allow setting a custom title/name to the movie/planet
- [x] The favourites must be stored per user (user_id can simply be passed in the request, there is no need for authentication)
- [x] The planet list API must return the name, created, updated, url and is_favourite fields
- [x] The movies list API must return the title, release_date, created, updated, url and is_favourite fields
- [x] If the custom name is set by the user then that should be returned as the name/title and it should be used when searching
- [x] Additionally the list APIs must support searching by title/name


# REST Endpoints :

1. Get all movies, without any user details :
   - GET /movies
   - GET /movies?title=<title>
   
2. Get all planets, without any user details :
   - GET /planets
   - GET /planets?name=<planet_name>
   
3. Search all movies by userID:
   - GET api/movies/searchAllMoviesForUser?user_id=<user_id>
   
4. Search all planets by userID:
   - GET /api/planets/searchAllPlanetsForUser?user_id=<user_id>

5. Add favourite movie by users( userID ):
   - POST /api/favourites/movies
      - Request : {
                  "user_id":"<user_id>",
                  "title":"<title>",
                  "custom_name":"<custom_name>"
                  }
   
5. Add favourite planet by users( userID ):
   - POST api/favourites/planets
      - Request : {
                  "user_id":"<user_id>",
                  "name":"<planet_name>",
                  "custom_name":"<custom_name>"
                  }
   
7. Search movies by users( userID ):
   - GET api/movies/getMoviesByUser?search=<search-term>&user_id=<user_id>
   
8. Search planets by users( userID ):
   - GET api/planets/getPlanetsByUser?search=<search-term>&user_id=<user_id>
  

