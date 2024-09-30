import React from "react";
import Button from "../../../../components/Button/Button.jsx";
import MovCards from "../../../../components/Game/MovCards/MovCards.jsx";
import FigCards from "../../../../components/Game/FigCards/FigCards.jsx";
import LeaveButton from "../../../../components/Game/LeaveButton/LeaveButton.jsx";
import SeePlayer from "../../../../components/Game/seePlayer_Turn/seePlayer.jsx";
import DataGame from "../../../../utils/logics/Game/DataGame.js";
import "./Game.css";
import { passTurn } from "../../../../hooks/Game/passTurn.js";

function Game() {
  const localPlayerId = parseInt(localStorage.getItem("id_user"), 10);
  const { movsIds, figsIds, currentPlayer, playerId } = DataGame();

  // Función para manejar el fin del turno
  const handleEndTurn = async () => {
    await passTurn(); // Cambia el turno
  };

  return (
    <div className="game-container">
      <div className="left-box">
        <div className="seePlayer">
          <SeePlayer player={currentPlayer || "??????"} />
        </div>
        <div className="Game_Area">
          <div className="Fig">
            <FigCards figsIds={figsIds} />
          </div>
          <div className="board"></div>
          <div className="Mov">
            <MovCards movsIds={movsIds} />
          </div>
        </div>
      </div>
      <div className="right-box">
        <div className="Butt">
          <div className="end">
            <Button
              label="End Turn"
              onClick={handleEndTurn}
              disabled={localPlayerId !== playerId} 
            />
          </div>
          <div className="leav">
            <LeaveButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
