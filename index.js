let express = require('express');
let app = express();
let { getAllGames, getGameById } = require('./data');

app.get('/games', (req, res) => {
  res.status(200).json(getAllGames());
  return;
});

app.get('/games/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGameById(id);
  res.status(200).json(game);
  return;
})

module.exports = {
  app
}