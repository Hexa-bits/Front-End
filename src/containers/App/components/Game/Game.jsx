import React, { useEffect, useInsertionEffect } from "react";
import Button from "../../../../components/Button/Button.jsx";
import VictoryBox from "../../../../components/VictoryBox/VictoryBox.jsx";
import WinnerExists from "../../../../hooks/Game/winnerExists.js";
import FigCards from "../../../../components/Game/FigCards/FigCards.jsx";
import MovCards from "../../../../components/Game/MovCards/MovCards.jsx";
import renewAllCards from "../../../../services/Game/Cards/renewAllCards.js";
import LeaveButton from "../../../../components/Game/LeaveButton/LeaveButton.jsx";
import SeePlayer from "../../../../components/Game/seePlayer_Turn/seePlayer.jsx";
import getCurrentTurnPlayer from "../../../../services/Game/TurnPlayer/getCurrentTurnPlayer.js";
import PlayerName from "../../../../components/Game/PlayerName/PlayerName.jsx";
import passTurn from "../../../../services/Game/TurnPlayer/passTurn.js";
import Board from "../../../../components/Game/Board/Board.jsx";
import Confetti from "react-confetti";
import "./Game.css";
import { useNavigate } from "react-router-dom";
import { LeaveGame } from "../../../../hooks/Lobby/leaveGame.jsx";
import { getWsGameInstance } from "../../../../services/WsGameService.js";
import { WS_GAME, cardData } from "../../../../utils/Constants.js";
import wsGameHandler from "../../../../services/WsGameHandler.js";
import renewBoard from "../../../../services/Game/Board/renewBoard.js";

function Game() {
  const navigate = useNavigate();
  const localPlayerId = parseInt(localStorage.getItem("id_user"), 10);
  const localPlayerName = localStorage.getItem("username");
  const gameId = localStorage.getItem("game_id");

  const ws = getWsGameInstance(WS_GAME + gameId);

  const { currentPlayer, playerId, fetchTurnData } =
    getCurrentTurnPlayer(gameId);
  const { winnerName, getWinner } = WinnerExists(gameId);
  const { movs_ids, figs_ids, fetchFigs, fetchMovs } =
    renewAllCards(localPlayerId);
  const { boxCards, fetchBoxCards } = renewBoard(gameId);

  wsGameHandler(
    ws,
    fetchTurnData,
    getWinner,
    fetchFigs,
    fetchMovs,
    fetchBoxCards
  );

  const handleEndTurn = async () => {
    await passTurn();
  };

  const handleLeave = async () => {
    await passTurn();
    await LeaveGame(navigate);
  };

  return (
    <div>
      {winnerName && (
        <>
          <Confetti
            width={2500}
            height={1500}
            numberOfPieces={300}
            gravity={0.3}
            wind={0.02}
            recycle={false}
            style={{ position: "fixed", top: 0, left: 0 }}
          />
          <VictoryBox winnerName={winnerName} onLeave={handleLeave} />
        </>
      )}
      <div className="game-container">
        <div className="left-box">
          <div className="seePlayer">
            <SeePlayer player={currentPlayer || "??????"} />
          </div>
          <div className="Game_Area">
            <div className="Fig">
              <FigCards figs_ids={figs_ids} />
            </div>
            <div className="board">
              <Board isTurn={localPlayerId === playerId} cardData={boxCards} />
            </div>
            <div className="Mov">
              <MovCards movs_ids={movs_ids} />
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="PlayerInfo-Area">
            <PlayerName player={localPlayerName} />
          </div>

          <div className="Butt">
            <div className="end">
              <Button
                label="Terminar Turno"
                onClick={handleEndTurn}
                disabled={localPlayerId !== playerId}
              />
            </div>
            <div className="leav">
              <LeaveButton onLeave={handleLeave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
