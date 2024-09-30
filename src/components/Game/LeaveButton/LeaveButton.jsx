import React from "react";
import Button from "../../Button/Button.jsx";
import "./LeaveButton.css";
import { leaveGame } from "../../../hooks/Lobby/useLeaveGame.js";
import { useNavigate } from "react-router-dom";

function LeaveButton() {
  const gameId = localStorage.getItem("game_id");
  const navigate = useNavigate();
  const handleClick = () => {
    leaveGame(gameId, navigate);
  };
  return (
    <Button
      label="Abandonar Juego"
      className="btn-leave-game"
      onClick={handleClick}
    />
  );
}

export default LeaveButton;
