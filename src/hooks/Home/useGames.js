import { useState, useEffect } from 'react';
import { HOME_URL } from '../../utils/Constants.js';

function useGames(ws) {
    const [games, setGames] = useState([]);
    
    const getListGames = async () => {
        try {
            const response = await fetch(HOME_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error("Error fetching lobbies:", error);
        }

    }

    useEffect(() => {
        getListGames();
    }, []);

    ws.onmessage = (event) =>{
        const message = event.data;
        if(message && message == "Actualizar lista de partidas"){
            getListGames();
        }
    }

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return { games };
}

export default useGames;
