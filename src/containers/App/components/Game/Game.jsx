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
import OtherPlayers from "../../../../components/Game/OtherPlayers/OtherPlayers.jsx";
import LabelMovParcial from "../../../../components/Game/Board/LabelMovParcial/LabelMovParcial.jsx";

import { getWsGameInstance } from "../../../../services/WS/WsGameService.js";
import { LeaveGame } from "../../../../services/Lobby/leaveGame.jsx";
import renewAllCards from "../../../../services/Game/Cards/renewAllCards.js";
import WinnerExists from "../../../../services/Game/Winner/winnerExists.js";
import passTurn from "../../../../services/Game/TurnPlayer/passTurn.js";
import getCurrentTurnPlayer from "../../../../services/Game/TurnPlayer/getCurrentTurnPlayer.js";
import renewBoard from "../../../../services/Game/Board/renewBoard.js";
import wsGameHandler from "../../../../services/WS/WsGameHandler.js";
import getOthersInfo from "../../../../services/Game/Cards/getOthersInfo.js";
import getFormedFig from "../../../../services/Game/Board/Highlight Figs/formedFig.js";
import discardMove from "../../../../services/Game/Cards/discardMove.js";
import discardFig from "../../../../services/Game/Cards/discardFig.js";
import { WS_GAME } from "../../../../utils/Constants.js";
import { checkMov } from "../../../../utils/logics/Game/checkMov.js";

function Game() {
    const navigate = useNavigate();
    const localPlayerId = parseInt(localStorage.getItem("id_user"), 10);
    const localPlayerName = localStorage.getItem("username");
    const gameId = localStorage.getItem("game_id");

    const ws = getWsGameInstance(WS_GAME + gameId);

    const { currentPlayer, playerId, fetchTurnData } = getCurrentTurnPlayer(gameId);
    const { winnerName, getWinner } = WinnerExists(gameId);
    const { mov_cards, fig_cards, fetchFigs, fetchMovs } = renewAllCards(localPlayerId);
    const { boxCards, fetchBoxCards, isMovParcial } = renewBoard(gameId);
    const { infoPlayers, fetchInfoPlayers } = getOthersInfo(gameId, localPlayerId);
    const { formedFigs, fetchFormedFigs } = getFormedFig(); 
    
    const [ labelMovPacial, setLabelMovParcial ] = useState(false);
    const [ selectedCards, setSelectedCards] = useState([]);
    const [ selectedMov, setSelectedMov] = useState(null);
    const [ selectedFig, setSelectedFig] = useState(null);
    const [ selecFormedFig, setSelecFormedFig] = useState([]);
    
    wsGameHandler(
      ws,
      fetchTurnData,
      getWinner,
      fetchFigs,
      fetchMovs,
      fetchBoxCards,
      fetchInfoPlayers,
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
    }
    else { console.log("Movimiento no valido"); }
  };

  const useFig = async () => {
    await discardFig(localPlayerId, selecFormedFig, selectedFig);
    setSelectedFig(null);
    setSelecFormedFig([]);  
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

      <div className="game-header">
        <div className="seePlayer">
          <SeePlayer player={currentPlayer || "??????"} />
        </div>
        <div className="PlayerInfo-Area">
          <PlayerName label={"USUARIO"} player={localPlayerName} />
        </div>
      </div>

      <div className="game-container">
        <div className="left-box">

          <div className="Game_Others_Area">
            <OtherPlayers 
              players={infoPlayers} 
            />
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
                <LabelMovParcial isVisible={labelMovPacial}/>
              </div>
            </div>
            <div className="Cards">
              <div className="Fig">
                <FigCards 
                  fig_cards={fig_cards} 
                  onSelectedCardFig={setSelectedFig}
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


          <div className="Butt">
            <div className="useMov"> 
              <Button
                label="USAR MOVIMIENTO"
                onClick={handleUseMov}
                disabled={localPlayerId !== playerId}
              />
            </div>
            <div className="useFig">
              <Button
                label="DESCARTAR FIGURA"
                onClick={useFig}
                disabled={localPlayerId !== playerId}
                />
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Game;
