import getMovements from './getMovements.js';
import getFigureCards from './getFigureCards.js';
import { useState, useEffect } from 'react';

const CardsGame = (ws, playerId) => {
    const [movsIds, setMovsIds] = useState([]);
    const [figsIds, setFigsIds] = useState([]);


    const fetchData = async () => {
        try {
            // Obtener movimientos
            const { movs_ids } = await getMovements(playerId);
            setMovsIds(movs_ids);
    
            // Obtener figuras
            const { figs_ids } = await getFigureCards(playerId);
            setFigsIds(figs_ids);

        } catch (error) {
          console.error('Error fetching game data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Polling para datos del juego
    useEffect(() => {
        if (!ws) return;

        // fetchData(); // Llamada inicial
        
        ws.onmessage = (event) => {
            const message = event.data; 
            if (message === "Terminó turno") {
                fetchData();
            }
        };
    }, [ws]);
    
      return { movsIds, figsIds};
    };

export default CardsGame;