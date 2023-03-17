# StarWars

# Technologies used 🛠️

- [NodeJS] (https://nodejs.org/en/)
- [RestAPIs] (https://www.ibm.com/in-en/topics/rest-apis)

# Things to DO :
- [x] MUST load planets and movies from the JSON API provided by https://sw-api-rwjfuiltyq-el.a.run.app/
- [x] MUST expose list APIs - one for movies and one for planets
- [x] MUST expose APIs to add a movie and planet as a favourite
- [ ] The favourite API should also allow setting a custom title/name to the movie/planet
- [ ] The favourites must be stored per user (user_id can simply be passed in the request, there is no need for authentication)
- [x] The planet list API must return the name, created, updated, url and is_favourite fields
- [x] The movies list API must return the title, release_date, created, updated, url and is_favourite fields
- [ ] If the custom name is set by the user then that should be returned as the name/title and it should be used when searching
- [x] Additionally the list APIs must support searching by title/name
