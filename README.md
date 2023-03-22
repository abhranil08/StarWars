# StarWars

# Technologies used 🛠️

- [NodeJS] (https://nodejs.org/en/)
- [RestAPIs] (https://www.ibm.com/in-en/topics/rest-apis)

# Clone and Use 📋

- The website is completely built on `node-js` library of `javascript` and that's why we need `nodejs` and `npm` installed
- While installing `nodejs` and `npm`, try to install versions which are equal or greater than the versions mentioned in badges above
- In case you want to help developing it or simply saving it, you can fork the repository just by clicking the button on the top-right corner of this page
- After the successful installation of `nodejs` and `npm`, clone the repository into your local system using below command:
  ```bash
   git clone https://github.com/abhranil08/StarWars.git
  ```
  This will clone the whole repository in your system.
- To download required dependencies to your system, navigate to the directory where the cloned repository resides and execute following command:
  ```node
  npm install
  ```
- Now the project is ready to use
- You can check it using `npm start`, it will open the website locally on your browser.
- PORT number in server.js to use your own. Ex : local URL - http://localhost:3000/ , when PORT number : 3000
- **Just for this assignment no DB used, instead a global hashmap is being for processing favourites. Can update to use DB if asked or needed.**

# Things DONE :
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

1. Get/Search movies, without any user details :
  ```
   - GET /movies
   - GET /movies?title=<title>
   ```
   
2. Get/Search planets, without any user details :
 ```
   - GET /planets
   - GET /planets?name=<planet_name>
   ```
   
3. Get all movies by userID ( If custom name is set then that will be returned as the title ) :
```
   - GET api/movies/getAllMoviesForUser?user_id=<user_id>
   ```
   
4. Search all planets by userID ( If custom name is set then that will be returned as the name ):
```
   - GET /api/planets/getAllPlanetsForUser?user_id=<user_id>
   ```

5. Add favourite movie by users( userID ):
```
   - POST /api/favourites/movies
      - Request : {
                  "user_id":"<user_id>",
                  "title":"<title>",
                  "custom_name":"<custom_name>"
                  }
 ```
   
5. Add favourite planet by users( userID ):
```
   - POST api/favourites/planets
      - Request : {
                  "user_id":"<user_id>",
                  "name":"<planet_name>",
                  "custom_name":"<custom_name>"
                  }
```
   
7. Search movies by users( If custom name is set then that will be returned as the title ):
```
   - GET /api/search/movies/byUser?search=<search_term>&user_id=<user_id>
```
   
8. Search planets by users( If custom name is set then that will be returned as the name ):
```
   - GET /api/search/planets/byUser?search=<search_term>&user_id=<user_id>
```

