import { useState, useEffect } from 'react';
import getTurnPlayer from './getTurnPlayer.js';

function getCurrentTurnPlayer(ws) {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const gameId = localStorage.getItem('game_id');

    const fetchData = async () => {
        try {
            const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
            setCurrentPlayer(newNamePlayer);
            setPlayerId(newPlayerId);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(!ws) return;

        ws.onmessage = (event) => {
            const message = event.data;
            if (message && message === "Terminó turno") {
                console.log("Llamado de mensajes de Turno.");
                fetchData();
            }
        };
 
    }, [ws, currentPlayer]);

    return { currentPlayer, playerId };
}

export default getCurrentTurnPlayer;
