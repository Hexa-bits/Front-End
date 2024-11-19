import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Game.css";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../../components/Button/Button.jsx";
import FigCards from "../../../../components/Game/FigCards/FigCards.jsx";
import MovCards from "../../../../components/Game/MovCards/MovCards.jsx";
import LeaveButton from "../../../../components/Game/LeaveButton/LeaveButton.jsx";
import SeePlayer from "../../../../components/Game/seePlayer_Turn/seePlayer.jsx";
import PlayerName from "../../../../components/Game/PlayerName/PlayerName.jsx";
import Board from "../../../../components/Game/Board/Board.jsx";
import Chat from "../../../../components/Game/Chat/Chat.jsx";
import OtherPlayers from "../../../../components/Game/OtherPlayers/OtherPlayers.jsx";
import LabelMovParcial from "../../../../components/Game/Board/LabelMovParcial/LabelMovParcial.jsx";
import LabelProhibitedColor from "../../../../components/Game/Board/LabelProhibitedColor/LabelProhibitedColor.jsx";
import Winner from "../../../../components/Game/Winner/Winner.jsx";
import GameName from "../../../../components/Game/GameName/GameName.jsx";
import CountdownTimer from "../../../../components/Game/Timer/timer.jsx";

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
import cancelMovCard from "../../../../services/Game/TurnPlayer/cancelMov.js";
import getFormedFig from "../../../../services/Game/Board/Highlight Figs/formedFig.js";
import discardMove from "../../../../services/Game/Cards/discardMove.js";
import discardFig from "../../../../services/Game/Cards/discardFig.js";
import { WS_GAME } from "../../../../utils/Constants.js";
import { checkMov } from "../../../../utils/logics/Game/checkMov.js";
import blockFig from "../../../../services/Game/Cards/blockFig.js";

function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const { samePlayer } = location.state || {};
  const localPlayerId = parseInt(sessionStorage.getItem("player_id"), 10);
  const localPlayerName = sessionStorage.getItem("player_name");
  const gameId = sessionStorage.getItem("game_id");

  const ws = getWsGameInstance(WS_GAME + gameId);

  const { currentPlayer, playerId, fetchTurnData } = getCurrentTurnPlayer(gameId);
  const { winnerName, getWinner } = WinnerExists(gameId);
  const { mov_cards, fetchMovs } = renewMovCards(localPlayerId);
  const { fig_cards, fig_cant, fetchFigs } = renewFigCards(localPlayerId);
  const { boxCards, movisParcial: isMovParcial, forbiddenColor, fetchBoxCards } = renewBoard(gameId);
  const { infoPlayers, fetchInfoPlayers } = getOthersInfo( gameId, localPlayerId);
  const { formedFigs, fetchFormedFigs } = getFormedFig();

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedMov, setSelectedMov] = useState(null);
  const [selectedFig, setSelectedFigCard] = useState(null);
  const [selecFormedFig, setSelecFormedFig] = useState([]);
  const [figToBlock, setFigToBlock] = useState(null);
  const [alert, setAlert] = useState("");
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    setTimeout(() => setAlert(""), 2000);
  }, [alert]);

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
    fetchFormedFigs,
    setResetTimer
  );

  const handleEndTurn = async () => {
    await passTurn();
  };

  const handleLeave = async () => {
    await LeaveGame(navigate);
  };

  const handleUseMov = async () => {
    if (checkMov(selectedMov, selectedCards)) {
      const success = await discardMove(
        localPlayerId,
        selectedMov,
        selectedCards
      );
      if (!success) {
        setAlert("No se pudo mover ficha");
      }

      setSelectedMov(null);
      setSelectedCards([]);
    } else {
      setAlert("Movimiento no permitido");
    }
  };

  const handleUseFig = async () => {
    const success = await discardFig(
      localPlayerId,
      selecFormedFig,
      selectedFig
    );
    if (!success) {
      setAlert("No se puede descartar esa figura");
    }

    setSelectedFigCard(null);
    setSelecFormedFig([]);
  };

  const handleCancel = async () => {
    const success = await cancelMovCard(localPlayerId, gameId);
    if (!success) {
      setAlert("No se puede cancelar movimiento.");
    }
  };

  const blockPlayerFig = async () => {
    console.log(selectedFig);
    console.log(figToBlock);
    const success = await blockFig(localPlayerId, selecFormedFig, figToBlock);
    if (!success) {
      setAlert("No se puede bloquear esa figura");
    }

    setSelecFormedFig([]);
    setFigToBlock(null);
  };

  return (
    <div className="Game">
      <Winner winnerName={winnerName} onLeave={handleLeave} />

      <div className="left-area">
        <div className="seePlayer">
          <SeePlayer player={currentPlayer || "??????"} />
        </div>
        <div className="Game_Others_Area">
          <OtherPlayers
            players={infoPlayers}
            onSelecFigToBlock={setFigToBlock}
            isTurn={isTurn}
          />
        </div>
        {alert && (
          <div className="alert alert-danger" role="alert">
            {alert}
          </div>
        )}
        <div className="leav">
          <LeaveButton onLeave={handleLeave} />
        </div>
      </div>

      <div className="mid-area">
        <div className="optional">
          <GameName />
        </div>
        <div className="timer">
          <CountdownTimer
            resetTimer={resetTimer}
            onResetCompleted={() => setResetTimer(false)}
            samePlayer={samePlayer}
          />
        </div>
        <div className="Game_Area">
				<div className="board">
					<Board
						isTurn={isTurn}
						cardData={boxCards}
						onSelectedCards={setSelectedCards}
						onSelecFormedFig={setSelecFormedFig}
						formedFigs={formedFigs}
					/>
					<div className="labelMovParcial">
						<LabelMovParcial isVisible={isMovParcial} />
						<LabelProhibitedColor color={forbiddenColor}/>
						<div className="labelProhibitedColor">
						</div>
					</div>
				</div>
				<div className="Cards">
					<div className="Fig">
						<FigCards 
							fig_cards={fig_cards} 
							onSelecFigCard={setSelectedFigCard}
							isTurn={isTurn} 
						/>
					</div>
					<div className="Mov">
						<MovCards
							mov_cards={mov_cards}
							onSelectedMov={setSelectedMov}
							isTurn={isTurn}
						/>
					</div>
					<div className="DeckFig">
						<div className="Fig_Cant">
							{fig_cant}
						</div>
						<img src="../../../../assets/Figures/back-fig.svg"/>
					</div>
				</div>
				<div className="button-panel">
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
								onClick={handleUseFig}
								disabled={disabled}
							/>
						</div>
					</div> 
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

		<div className="right-area">
			<div className="right-box">
				<div className="PlayerInfo-Area">
					<PlayerName label={"USUARIO"} player={localPlayerName} />
				</div>
				<div className="chat-container">
					<Chat
						ws={ws}
						playerId={localPlayerId}
					/>
				</div>

				<div className="end">
					<Button
              label="TERMINAR TURNO"
              onClick={handleEndTurn}
              disabled={disabled}
          />
				</div>
			</div>
			
      	</div>
	</div>
  );
}
export default Game;