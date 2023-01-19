import React from "react";
import { useState } from "react";

const JoinGame = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");

  return (
    <div>
      <h4>Join an existing game</h4>
      <div className="form-group row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Game ID"
            onChange={(e) => setGameId(e.target.value)}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-warning"
            onClick={() => onFormSubmit(name,gameId)}
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
