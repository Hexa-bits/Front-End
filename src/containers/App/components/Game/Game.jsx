import React from "react";
import "./Game.css";
import { useNavigate } from "react-router-dom";
import { leaveGame } from "../../../../hooks/Lobby/useLeaveGame.js";
import Button from "../../../../components/Button/Button.jsx";

function Game() {
  const gameId = localStorage.getItem("game_id");
  const navigate = useNavigate();
  const handleClick = () => {
    leaveGame(gameId, navigate);
  };

  return (
    <div className="game-container">
      <Button label="Dejar Partida en juego" onClick={handleClick} />
    </div>
  );
}

export default Game;
