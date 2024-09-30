import React from 'react';
import MovCards from '../../../../components/Game/MovCards/MovCards.jsx';
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import Button from '../../../../components/Button/Button.jsx';
import { getMovements } from '../../../../hooks/Game/getMovements.js';
import { useState, useEffect } from 'react';
import './Game.css';
import FigCards from '../../../../components/Game/FigCards/FigCards.jsx'
import { getFigureCards } from '../../../../hooks/Game/getFigureCards';


import './Game.css';

function Game() {
    const [movsIds, setMovsIds] = useState([]);
    const [figsIds, setFigsIds] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            // MOVIMIENTOS
            const { movs_ids } = await getMovements();
            setMovsIds(movs_ids);
            
            // FIGURAS
            const {figs_ids} = await getFigureCards();
            setFigsIds(figs_ids);
        };
        fetchCards();
    }, []);

    const handleTurn = async () => { 
        // MOVIMIENTOS
        const {movs_ids} = await getMovements();
        setMovsIds(movs_ids);
    
        // FIGURAS
        const {figs_ids} = await getFigureCards();
        setFigsIds(figs_ids);
    };

    return (  
        <div className="game-container">
            <div className="Fig_Move">
                <MovCards movsIds = { movsIds }/>
                <FigCards figsIds={figsIds}/>
            </div>
            <div className="Butt">
                <div className="end">
                    <Button label="End Turn" onClick={handleTurn}/>
                </div>
                <div className="leav">
                    <LeaveButton />
                </div>
            </div>
        </div>
    );
}

export default Game;
