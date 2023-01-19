const games = [];
const createGame = (id, player1, player2) => {
  const game = {
    id,
    player1,
    player2,
    playerTurn: player1,
    playBoard: Array(9).fill(null),
    status: "waiting",
    winner: null,
    turnNumber: 1,
  };
  games.push(game);
  return game;
};
const getGame = (id) => {
  return games.find((game) => game.id === id);
};
const updateGame = (game) => {
  const index = games.findIndex((g) => g.id === game.id);
  if (index !== -1) {
    games[index] = game;
  }
};
module.exports = { createGame, getGame, updateGame };
