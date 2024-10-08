import { useState } from 'react';
import { GET_WINNER_URL } from '../../utils/Constants.js';

// Acordar con back que se envie player_name en label "winner" por GAME_INFO_WS
const WinnerExists = (ws, gameId) => {
    const [winner, setWinner] = useState(null);

    const fetchWinner = async () => {
        try {
            const response = await fetch(GET_WINNER_URL + gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            const data = await response.json();
            setWinner(data.name_player);
        } catch (error) {
            console.error('Error fetching winner:', error);
        }
    };

    ws.onmessage = (event) => {
        const message = event.data;
        if (message == "Hay Ganador") { fetchWinner(); }
    };
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return {winner} ;
};
export default WinnerExists;


