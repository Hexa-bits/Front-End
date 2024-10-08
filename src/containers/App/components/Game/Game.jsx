import React from 'react';
import Button from '../../../../components/Button/Button.jsx';
import VictoryBox from '../../../../components/VictoryBox/VictoryBox.jsx';
import WinnerExists from '../../../../hooks/Game/WinnerExists.js';
import FigCards from '../../../../components/Game/FigCards/FigCards.jsx';
import MovCards from '../../../../components/Game/MovCards/MovCards.jsx';
import CardsGame from '../../../../utils/logics/Game/CardsGame.js';
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import SeePlayer from '../../../../components/Game/seePlayer_Turn/seePlayer.jsx';
import getCurrentTurnPlayer from "../../../../hooks/Game/TurnPlayer/getCurrentTurnPlayer.js";
import PlayerName from '../../../../components/Game/PlayerName/PlayerName.jsx';
import passTurn from "../../../../hooks/Game/TurnPlayer/passTurn.js";
import Confetti from 'react-confetti';
import './Game.css';
import { useNavigate } from 'react-router-dom';
import { LeaveGame } from '../../../../hooks/Lobby/leaveGame.jsx';


function Game() {
    const navigate = useNavigate();
    //Manejo el fetch de las cartas
    const localPlayerId = parseInt(localStorage.getItem("id_user"), 10);
    const localPlayerName = localStorage.getItem("username");
    const gameId = localStorage.getItem('game_id');
    const winner = WinnerExists(gameId);
    const { movsIds, figsIds } = CardsGame();
    const { currentPlayer, playerId } = getCurrentTurnPlayer();
    
    const handleEndTurn = async () => {
        await passTurn(); 
    };

    return (
        <div>
            {winner && (
                <>
                    <Confetti
                        width={2500} 
                        height={1500} 
                        numberOfPieces={300} 
                        gravity={0.3}
                        wind={0.02} 
                        recycle={false}
                        style={{ position: 'fixed', top: 0, left: 0 }}
                    />
                    <VictoryBox winnerName={winner.name_player} onLeave={LeaveGame(navigate)}/>
                </>
            )}
            <div className="game-container">
                <div className="left-box">
                    <div className="seePlayer">
                        <SeePlayer player={currentPlayer || "??????"}/>
                    </div>
                    <div className="Game_Area">
                        <div className="Fig">
                            <FigCards figsIds={figsIds}/>
                        </div>
                        <div className="board">
                        </div>
                        <div className="Mov">
                            <MovCards movsIds = { movsIds }/>
                        </div>

                    </div>
                </div>
                <div className="right-box">
                    <div className="PlayerInfo-Area">
                        <PlayerName player={localPlayerName}/>
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
                            <LeaveButton onLeave={LeaveGame(navigate)}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        );
    }

export default Game;