import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Game.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button.jsx";
import VictoryBox from "../../../../components/VictoryBox/VictoryBox.jsx";
import FigCards from "../../../../components/Game/FigCards/FigCards.jsx";
import MovCards from "../../../../components/Game/MovCards/MovCards.jsx";
import LeaveButton from "../../../../components/Game/LeaveButton/LeaveButton.jsx";
import SeePlayer from "../../../../components/Game/seePlayer_Turn/seePlayer.jsx";
import PlayerName from "../../../../components/Game/PlayerName/PlayerName.jsx";
import Board from "../../../../components/Game/Board/Board.jsx";
import renewMovCards from "../../../../services/Game/Cards/renewMovCards.js";
import renewFigCards from "../../../../services/Game/Cards/renewFigCards.js";
import { getWsGameInstance } from "../../../../services/WS/WsGameService.js";
import { LeaveGame } from "../../../../services/Lobby/leaveGame.jsx";
import WinnerExists from "../../../../services/Game/Winner/winnerExists.js";
import passTurn from "../../../../services/Game/TurnPlayer/passTurn.js";
import getCurrentTurnPlayer from "../../../../services/Game/TurnPlayer/getCurrentTurnPlayer.js";
import renewBoard from "../../../../services/Game/Board/renewBoard.js";
import wsGameHandler from "../../../../services/WS/WsGameHandler.js";
import postPlayer from "../../../../services/Game/TurnPlayer/cancelMov.js";
import getFormedFig from "../../../../services/Game/Board/Highlight Figs/formedFig.js";
import discardMove from "../../../../services/Game/Cards/discardMove.js";
import discardFig from "../../../../services/Game/Cards/discardFig.js";
import { WS_GAME } from "../../../../utils/Constants.js";
import { checkMov } from "../../../../utils/logics/Game/checkMov.js";
import LabelMovParcial from "../../../../components/Game/Board/LabelMovParcial/LabelMovParcial.jsx";

function Game() {
  const navigate = useNavigate();
  const localPlayerId = parseInt(localStorage.getItem("id_user"), 10);
  const localPlayerName = localStorage.getItem("username");
  const gameId = localStorage.getItem("game_id");

  const ws = getWsGameInstance(WS_GAME + gameId);

  const { currentPlayer, playerId, fetchTurnData } =
    getCurrentTurnPlayer(gameId);
  const { winnerName, getWinner } = WinnerExists(gameId);
  const { boxCards, fetchBoxCards, isMovParcial } = renewBoard(gameId);
  const { mov_cards, fetchMovs } = renewMovCards(localPlayerId);
  const { fig_cards, fetchFigs } = renewFigCards(localPlayerId);
  const [labelMovPacial, setLabelMovParcial] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedMov, setSelectedMov] = useState(null);
  const { formedFigs, fetchFormedFigs } = getFormedFig();
  const [selectedFig, setSelectedFig] = useState(null);
  const [selecFormedFig, setSelecFormedFig] = useState([]);

  wsGameHandler(
    ws,
    fetchTurnData,
    getWinner,
    fetchFigs,
    fetchMovs,
    fetchBoxCards,
    setLabelMovParcial,
    fetchFormedFigs
  );

  const handleEndTurn = async () => {
    setLabelMovParcial(false);
    await passTurn();
  };

  const handleLeave = async () => {
    await passTurn();
    await LeaveGame(navigate);
  };

  const handleUseMov = async () => {
    if (checkMov(selectedMov, selectedCards)) {
      await discardMove(localPlayerId, selectedMov, selectedCards);
      setLabelMovParcial(true);
      setSelectedMov(null);
      setSelectedCards([]);
    } else {
      console.log("Movimiento no valido");
    }
  };

  const useFig = async () => {
    await discardFig(localPlayerId, selecFormedFig, selectedFig);
    setSelectedFig(null);
    setSelecFormedFig([]);
  };

  const handleCancel = async () => {
    await postPlayer(localPlayerId, gameId);
    await renewBoard(gameId);
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
            <div className="board">
              <Board
                isTurn={localPlayerId === playerId}
                cardData={boxCards}
                onSelectedCards={setSelectedCards}
                onSelectedFig={setSelecFormedFig}
                formedFigs={formedFigs}
              />
              <div className="labelMovParcial">
                <LabelMovParcial isVisible={labelMovPacial} />
              </div>
            </div>
            <div className="Cards">
              <div className="Fig">
                <FigCards
                  fig_cards={fig_cards}
                  onSelectedFig={setSelectedFig}
                  isTurn={localPlayerId === playerId}
                />
              </div>
              <div className="Mov">
                <MovCards
                  mov_cards={mov_cards}
                  onSelectedMov={setSelectedMov}
                  isTurn={localPlayerId === playerId}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="PlayerInfo-Area">
            <PlayerName player={localPlayerName} />
          </div>

          <div className="Buttons">
            <div className="Buttup">
              <div className="cancel">
                <Button
                  label="Cancelar movimiento"
                  onClick={handleCancel}
                  disabled={localPlayerId !== playerId}
                />
              </div>
              <div className="useMov">
                <Button
                  label="USAR MOVIMIENTO"
                  onClick={handleUseMov}
                  disabled={localPlayerId !== playerId}
                />
              </div>
            </div>
            <div className="Buttdown">
              <div className="end">
                <Button
                  label="TERMINAR TURNO"
                  onClick={handleEndTurn}
                  disabled={localPlayerId !== playerId}
                />
              </div>
              <div className="leav">
                <LeaveButton onLeave={handleLeave} />
              </div>
              <div className="useFig">
                <Button
                  label="DESCARTAR FIGURA"
                  onClick={useFig}
                  disabled={localPlayerId !== playerId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
