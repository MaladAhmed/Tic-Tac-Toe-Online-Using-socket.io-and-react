const players = [];
const createPlayer = (id, name, symbol, gameId) => {
  const player = {
    id,
    name,
    symbol,
    gameId,
  };
  players.push(player);
  return player;
};
const getPlayer = (id) => {
  return players.find((player) => player.id === id);
};
const removePlayer = (id) => {
  const index = players.findIndex((player) => player.id === id);
  console.log(players);
  if (index !== -1) {
    players.splice(index, 1);
  }
  console.log(players);
};
module.exports = { createPlayer, getPlayer, removePlayer };
