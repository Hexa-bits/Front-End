import React from 'react';
import MovCards from '../../../../components/Game/MovCards/MovCards.jsx';
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import Button from '../../../../components/Button/Button.jsx';
import { getMovements } from '../../../../hooks/Game/getMovements.js';
import { useState, useEffect } from 'react';
import './Game.css';
// import FigCards from '../../../../components/Game/FigCards/FigCards.jsx'
// import { getFigureCards } from '../../../../hooks/Game/getFigureCards';


import './Game.css';

function Game() {
    const [movsIds, setMovsIds] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            // MOVIMIENTOS
            const { movs_ids } = await getMovements();
            setMovsIds(movs_ids);
            
            // FIGURAS
            // const {figs_ids} = await getFigureCards();
            // setFigsIds([1,2,3]);
        };
        fetchCards();
    }, []);

    const handleTurn = async () => { 
        // MOVIMIENTOS
        const {movs_ids} = await getMovements();
        setMovsIds(movs_ids);
    
        // FIGURAS
        // const {figs_ids} = await getFigureCards();
        // setFigsIds([1,2,3]);
    };



    return (  
        <div className="game-container">
            <MovCards movsIds = { movsIds }/>
            {/* <FigCards figsIds={figsIds}/> */}
            <Button label="End Turn" onClick={handleTurn}/>
            <LeaveButton />
        </div>
    );
}

export default Game;
