import React from 'react';
import MovCard from '../../../../components/Game/MovCards/MovCards.jsx';
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import Button from '../../../../components/Button/Button.jsx';
import { getMovements } from '../../../../hooks/Game/getMovements.js';
import { useState } from 'react';

import './Game.css';

function Game() {
    const [cardsIds, setCardsIds] = useState([]);

    const handleTurn = async () => { 
        const {cards_ids} = await getMovements();
        setCardsIds(cards_ids);
        console.log(cards_ids);
    };

    return (  
        <div className="game-container">
            <MovCard cardsIds={cardsIds}/>
            <Button label="End Turn" onClick={handleTurn}/>
            <LeaveButton />
        </div>
    );
}

export default Game;

