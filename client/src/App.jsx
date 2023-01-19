import React from "react";
import { useState } from "react";
import "./App.css";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Game from "./Pages/Game";
const App = () => {
  const [showGame, setShowGame] = useState(false);
  const [name,setName]= useState("")
  const [gameId,setGameId] = useState("")
  const onFormSubmit = (name, gameId = "") => {
    setShowGame(true)
    setName(name)
    setGameId(gameId)

  };
  return (
    <div className="container">
      {!showGame && (
        <>
          <h3>Multiplayer X-O</h3>
          <CreateGame onFormSubmit={onFormSubmit} />
          <h4>---------X--------</h4>
          <JoinGame onFormSubmit={onFormSubmit} />
        </>
      )}
      {showGame && <Game name={name} gameId ={gameId}/>}
    </div>
  );
};

export default App;
