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

import renewFigCards from "../../../../services/Game/Cards/renewFigCards.js";
import renewMovCards from "../../../../services/Game/Cards/renewMovCards.js";
import { getWsGameInstance } from "../../../../services/WS/WsGameService.js";
import { LeaveGame } from "../../../../services/Lobby/leaveGame.jsx";
import WinnerExists from "../../../../services/Game/Winner/winnerExists.js";
import passTurn from "../../../../services/Game/TurnPlayer/passTurn.js";
import getCurrentTurnPlayer from "../../../../services/Game/TurnPlayer/getCurrentTurnPlayer.js";
import renewBoard from "../../../../services/Game/Board/renewBoard.js";
import wsGameHandler from "../../../../services/WS/WsGameHandler.js";
import getOthersInfo from "../../../../services/Game/Cards/getOthersInfo.js";
import postPlayer from "../../../../services/Game/TurnPlayer/cancelMov.js";
import getFormedFig from "../../../../services/Game/Board/Highlight Figs/formedFig.js";
import discardMove from "../../../../services/Game/Cards/discardMove.js";
import discardFig from "../../../../services/Game/Cards/discardFig.js";
import { WS_GAME } from "../../../../utils/Constants.js";
import { checkMov } from "../../../../utils/logics/Game/checkMov.js";
import blockFig from "../../../../services/Game/Cards/blockFig.js";

function Game() {
    const navigate = useNavigate();
    const localPlayerId = parseInt(sessionStorage.getItem("player_id"), 10);
    const localPlayerName = sessionStorage.getItem("player_name");
    const gameId = sessionStorage.getItem("game_id");

    
    const ws = getWsGameInstance(WS_GAME + gameId);
    
    const { currentPlayer, playerId, fetchTurnData } = getCurrentTurnPlayer(gameId);
    const { winnerName, getWinner } = WinnerExists(gameId);
    const { mov_cards, fetchMovs } = renewMovCards(localPlayerId);
    const { fig_cards, fetchFigs } = renewFigCards(localPlayerId);
    const { boxCards, movisParcial: isMovParcial ,fetchBoxCards } = renewBoard(gameId);
    const { infoPlayers, fetchInfoPlayers } = getOthersInfo(gameId, localPlayerId);
    const { formedFigs, fetchFormedFigs } = getFormedFig(); 
    
    const [ selectedCards, setSelectedCards] = useState([]);
    const [ selectedMov, setSelectedMov] = useState(null);
    const [ selectedFig, setSelectedFig] = useState(null);
    const [ selecFormedFig, setSelecFormedFig] = useState([]);
    const [ figToBlock, setFigToBlock] = useState(null);
    
    const disabled = localPlayerId !== playerId;
    const isTurn = localPlayerId === playerId;
    
    wsGameHandler(
      ws,
      fetchTurnData,
      getWinner,
      fetchFigs,
      fetchMovs,
      fetchBoxCards,
      fetchInfoPlayers,
      fetchFormedFigs
    );

    const handleEndTurn = async () => {
      await passTurn();
    };

    const handleLeave = async () => {
      await passTurn();
      await LeaveGame(navigate);
    };

    const handleUseMov = async () => {
      if (checkMov(selectedMov, selectedCards)) {
        await discardMove(localPlayerId, selectedMov, selectedCards);
        setSelectedMov(null);
        setSelectedCards([]);
      } 
    };

    const useFig = async () => {
      await discardFig(localPlayerId, selecFormedFig, selectedFig);
      setSelectedFig(null);
      setSelecFormedFig([]);
    };

    const handleCancel = async () => {
      await postPlayer(localPlayerId, gameId);
    };

    const blockPlayerFig = async () => {
      await blockFig(playerId, selectedFig, figToBlock);
      setSelectedFig(null);
      setFigToBlock(null);
    }


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
      
      {/* Screen Header with labels */}
      <div className="game-header">
        <div className="seePlayer">
          <SeePlayer player={currentPlayer || "??????"} />
        </div>
        <div className="PlayerInfo-Area">
          <PlayerName label={"USUARIO"} player={localPlayerName} />
        </div>
      </div>

      {/* Gaming Area */}
      <div className="game-container">

        <div className="left-box">

          {/* Others Players info at the right Side */}
          <div className="Game_Others_Area">
            <OtherPlayers 
              players={infoPlayers} 
              onSelectFigToBlock={setFigToBlock}
              isTurn={isTurn}
            />
            <div className="leav">
              <LeaveButton onLeave={handleLeave} />
            </div>
          </div> 

          <div className="Game_Area">
          
            {/* Board */}
            <div className="board">
              <Board
                isTurn={isTurn}
                cardData={boxCards}
                onSelectedCards={setSelectedCards}
                onSelectedFig={setSelecFormedFig}
                formedFigs={formedFigs}
              />
              <div className="labelMovParcial">
                <LabelMovParcial isVisible={isMovParcial} />
              </div>
            </div>

            {/* My Cards and functional buttons */}
            <div className="Cards">
              <div className="Fig">
                <FigCards 
                  fig_cards={fig_cards} 
                  onSelectedCardFig={setSelectedFig}
                  isTurn={isTurn} 
                />

                <div className="fig-butt">
                  <div className="block">
                    <Button
                      label="BLOQUEAR OTRA FIGURA"
                      onClick={blockPlayerFig}
                      disabled={disabled}
                    />
                  </div>
                  <div className="useFig">
                    <Button
                      label="DESCARTAR MI FIGURA"
                      onClick={useFig}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>

              <div className="Mov">
                <MovCards
                  mov_cards={mov_cards}
                  onSelectedMov={setSelectedMov}
                  isTurn={isTurn}
                />
                <div className="mov-butt">
                  <div className="useMov">
                    <Button
                      label="USAR MOVIMIENTO"
                      onClick={handleUseMov}
                      disabled={disabled}
                    />
                  </div>
                  <div className="cancel">
                    <Button
                      label="CANCELAR MOVIMIENTO"
                      onClick={handleCancel}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side of the screen */}
        <div className="right-box">
          <div className="end">
            <Button
              label="TERMINAR TURNO"
              onClick={handleEndTurn}
              disabled={localPlayerId !== playerId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Game;