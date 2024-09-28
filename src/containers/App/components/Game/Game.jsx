import React from 'react';
import MovCard from '../../../../components/Game/MovCards/MovCards.jsx';
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import './Game.css';

function Game() {
    return (  
        <div className="game-container">
            <MovCard />
            <LeaveButton />
        </div>
    );
}

export default Game;
