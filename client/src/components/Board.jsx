import React from "react";
import Square from "./Square";
const Board = ({ game, player, onSquareClick, winner }) => {
  const { playBoard } = game;
  const enabled = game.status === "Playing";
  const canPlay = player.id === game.playerTurn;
  const { winningCombination = [15] } = winner || null;


  return (
    <div className="board">
      {playBoard?.map((item, index) => {
        let isWinnerSquare = false;
        if (winningCombination && winningCombination !== "Draw") {
          isWinnerSquare = winningCombination.includes(index);
        }
        return (
          <Square
            value={item}
            key={index}
            index={index}
            onClick={() => onSquareClick(index)}
            enabled={enabled}
            canPlay={canPlay}
            isWinnerSquare={isWinnerSquare}
          />
        );
      })}
    </div>
  );
};
export default Board;
