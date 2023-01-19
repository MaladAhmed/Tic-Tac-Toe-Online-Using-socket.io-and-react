import React from "react";
import { useState } from "react";

const CreateGame = ({onFormSubmit}) => {
  const [name, setName] = useState("");
  return (
    <div>
      <h4>Create new Game</h4>
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
          <button className="btn btn-info" onClick={() => onFormSubmit(name)}>
            Create game
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
