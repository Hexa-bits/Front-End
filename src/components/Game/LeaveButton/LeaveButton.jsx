import React from "react";
import Button from "../../Button/Button.jsx";
import "./LeaveButton.css";
import { useLeaveGame } from "../../../services/Lobby/leaveGame.jsx";

function LeaveButton() {
  return (
    <Button
      label="Abandonar Juego"
      className="btn-leave-game"
      onClick={useLeaveGame()}
    />
  );
}

export default LeaveButton;
