let { getAllGames, getGameById } = require('../data');
let { app } = require('../index');
let request = require('supertest');
let http = require('http');

jest.mock('../data', () => ({
  ...jest.requireActual('../data'),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return all games with 200 status code', async () => {
    let games = [
      {
        'gameId': 1,
        'title': 'The Legend of Zelda: Breath of the Wild',
        'genre': 'Adventure',
        'platform': 'Nintendo Switch'
      },
      {
        'gameId': 2,
        'title': 'Red Dead Redemption 2',
        'genre': 'Action',
        'platform': 'PlayStation 4'
      },
      {
        'gameId': 3,
        'title': 'The Witcher 3: Wild Hunt',
        'genre': 'RPG',
        'platform': 'PC'
      }
    ]
    getAllGames.mockReturnValue(games);
    let res = await request(server).get('/games');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(games);
    expect(res.body.length).toBe(3);
  });

  it('should return game with gameId with 200 status code', async () => {
    let game = 
      {
        'gameId': 1,
        'title': 'The Legend of Zelda: Breath of the Wild',
        'genre': 'Adventure',
        'platform': 'Nintendo Switch'
      }
    getGameById.mockReturnValue(game)

    let res = await request(server).get('/games/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(game);
  })
  
});

describe('Function Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should return all games', () => {
    let games = [
      {
        'gameId': 1,
        'title': 'The Legend of Zelda: Breath of the Wild',
        'genre': 'Adventure',
        'platform': 'Nintendo Switch'
      },
      {
        'gameId': 2,
        'title': 'Red Dead Redemption 2',
        'genre': 'Action',
        'platform': 'PlayStation 4'
      },
      {
        'gameId': 3,
        'title': 'The Witcher 3: Wild Hunt',
        'genre': 'RPG',
        'platform': 'PC'
      }
    ]
    getAllGames.mockReturnValue(games);
    expect(getAllGames()).toEqual(games);
  })
})