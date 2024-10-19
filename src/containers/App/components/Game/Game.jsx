import React, { useState } from "react";
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
import renewAllCards from "../../../../services/Game/Cards/renewAllCards.js";
import WinnerExists from "../../../../services/Game/Winner/winnerExists.js";
import passTurn from "../../../../services/Game/TurnPlayer/passTurn.js";
import getCurrentTurnPlayer from "../../../../services/Game/TurnPlayer/getCurrentTurnPlayer.js";
import renewBoard from "../../../../services/Game/Board/renewBoard.js";
import useMovCard from "../../../../services/Game/Cards/useMovCard.js";
import wsGameHandler from "../../../../services/WS/WsGameHandler.js";
import LabelMovParcial from "../../../../components/Game/Board/LabelMovParcial/LabelMovParcial.jsx";
import { LeaveGame } from "../../../../services/Lobby/leaveGame.jsx";
import { getWsGameInstance } from "../../../../services/WS/WsGameService.js";
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
    const { mov_cards, figs_ids, fetchFigs, fetchMovs } = renewAllCards(localPlayerId);
    const { boxCards, fetchBoxCards, isMovParcial } = renewBoard(gameId);
    const [ labelMovPacial, setLabelMovParcial ] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedMov, setSelectedMov] = useState(null);

    wsGameHandler(
        ws,
        fetchTurnData,
        getWinner,
        fetchFigs,
        fetchMovs,
        fetchBoxCards,
        setLabelMovParcial,
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
        await useMovCard(localPlayerId, selectedMov, selectedCards);
        setLabelMovParcial(true);
        setSelectedMov(null);
        setSelectedCards([]);
        }
        else {
        console.log("Movimiento no valido");
        }
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
                        isMovParcial={isMovParcial}
                        game_id={gameId}
                    />
                    <div className="labelMovParcial">
                        <LabelMovParcial isVisible={labelMovPacial}/>
                    </div>
                </div>
                <div className="Cards">
                <div className="Fig">
                    <FigCards figs_ids={figs_ids} />
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

            <div className="Butt">
                <div className="useMov"> 
                <Button
                    label="USAR MOVIMIENTO"
                    onClick={handleUseMov}
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
