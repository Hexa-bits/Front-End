import React from "react";
//import "./game.css";
import { useNavigate } from "react-router-dom";
import { leaveGame } from "../../../../hooks/Lobby/useLeaveGame.js";
import Button from "../../../../components/Button/Button.jsx";

function Game() {
  const gameId = localStorage.getItem("game_id");
  const navigate = useNavigate();
  const handleClick = () => {
    leaveGame(gameId, navigate);
  };

  return <Button label="Dejar Partida en juego" onClick={handleClick} />;
}

export default Game;
