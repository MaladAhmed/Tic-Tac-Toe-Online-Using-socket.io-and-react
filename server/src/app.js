const http = require("http");
const server = http.createServer();
const SocketIO = require("socket.io");
const { makeKey, checkWinner } = require("./utils");
const { createGame, getGame, updateGame } = require("./data/games");
const { createPlayer, getPlayer, removePlayer } = require("./data/players");
const PORT = process.env.PORT || 3001;
const io = SocketIO(server, {
  cors: {
    origin: "*",
  },
});

server.listen(PORT, () => {
  console.log("server is running on PORT :", PORT);
});

io.on("connection", (socket) => {
  console.log("New connection :\n", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    const player = getPlayer(socket.id);
    if (player) {
      removePlayer(player.id);
    }
  });
  socket.on("createGame", (data) => {
    const gameId = `game-${makeKey(5)}`;
    const player = createPlayer(socket.id, data.name, "X", gameId);
    const game = createGame(gameId, player.id, null);
    socket.join(gameId);
    socket.emit("playerCreated", { player });
    socket.emit("gameUpdated", { game });
    socket.emit("notification", {
      message: `The game has been created. Game id : ${gameId}. Send this to your friend to join you`,
    });
    socket.emit("notification", {
      message: `Waiting for your opponent to join ...`,
    });
  });
  socket.on("joinGame", ({ name, gameId }) => {
    //-//Check gameId
    const game = getGame(gameId);
    if (!game) {
      socket.emit("notification", {
        message: `You typed in an invalid game ID`,
      });
      return;
    }
    //-//Check for max players
    if (game.player2) {
      socket.emit("notification", {
        message: `The game already has 2 players on`,
      });
      return;
    }
    //-//Create player
    const player = createPlayer(socket.id, name, "O", gameId);
    //-//Update the game
    game.player2 = player.id;
    game.status = "Playing";
    updateGame(game);

    //-//notify other player
    socket.join(gameId);
    socket.emit("playerCreated", { player });
    socket.emit("gameUpdated", { game });
    socket.broadcast.emit("gameUpdated", { game });
    socket.broadcast.emit("notification", {
      message: `${name} has joined the game`,
    });
  });
  socket.on("moveMade", (data) => {
    const { player, square, gameId } = data;
    //get the game
    const game = getGame(gameId);
    // check if game is valid
    const { playBoard = [], playerTurn, player1, player2, turnNumber } = game;
    playBoard[square] = player.symbol;

    //update the board and player turn
    const nextTurnId = playerTurn === player1 ? player2 : player1;
    game.playBoard = playBoard;
    game.playerTurn = nextTurnId;
    game.turnNumber = turnNumber + 1;
    updateGame(game);
    io.in(gameId).emit("gameUpdated", { game });
    //check winning status (wether there's a draw or a win)
    const hasWon = checkWinner((board = playBoard), turnNumber);
    if (hasWon) {
      const winner = { ...hasWon, player };
      if (winner.winningCombination === "Draw") {
        game.status = "gameOver-Draw";
        io.in(gameId).emit("gameUpdated", { game });
        io.in(gameId).emit("gameEnded", { winner });
        updateGame(game);
      } else {
        game.status = "gameOver";
        io.in(gameId).emit("gameUpdated", { game });
        io.in(gameId).emit("gameEnded", { winner });
        updateGame(game);
      }
    }
    console.log(`move made and game status is :${game.status}`);
    console.log(`hasWon is :${hasWon}`);
    console.log(`turnNumber is ${game.turnNumber}`);
    console.log(`playBoard is ${playBoard} `);
  });
});
