import { useEffect, useState } from 'react';
import { GAME_INFO_WS } from '../../utils/Constants.js';

// Acordar con back que se envie player_name en label "winner" por GAME_INFO_WS
export const WinnerExists = (gameId) => {
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(GAME_INFO_WS + gameId);

        ws.onmessage = (event) => {
            const message = event.data;
            if (message) { 
                if (message.startsWith('{') || message.startsWith('[')) {
                    try {
                        const gameInfo = JSON.parse(message);
                        if (gameInfo.winner !== null) {
                            console.log('Se encontro Ganador.');
                            setWinner(gameInfo.winner); 
                        }
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            }
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        return () => {
            if (ws.readyState === WebSocket.OPEN) { 
                ws.close();
            }
        };
    }, []);

    return winner ;
};



