import { useState, useEffect, useCallback } from 'react';
import getTurnPlayer from './getTurnPlayer.js';


function getCurrentTurnPlayer(gameId) {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [playerId, setPlayerId] = useState(null);

    const fetchTurnData = useCallback(async () => {
        try {
            const { playerId: newPlayerId, namePlayer: newNamePlayer } = await getTurnPlayer(gameId);
            setCurrentPlayer(newNamePlayer);
            setPlayerId(newPlayerId);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }   
    }, [gameId]);

    useEffect(() => {
        fetchTurnData();
    }, [fetchTurnData]);


    return { currentPlayer, playerId, fetchTurnData };
}

export default getCurrentTurnPlayer;
