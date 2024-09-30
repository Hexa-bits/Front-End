import { useState, useEffect } from 'react';
import { getMovements } from '../../../hooks/Game/getMovements.js'
import { getFigureCards } from '../../../hooks/Game/getFigureCards.js';
import getTurnPlayer from '../../../hooks/Game/getTurnPlayer.js';

const useGameData = () => {
    const [movsIds, setMovsIds] = useState([]);
    const [figsIds, setFigsIds] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const gameId = localStorage.getItem('game_id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Movimientos
                const { movs_ids } = await getMovements();
                setMovsIds(movs_ids);

                // Figuras
                const { figs_ids } = await getFigureCards();
                setFigsIds(figs_ids);

                // Jugador en turno
                const playerData = await getTurnPlayer(gameId);
                setCurrentPlayer(playerData.name_player);    

            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };
        fetchData();
    }, []); // Se vuelve a ejecutar cuando cambia gameId

    const handleTurn = async () => { 
        const { movs_ids } = await getMovements();
        setMovsIds(movs_ids);
        
        const { figs_ids } = await getFigureCards();
        setFigsIds(figs_ids);
    };

    return { movsIds, figsIds, handleTurn, currentPlayer };
};

export default useGameData;
