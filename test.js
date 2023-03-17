const request = require('supertest');
const app = require('./app');

describe('Favourites API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/movies', () => {
    it('should return a list of movies', async () => {
      const res = await request(server).get('/api/movies');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('release_date');
      expect(res.body[0]).toHaveProperty('created');
      expect(res.body[0]).toHaveProperty('updated');
      expect(res.body[0]).toHaveProperty('url');
      expect(res.body[0]).toHaveProperty('is_favourite');
    });
  });

  describe('GET /api/planets', () => {
    it('should return a list of planets', async () => {
      const res = await request(server).get('/api/planets');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('created');
      expect(res.body[0]).toHaveProperty('updated');
      expect(res.body[0]).toHaveProperty('url');
      expect(res.body[0]).toHaveProperty('is_favourite');
    });
  });

  describe('POST /api/favourites', () => {
    it('should add a favourite movie', async () => {
      const res = await request(server)
        .post('/api/favourites')
        .send({
          user_id: 1,
          movie: 'https://sw-api-rwjfuiltyq-el.a.run.app/movies/1/',
          custom_name: 'My favourite movie',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user_id', 1);
      expect(res.body).toHaveProperty('movie', 'https://sw-api-rwjfuiltyq-el.a.run.app/movies/1/');
      expect(res.body).toHaveProperty('custom_name', 'My favourite movie');
    });

    it('should add a favourite planet', async () => {
      const res = await request(server)
        .post('/api/favourites')
        .send({
          user_id: 2,
          planet: 'https://sw-api-rwjfuiltyq-el.a.run.app/planets/1/',
          custom_name: 'My favourite planet',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user_id', 2);
      expect(res.body).toHaveProperty('planet', 'https://sw-api-rwjfuiltyq-el.a.run.app/planets/1/');
      expect(res.body).toHaveProperty('custom_name', 'My favourite planet');
    });

    it('should return a 400 error if user_id is missing', async () => {
      const res = await request(server)
        .post('/api/favourites')
        .send({
          movie: 'https://sw-api-rwjfuiltyq-el.a.run.app/movies/1/',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.text).toEqual('Bad Request');
    });
  });
});
