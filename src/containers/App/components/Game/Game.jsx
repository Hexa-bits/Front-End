import React from 'react';
import Button from '../../../../components/Button/Button.jsx';
import MovCards from '../../../../components/Game/MovCards/MovCards.jsx';
import FigCards from '../../../../components/Game/FigCards/FigCards.jsx'
import VictoryBox from '../../../../components/VictoryBox/VictoryBox.jsx';
import useWinnerPolling from '../../../../hooks/Game/getWinner.js';
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import SeePlayer from '../../../../components/Game/seePlayer_Turn/seePlayer.jsx';
import DataGame from "../../../../utils/logics/Game/DataGame.js";
import { passTurn } from "../../../../hooks/Game/passTurn.js";
import Confetti from 'react-confetti';
import './Game.css';


function Game() {
    //Manejo el fetch de las cartas
    const localPlayerId = parseInt(localStorage.getItem("id_user"), 10);
    const gameId = localStorage.getItem('game_id');
    const winner = useWinnerPolling(gameId);
    const { movsIds, figsIds, currentPlayer, playerId } = DataGame();

    // Función para manejar el fin del turno
    const handleEndTurn = async () => {
      await passTurn(); // Cambia el turno
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
                    <VictoryBox winnerName={winner.name_player}/>
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
                    <div className="Butt">
                        <div className="end">
                            <Button 
                              label="Terminar Turno"
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
        </div>
        );
    }

export default Game;