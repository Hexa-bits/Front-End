import React from "react";
import Button from "../../Button/Button.jsx";
import "./LeaveButton.css";

function LeaveButton({onLeave}) {
  return (
    <Button
      label="Abandonar Juego"
      className="btn-leave-game"
      onClick={onLeave}
    />
  );
}

export default LeaveButton;
