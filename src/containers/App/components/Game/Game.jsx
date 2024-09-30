import React from 'react';
import Button from '../../../../components/Button/Button.jsx';
import MovCards from '../../../../components/Game/MovCards/MovCards.jsx';
import FigCards from '../../../../components/Game/FigCards/FigCards.jsx'
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import SeePlayer from '../../../../components/Game/seePlayer_Turn/seePlayer.jsx';
import useGameData from '../../../../utils/logics/Game/LogicDataGame.js';
import './Game.css';

function Game() {
    //Manejo el fetch de las cartas
    const { movsIds, figsIds, handleTurn, currentPlayer} = useGameData();

    return (  
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
                        <Button label="End Turn" onClick={handleTurn}/>
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
