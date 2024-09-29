import React, { useEffect, useState } from 'react';
import MovCards from '../../../../components/Game/MovCards/MovCards.jsx';
import FigCards from '../../../../components/Game/FigCards/FigCards.jsx'
import LeaveButton from '../../../../components/Game/LeaveButton/LeaveButton.jsx';
import Button from '../../../../components/Button/Button.jsx';
import { getMovements } from '../../../../hooks/Game/getMovements.js';
// import { getFigureCards } from '../../../../hooks/Game/getFigureCards';

import './Game.css';

function Game() {
    //Movemevs
    const [movsIds, setMovsIds] = useState([]);
    
    //Figures
    //const [figsIds, setFigsIds] = useState([]);

    // Fetch and set cards when the component is first rendered
    useEffect(() => {
        const fetchCards = async () => {
            const { movs_ids } = await getMovements();
            // const {figs_ids} = await getFigureCards();
            setMovsIds(movs_ids);
            // setFigsIds([1,2,3]);
        };
        fetchCards();
    }, []);

    const handleTurn = async () => { 
        const {movs_ids} = await getMovements();
        // const {figs_ids} = await getFigureCards();
        setMovsIds(movs_ids);
        //setFigsIds([1,2,3]);
        // console.log(cards_ids);
    };


    return (  
        <div className="game-container">
            <MovCards movsIds={movsIds}/>
            {/* <FigCards figsIds={figsIds}/> */}
            <Button label="End Turn" onClick={handleTurn}/>
            <LeaveButton />
        </div>
    );
}

export default Game;

