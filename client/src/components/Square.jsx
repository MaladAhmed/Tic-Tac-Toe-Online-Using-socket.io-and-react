import React from "react";

const Square = ({
  value,
  index,
  onClick,
  enabled,
  canPlay,
  isWinnerSquare,
}) => {
  const canSelect = !value && enabled && canPlay;
  const btnClassName = canSelect ? "" : "disabled";
  const correctClassName = isWinnerSquare ? "correctButton" : "";
  return (
    <div className="square">
      <div className="square">
        <button
          className={`square-item ${btnClassName} ${correctClassName}`}
          onClick={onClick}
          disabled={!canSelect}
        >
          {value}
        </button>
      </div>
    </div>
  );
};

export default Square;
