import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Game.css";
import { useNavigate } from "react-router-dom";
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
    };


  return (
    <div className="Game">
      	<Winner winnerName={winnerName} onLeave={handleLeave}/>
      
		<div className="left-area">
			<div className="seePlayer">
				<SeePlayer player={currentPlayer || "??????"} />
			</div>
			<div className="Game_Others_Area">
				<OtherPlayers players={infoPlayers}/>
			</div>
			<div className="leav">
					<LeaveButton onLeave={handleLeave} />
			</div>		
    	</div>

		<div className="mid-area">
			<div className="optional">
				<GameName />
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
						<LabelMovParcial isVisible={isMovParcial} />
					</div>
					<LabelProhibitedColor color={4}/>
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
				<div className="button-panel">
					<div className="useFig">
						<Button
							label="DESCARTAR FIGURA"
							onClick={useFig}
							disabled={localPlayerId !== playerId}
						/>
					</div> 
					<div className="mov-butt">
						<div className="useMov">
							<Button
								label="USAR MOVIMIENTO"
								onClick={handleUseMov}
								disabled={localPlayerId !== playerId}
							/>
						</div>
						<div className="cancel">
							<Button
								label="CANCELAR MOVIMIENTO"
								onClick={handleCancel}
								disabled={localPlayerId !== playerId}
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
					disabled={localPlayerId !== playerId}
				/>
				</div>
			</div>
      	</div>
	</div>
  );
}
export default Game;