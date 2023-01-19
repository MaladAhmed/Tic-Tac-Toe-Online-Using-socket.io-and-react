import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Board from "../components/Board";
let socket;
const Game = ({ name, gameId }) => {
  const SERVER_ENDPOINT = "http://localhost:3001";
  const [player, setPlayer] = useState({});
  const [winner, setWinner] = useState({});
  const [game, setGame] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const event = gameId ? "joinGame" : "createGame";
    socket = new io(SERVER_ENDPOINT);
    socket.emit(event, { name, gameId });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [SERVER_ENDPOINT, gameId, name]);
  useEffect(() => {
    socket.on("notification", (data) => {
      const { message = "" } = data;
      notifications.push(message);
      setNotifications([...notifications]);

    });
  }, [notifications]);
  useEffect(() => {
    socket.on("playerCreated", (data) => {
      const { player } = data;
      setPlayer(player);
    });
    socket.on("gameUpdated", (data) => {
      const { game } = data;
      setGame(game);
    });
    socket.on("gameEnded", (data) => {
      const { winner } = data;
      setWinner(winner);
    });
  });
  const getWinnerMessage = () => {
    return game.playerTurn === player.id ? "You win" : "You loose";
  };
  const onSquareClick = (value) => {

    socket.emit("moveMade", { square: value, player, gameId: game.id });
  };
  const turnMessage =
    game.playerTurn === player.id ? "Your Move" : "Opponent's Turn";
  const winnerMessage = winner ? `${getWinnerMessage()}` : "Draw!";
  return (
    <div>
      {game && (
        <>
          <h5>Game ID : {game.id}</h5>
          <h5>
            Welcome {player.name} you're playing as : {player.symbol}
          </h5>
          {game.status === "Playing" && (
            <>
              <h5>{turnMessage}</h5>
            </>
          )}
          {game.status === "gameOver" && (
            <>
              <div className="alert alert-info">{winnerMessage}</div>
            </>
          )}
          {game.status === "gameOver-Draw" && (
            <>
              <div className="alert alert-info">Its a Draw !!</div>
            </>
          )}
          <hr />

          <Board player={player} game={game} onSquareClick={onSquareClick} winner={winner}/>
        </>
      )}
      {notifications.map((msg, index) => {
        return <p key={index}>{msg}</p>;
      })}
    </div>
  );
};

export default Game;
