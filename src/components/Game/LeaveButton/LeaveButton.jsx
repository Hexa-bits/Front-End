import React from "react";
import Button from "../../Button/Button.jsx";
import "./LeaveButton.css";
import { LeaveGame } from "../../../hooks/Lobby/leaveGame.jsx";

function LeaveButton() {
  return (
    <Button
      label="Abandonar Juego"
      className="btn-leave-game"
      onClick={LeaveGame()}
    />
  );
}

export default LeaveButton;
